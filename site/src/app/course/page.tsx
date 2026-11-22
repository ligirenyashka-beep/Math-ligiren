"use client";

import Link from "next/link";
import { COURSES, COURSE_TOPIC_COUNT } from "@/lib/course";
import { useProgress } from "@/lib/useProgress";

export default function CourseHub() {
  const { totals } = useProgress();
  const pct = COURSE_TOPIC_COUNT > 0 ? Math.round((totals.mastered / COURSE_TOPIC_COUNT) * 100) : 0;

  return (
    <div className="space-y-8">
      <header className="rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 px-6 py-10 text-white shadow-xl sm:px-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
          🎓 Полный онлайн-курс · 1–11 классы · ФГОС + ФИПИ + Сириус
        </span>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
          Математика от 1 до 11 класса
        </h1>
        <p className="mt-3 max-w-2xl text-indigo-100">
          {COURSE_TOPIC_COUNT} тем с теорией, практикой, домашними заданиями и тестами.
          Академический, методологически и практико-ориентированный курс: открытие через противоречие,
          автоматизация через практику, интервальные повторения.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-xl bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
            Освоено тем: {totals.mastered} / {COURSE_TOPIC_COUNT} ({pct}%)
          </span>
          <span className="rounded-xl bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
            Решено задач: {totals.solved} · Звёзд: {totals.stars} ⭐
          </span>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-emerald-300 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </header>

      <div className="space-y-4">
        {COURSES.map((g) => {
          const total = g.chapters.reduce((s, ch) => s + ch.topics.length, 0);
          return (
            <Link key={g.id} href={`/course/${g.id}`}
              className="block rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:ring-indigo-300">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-indigo-600">{g.age}</div>
                  <h2 className="text-xl font-extrabold text-slate-800">{g.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">{g.goal}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-indigo-600">{total}</div>
                  <div className="text-xs text-slate-400">тем · {g.chapters.length} глав</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.chapters.map((ch) => (
                  <span key={ch.id} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {ch.title}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Как устроен курс</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            { e: "📖", t: "Теория", d: "Конспект темы: определение, формула, пример, совет" },
            { e: "✏️", t: "Практика", d: "Генераторы заданий с автокоррекцией и объяснениями" },
            { e: "🏠", t: "Домашка + тест", d: "Домашние задания и контрольный тест по теме" },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl bg-slate-50 p-4">
              <div className="text-2xl">{c.e}</div>
              <div className="mt-1 font-bold text-slate-800">{c.t}</div>
              <div className="text-sm text-slate-500">{c.d}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
