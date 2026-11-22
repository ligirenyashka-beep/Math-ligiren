"use client";

import Link from "next/link";
import { useProgress } from "@/lib/useProgress";
import { findTopic, STAGES } from "@/lib/curriculum";

export default function ProgressPage() {
  const { name, setName, rows, totals, loaded } = useProgress();

  const totalPractice = STAGES.reduce(
    (s, st) =>
      s +
      st.grades.reduce(
        (g, gr) => g + gr.chapters.reduce((c, ch) => c + ch.topics.filter((t) => t.practice).length, 0),
        0,
      ),
    0,
  );
  const accuracy = totals.solved > 0 ? Math.round((totals.correct / totals.solved) * 100) : 0;

  return (
    <div className="space-y-8">
      <header className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-4xl">⭐</span>
          <div>
            <h1 className="text-2xl font-extrabold">Мой прогресс</h1>
            <p className="text-indigo-100">Учимся в своём темпе — каждый шаг важен!</p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <label className="text-sm text-indigo-100">Имя:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg bg-white/20 px-3 py-1.5 text-white placeholder-indigo-200 outline-none ring-1 ring-white/30 focus:bg-white/30"
          />
        </div>
      </header>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { n: totals.solved, l: "решено задач" },
          { n: `${accuracy}%`, l: "точность" },
          { n: totals.mastered, l: "тем освоено" },
          { n: totals.stars, l: "звёзд ⭐" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-100">
            <div className="text-3xl font-extrabold text-indigo-600">{s.n}</div>
            <div className="mt-1 text-sm text-slate-500">{s.l}</div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Освоение программы</h2>
          <span className="text-sm text-slate-400">
            {totals.mastered} / {totalPractice} тем
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
            style={{ width: `${totalPractice ? (totals.mastered / totalPractice) * 100 : 0}%` }}
          />
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="mb-4 text-lg font-bold text-slate-800">История по темам</h2>
        {!loaded ? (
          <p className="text-slate-400">Загружаем…</p>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 p-8 text-center">
            <div className="text-4xl">🚀</div>
            <p className="mt-2 text-slate-500">Вы ещё не решали задачи.</p>
            <Link
              href="/practice"
              className="mt-4 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-700"
            >
              Начать практику
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {rows.map((r) => {
              const info = findTopic(r.topicId);
              return (
                <div key={r.topicId} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <Link
                      href={`/practice/${r.topicId}`}
                      className="font-semibold text-slate-800 hover:text-indigo-600"
                    >
                      {info?.topic.title ?? r.topicId}
                    </Link>
                    <div className="text-sm text-slate-400">
                      {r.correct} верных из {r.solved} · {info?.grade.title}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {r.stars > 0 && <span>{"⭐".repeat(r.stars)}</span>}
                    {r.mastered && (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                        освоено ✅
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
