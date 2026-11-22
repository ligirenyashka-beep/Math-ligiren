"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { findCourseGrade } from "@/lib/course";
import { useProgress } from "@/lib/useProgress";

export default function CourseGradePage() {
  const params = useParams();
  const gradeId = String(params.grade ?? "");
  const grade = findCourseGrade(gradeId);
  const { byTopic } = useProgress();

  if (!grade) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
        <p className="text-slate-500">Класс не найден.</p>
        <Link href="/course" className="mt-3 inline-block font-bold text-indigo-600 hover:underline">← К курсу</Link>
      </div>
    );
  }

  const total = grade.chapters.reduce((s, ch) => s + ch.topics.length, 0);
  const mastered = grade.chapters.reduce(
    (s, ch) => s + ch.topics.filter((tp) => byTopic(tp.id)?.mastered).length, 0);
  const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;

  return (
    <div className="space-y-8">
      <Link href="/course" className="text-sm font-semibold text-indigo-600 hover:underline">← Все классы</Link>
      <header className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white shadow-lg">
        <div className="text-sm text-indigo-100">{grade.age}</div>
        <h1 className="mt-1 text-3xl font-extrabold">{grade.title}</h1>
        <p className="mt-2 text-indigo-100">{grade.goal}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-emerald-300" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-sm font-bold">{mastered}/{total} тем ({pct}%)</span>
        </div>
      </header>

      {grade.chapters.map((ch) => (
        <section key={ch.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-bold text-slate-800">{ch.title}</h2>
          <div className="mt-4 space-y-2">
            {ch.topics.map((tp, i) => {
              const row = byTopic(tp.id);
              const done = row?.mastered;
              return (
                <Link key={tp.id} href={`/course/${grade.id}/${tp.id}`}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/50">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold ${done ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                    {done ? "✓" : i + 1}
                  </span>
                  <span className="flex-1">
                    <span className="block font-bold text-slate-800">{tp.title}</span>
                    <span className="block text-sm text-slate-500">{tp.summary}</span>
                  </span>
                  {row && row.solved > 0 && (
                    <span className="text-xs font-semibold text-slate-400">
                      {row.correct}/{row.solved} верно · {"⭐".repeat(row.stars)}
                    </span>
                  )}
                  <span className="text-indigo-600">→</span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
