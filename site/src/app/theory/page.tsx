import Link from "next/link";
import { STAGES } from "@/lib/curriculum";
import type { Standard } from "@/lib/types";

const STANDARD_BADGE: Record<Standard, string> = {
  "ФГОС": "bg-emerald-50 text-emerald-600",
  "Олимпиадная": "bg-violet-50 text-violet-600",
  "Околошкольная": "bg-amber-50 text-amber-600",
  "Высшая": "bg-indigo-50 text-indigo-600",
};

export default function TheoryIndex() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-800">📖 Теория</h1>
        <p className="mt-1 text-slate-500">
          Структура по классам и этапам, внутри — главы и темы по ФГОС и стандартам РФ. Также
          околошкольная, олимпиадная и высшая математика. Нажмите на тему — откроется объяснение с
          визуализацией.
        </p>
      </header>

      <div className="space-y-6">
        {STAGES.map((stage) => (
          <details key={stage.id} open className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
            <summary className="cursor-pointer list-none px-6 py-4 text-lg font-bold text-slate-800">
              <span className="mr-2">{stage.emoji}</span>
              {stage.title}
              <span className="ml-2 text-sm font-normal text-slate-400">{stage.ageLabel}</span>
            </summary>
            <div className="space-y-6 border-t border-slate-100 px-6 py-5">
              {stage.grades.map((grade) => (
                <div key={grade.id}>
                  <h3 className="mb-3 font-bold text-slate-700">
                    {grade.title}
                    <span className="ml-2 text-xs font-normal text-slate-400">{grade.ageLabel}</span>
                  </h3>
                  <div className="space-y-4 border-l-2 border-slate-100 pl-4">
                    {grade.chapters.map((chapter) => (
                      <div key={chapter.id}>
                        <div className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-slate-400">
                          {chapter.title}
                        </div>
                        <ul className="space-y-1.5">
                          {chapter.topics.map((topic) => (
                            <li key={topic.id}>
                              <Link
                                href={`/theory/${topic.id}`}
                                className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition hover:bg-indigo-50"
                              >
                                <span className="font-medium text-slate-700 group-hover:text-indigo-700">
                                  {topic.title}
                                </span>
                                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STANDARD_BADGE[topic.standard]}`}>
                                  {topic.standard}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
