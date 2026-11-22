"use client";

import Link from "next/link";
import { useState } from "react";
import type { Stage } from "@/lib/types";
import { useProgress } from "@/lib/useProgress";

export function StageGrades({ stage }: { stage: Stage }) {
  const { byTopic, loaded } = useProgress();
  const [openGrade, setOpenGrade] = useState<string | null>(stage.grades[0]?.id ?? null);

  return (
    <div className="space-y-4">
      {stage.grades.map((grade) => {
        const isOpen = openGrade === grade.id;
        const topics = grade.chapters.flatMap((c) => c.topics);
        const mastered = topics.filter((tp) => byTopic(tp.id)?.mastered).length;
        return (
          <section key={grade.id} id={grade.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
            <button
              onClick={() => setOpenGrade(isOpen ? null : grade.id)}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-slate-50"
            >
              <div>
                <h2 className="text-lg font-bold text-slate-800">{grade.title}</h2>
                <p className="text-sm text-slate-500">{grade.ageLabel}</p>
              </div>
              <div className="flex items-center gap-3">
                {loaded && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    {mastered}/{topics.length} освоено
                  </span>
                )}
                <span className={`text-slate-400 transition ${isOpen ? "rotate-180" : ""}`}>▼</span>
              </div>
            </button>

            {isOpen && (
              <div className="space-y-5 border-t border-slate-100 px-6 py-5">
                {grade.chapters.map((chapter) => (
                  <div key={chapter.id}>
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-400">
                      {chapter.title}
                    </h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {chapter.topics.map((topic) => {
                        const p = byTopic(topic.id);
                        return (
                          <div
                            key={topic.id}
                            className="flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50 p-4"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-slate-800">{topic.title}</h4>
                                {p?.mastered && <span title="Освоено">✅</span>}
                              </div>
                              <p className="mt-1 text-sm text-slate-500">{topic.summary}</p>
                              {p && p.stars > 0 && (
                                <div className="mt-1 text-sm">{"⭐".repeat(p.stars)}</div>
                              )}
                            </div>
                            <div className="mt-3 flex gap-2">
                              <Link
                                href={`/theory/${topic.id}`}
                                className="flex-1 rounded-lg bg-white px-3 py-2 text-center text-sm font-semibold text-indigo-600 ring-1 ring-indigo-100 transition hover:bg-indigo-50"
                              >
                                📖 Теория
                              </Link>
                              {topic.practice && (
                                <Link
                                  href={`/practice/${topic.id}`}
                                  className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
                                >
                                  ✏️ Практика
                                </Link>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
