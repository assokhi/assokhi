import { notFound } from "next/navigation";
import { formatDate, getPosts } from "@/lib/blog";

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  return post ? { title: post.title, description: post.brief } : {};
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="font-nav mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <time className="text-sm text-slate-500 dark:text-night-300">{formatDate(post.date)}</time>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950 dark:text-night-100">{post.title}</h1>
      {post.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <li key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-night-800 dark:text-night-300">#{t}</li>
          ))}
        </ul>
      )}
      {/* HTML comes from my own blogs repo at build time — trusted, so no sanitizer. */}
      <article className="post mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  );
}
