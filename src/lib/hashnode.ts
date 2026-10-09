export type Post = { title: string; url: string; brief: string; date: string };

export const HASHNODE_URL = "https://assokhi.hashnode.dev";

const tag = (xml: string, name: string) =>
  xml.match(new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`))?.[1].trim() ?? "";

// ponytail: regex RSS parse, fine for Hashnode's fixed feed shape; swap for a parser if it ever breaks.
// ponytail: RSS returns only the latest ~20 posts; switch to gql.hashnode.com pagination past that.
export async function getPosts(limit?: number): Promise<Post[]> {
  try {
    // Static export: runs once at build time, so new posts appear on the next deploy.
    const res = await fetch(`${HASHNODE_URL}/rss.xml`);
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, limit).map(([, item]) => ({
      title: tag(item, "title"),
      url: tag(item, "link"),
      brief: tag(item, "description"),
      date: tag(item, "pubDate"),
    }));
  } catch {
    return [];
  }
}
