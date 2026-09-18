import { techStack } from "@/data/techstack";

export function TechStack() {
  return (
    <section className="font-nav bg-slate-50 pb-20 dark:bg-night-1000">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-night-100 sm:text-4xl">
          Stacks I&apos;ve Worked On
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group) => (
            <div key={group.category}>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-night-100">{group.category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map(({ name, icon: Icon }) => (
                  <span
                    key={name}
                    className="flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-3 py-1.5 text-sm text-slate-700 dark:border-white/10 dark:bg-night-900 dark:text-night-300"
                  >
                    <Icon className="size-4 shrink-0" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
