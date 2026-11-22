"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgress } from "@/lib/useProgress";
import { GRADES } from "@/lib/curriculum-full";

const INTERVALS = [1, 3, 7, 14, 30];

export default function CabinetPage() {
  const { name, setName, rows, totals, loaded } = useProgress();
  const [gradeId, setGradeId] = useState("g5");
  const [apps, setApps] = useState<{ id: string; grade: string; goal: string }[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pingli:applications");
      if (raw) setApps(JSON.parse(raw));
    } catch {}
  }, []);

  const grade = GRADES.find((g) => g.id === gradeId) ?? GRADES[0];
  const accuracy = totals.solved > 0 ? Math.round((totals.correct / totals.solved) * 100) : 0;

  return (
    <div className="space-y-8">
      <header className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold">Личный кабинет</h1>
            <p className="text-indigo-100">Учимся в своём темпе — каждый шаг важен!</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-indigo-100">Имя:</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              className="rounded-lg bg-white/20 px-3 py-1.5 text-white placeholder-indigo-200 outline-none ring-1 ring-white/30 focus:bg-white/30" />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { n: totals.solved, l: "решено задач" },
            { n: `${accuracy}%`, l: "точность" },
            { n: totals.mastered, l: "тем освоено" },
            { n: totals.stars, l: "звёзд ⭐" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur">
              <div className="text-2xl font-extrabold">{s.n}</div>
              <div className="mt-1 text-xs text-indigo-100">{s.l}</div>
            </div>
          ))}
        </div>
      </header>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Моя программа</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {GRADES.map((g) => (
            <button key={g.id} onClick={() => setGradeId(g.id)}
              className={`rounded-xl px-3 py-2 text-sm font-semibold ${gradeId === g.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {g.title}
            </button>
          ))}
        </div>
        <div className="mt-5 space-y-4">
          {grade.quarters.map((q) => (
            <div key={q.id} className="rounded-2xl border border-slate-100 p-4">
              <h3 className="font-bold text-slate-800">{q.title}</h3>
              <ul className="mt-2 space-y-1">
                {q.topics.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-0.5 text-indigo-500">▸</span>
                    <span>{t.title}
                      {t.fipi && <span className="ml-2 rounded bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-600">ФИПИ {t.fipi}</span>}
                      {t.sirius && <span className="ml-2 rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">{t.sirius}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-500"><b>Цель:</b> {grade.goal}</p>
        <p className="text-sm text-slate-500"><b>Нейроокно:</b> {grade.neuro}</p>
        <p className="text-sm text-slate-500"><b>Персонаж:</b> {grade.character} · <b>Часы:</b> {grade.hours}</p>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Повторения (интервалы 1–3–7–14–30 дней)</h2>
        <p className="mt-1 text-sm text-slate-500">Система возвращает к пройденному материалу с нарастающими интервалами и чередованием тем.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {INTERVALS.map((d) => (
            <span key={d} className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">через {d} дн.</span>
          ))}
        </div>
        <div className="mt-4">
          <Link href="/practice" className="inline-block rounded-xl bg-indigo-600 px-5 py-2.5 font-bold text-white hover:bg-indigo-700">К практике →</Link>
          <Link href="/parent" className="ml-2 inline-block rounded-xl bg-slate-100 px-5 py-2.5 font-bold text-slate-700 hover:bg-slate-200">Дашборд родителя</Link>
        </div>
      </section>

      {apps.length > 0 && (
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Мои заявки</h2>
          <ul className="mt-2 space-y-1">
            {apps.map((a) => (
              <li key={a.id} className="text-sm text-slate-600"><b>{a.id}</b> · {a.grade} · цель: {a.goal}</li>
            ))}
          </ul>
        </section>
      )}
      {!loaded && <p className="text-sm text-slate-400">Загрузка…</p>}
    </div>
  );
}
