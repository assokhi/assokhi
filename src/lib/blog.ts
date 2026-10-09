import { marked } from "marked";

export type Post = { slug: string; title: string; date: string; tags: string[]; brief: string; html: string };

const API = "https://api.github.com/repos/assokhi/blogs";

// "---\nkey: value\n---\nbody" → [{ key: value }, body]
export function parse(raw: string): [Record<string, string>, string] {
  const [, fm = "", body = raw] = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/) ?? [];
  const meta = Object.fromEntries(
    fm.split(/\r?\n/).flatMap((line) => {
      const m = line.match(/^(\w+):\s*(.*?)\s*$/);
      return m ? [[m[1], m[2].replace(/^"(.*)"$/, "$1")]] : [];
    }),
  );
  return [meta, body];
}

// Runs at build time (static export). Throws instead of returning [], so a GitHub
// outage fails the build and the last good deploy stays live rather than an empty blog.
// ponytail: unauthenticated GitHub API = 60 req/h per IP (2 calls per build worker); set GITHUB_TOKEN in the Cloudflare build env if that bites.
async function load(): Promise<Post[]> {
  const headers: HeadersInit = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
  // Pin main to a commit: raw.githubusercontent.com caches branch URLs for 5 min, so a build
  // right after a push could otherwise list new files but download stale contents.
  const head = await fetch(`${API}/commits/main`, { headers: { ...headers, Accept: "application/vnd.github.sha" } });
  if (!head.ok) throw new Error(`GitHub commit lookup failed: ${head.status}`);
  const sha = await head.text();
  const res = await fetch(`${API}/contents?ref=${sha}`, { headers });
  if (!res.ok) throw new Error(`GitHub listing failed: ${res.status}`);
  const files: { name: string; type: string }[] = await res.json();

  const posts = await Promise.all(
    files
      .filter((f) => f.type === "file" && f.name.endsWith(".md") && f.name !== "README.md")
      .map(async (f) => {
        const r = await fetch(`https://raw.githubusercontent.com/assokhi/blogs/${sha}/${encodeURIComponent(f.name)}`);
        if (!r.ok) throw new Error(`${f.name}: ${r.status}`);
        const [meta, body] = parse(await r.text());
        if (!meta.title || !meta.date) throw new Error(`${f.name}: frontmatter needs title and date`);
        const firstPara = body.split(/\r?\n\s*\r?\n/).find((p) => /^[A-Za-z]/.test(p.trim())) ?? "";
        return {
          slug: meta.slug || f.name.replace(/\.md$/, ""),
          title: meta.title,
          date: meta.date,
          tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()) : [],
          brief: firstPara.replace(/[`*_]/g, "").trim(),
          html: await marked.parse(body),
        };
      }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

// One fetch per build worker, shared by the homepage, /blog and every /blog/[slug].
let cached: Promise<Post[]> | undefined;
export const getPosts = () => (cached ??= load());

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en", { dateStyle: "medium", timeZone: "UTC" });
