import Link from "next/link";
import { STAGES } from "@/lib/curriculum";

const ACCENT: Record<string, string> = {
  rose: "from-rose-400 to-rose-500",
  amber: "from-amber-400 to-orange-500",
  emerald: "from-emerald-400 to-teal-500",
  sky: "from-sky-400 to-blue-500",
  violet: "from-violet-400 to-purple-500",
  indigo: "from-indigo-400 to-indigo-600",
};

export default function LearnMap() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-800">Карта обучения</h1>
        <p className="mt-1 text-slate-500">
          Шесть макро-этапов охватывают весь путь от 4 лет до высшей математики.
        </p>
      </header>

      <div className="space-y-6">
        {STAGES.map((stage) => (
          <section key={stage.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="flex flex-wrap items-center gap-4">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${
                  ACCENT[stage.accent]
                } text-2xl text-white shadow`}
              >
                {stage.emoji}
              </div>
              <div className="flex-1">
                <Link href={`/learn/${stage.id}`} className="text-xl font-bold text-slate-800 hover:text-indigo-600">
                  {stage.title}
                </Link>
                <div className="text-sm text-slate-500">
                  {stage.ageLabel} · {stage.description}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {stage.grades.map((g) => (
                <Link
                  key={g.id}
                  href={`/learn/${stage.id}#${g.id}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  {g.title}
                  <span className="ml-1 text-xs text-slate-400">{g.ageLabel}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
