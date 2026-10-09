import Link from "next/link";
import { formatDate, getPosts } from "@/lib/blog";

export async function Blog({ limit = 3 }: { limit?: number }) {
  const posts = (await getPosts()).slice(0, limit);

  return (
    <section className="font-nav py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-night-100 sm:text-4xl">
          Blog
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-night-300">
          Notes on software, systems, and whatever I&apos;m building.
        </p>
        {posts.length === 0 && <p className="mt-8 text-slate-500 dark:text-night-300">No posts yet.</p>}
        {posts.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rounded-xl border border-slate-900/10 p-5 transition hover:border-blue-600 dark:border-white/10 dark:hover:border-blue-400"
              >
                <time className="text-xs text-slate-500 dark:text-night-300">
                  {formatDate(p.date)}
                </time>
                <h3 className="mt-1 font-bold text-slate-950 dark:text-night-100">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-night-300">{p.brief}</p>
              </Link>
            ))}
          </div>
        )}
        {posts.length > 0 && Number.isFinite(limit) && (
          <Link
            href="/blog"
            className="mt-6 inline-block rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-night-100 dark:text-slate-950 dark:hover:bg-white"
          >
            All posts →
          </Link>
        )}
      </div>
    </section>
  );
}
