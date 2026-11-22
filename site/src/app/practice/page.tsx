import Link from "next/link";
import { STAGES } from "@/lib/curriculum";

export default function PracticeIndex() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-800">✏️ Практика</h1>
        <p className="mt-1 text-slate-500">
          Тренируйтесь без таймеров и стресса. Задачи генерируются заново каждый раз, попыток
          сколько угодно. Для малышей — с картинками и озвучкой.
        </p>
      </header>

      <div className="space-y-6">
        {STAGES.map((stage) => {
          const topics = stage.grades
            .flatMap((g) => g.chapters.flatMap((c) => c.topics))
            .filter((t) => t.practice);
          if (topics.length === 0) return null;
          return (
            <section key={stage.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <h2 className="mb-4 text-lg font-bold text-slate-800">
                <span className="mr-2">{stage.emoji}</span>
                {stage.title}
                <span className="ml-2 text-sm font-normal text-slate-400">{stage.ageLabel}</span>
              </h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {topics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/practice/${topic.id}`}
                    className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <span className="font-medium text-slate-700 group-hover:text-indigo-700">
                      {topic.title}
                    </span>
                    <span className="text-indigo-400 group-hover:translate-x-1">→</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
