"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { findCourseTopic, findCourseGrade } from "@/lib/course";
import { TheoryRenderer } from "@/components/TheoryRenderer";
import { PracticeRunner } from "@/components/PracticeRunner";
import { useProgress } from "@/lib/useProgress";

type Tab = "theory" | "practice" | "homework" | "test";

export default function CourseTopicPage() {
  const params = useParams();
  const gradeId = String(params.grade ?? "");
  const topicId = String(params.topic ?? "");
  const found = findCourseTopic(topicId);
  const grade = findCourseGrade(gradeId);
  const { byTopic } = useProgress();
  const [tab, setTab] = useState<Tab>("theory");
  const [checkedHw, setCheckedHw] = useState<boolean[]>([]);
  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({});
  const [testDone, setTestDone] = useState(false);

  if (!found || !grade) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
        <p className="text-slate-500">Тема не найдена.</p>
        <Link href="/course" className="mt-3 inline-block font-bold text-indigo-600 hover:underline">← К курсу</Link>
      </div>
    );
  }

  const { chapter, topic } = found;
  const row = byTopic(topic.id);
  const young = grade.id === "g1" || grade.id === "g2";

  const testScore = topic.test.reduce(
    (s, q, i) => s + (testAnswers[i] === q.answer ? 1 : 0), 0);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "theory", label: "Теория", icon: "📖" },
    { id: "practice", label: "Практика", icon: "✏️" },
    { id: "homework", label: "Домашка", icon: "🏠" },
    { id: "test", label: "Тест", icon: "🎯" },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <nav className="text-sm text-slate-400">
        <Link href="/course" className="hover:text-indigo-600">Курс</Link>
        {" / "}
        <Link href={`/course/${grade.id}`} className="hover:text-indigo-600">{grade.title}</Link>
        {" / "}
        <span className="text-slate-600">{chapter.title}</span>
      </nav>

      <header className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">{topic.title}</h1>
            <p className="mt-1 text-slate-500">{topic.summary}</p>
          </div>
          {row?.mastered && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">✓ Освоено</span>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((tb) => (
            <button key={tb.id} onClick={() => setTab(tb.id)}
              className={`rounded-xl px-4 py-2 text-sm font-bold ${tab === tb.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              <span className="mr-1">{tb.icon}</span>{tb.label}
            </button>
          ))}
        </div>
      </header>

      {tab === "theory" && (
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <TheoryRenderer blocks={topic.theory} />
          <div className="mt-6 flex justify-end">
            <button onClick={() => setTab("practice")}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 font-bold text-white hover:bg-indigo-700">
              К практике →
            </button>
          </div>
        </section>
      )}

      {tab === "practice" && (
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <PracticeRunner spec={topic.practice} topicId={topic.id} young={young} />
        </section>
      )}

      {tab === "homework" && (
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Домашнее задание</h2>
          <p className="mt-1 text-sm text-slate-500">Отмечай выполненные задания. Ошибка — данные, а не наказание.</p>
          <div className="mt-4 space-y-2">
            {topic.homework.map((hw, i) => (
              <label key={i} className="flex items-start gap-3 rounded-2xl border border-slate-100 p-4 cursor-pointer hover:bg-slate-50">
                <input type="checkbox" checked={!!checkedHw[i]}
                  onChange={() => setCheckedHw((prev) => { const c = [...prev]; c[i] = !c[i]; return c; })}
                  className="mt-1 h-5 w-5 accent-indigo-600" />
                <span className={`text-slate-700 ${checkedHw[i] ? "line-through text-slate-400" : ""}`}>{hw}</span>
              </label>
            ))}
          </div>
          {checkedHw.filter(Boolean).length === topic.homework.length && (
            <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              🎉 Домашка выполнена! Теперь пройди тест.
            </p>
          )}
        </section>
      )}

      {tab === "test" && (
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Контрольный тест</h2>
          <div className="mt-4 space-y-6">
            {topic.test.map((q, qi) => (
              <div key={qi} className="rounded-2xl border border-slate-100 p-4">
                <p className="font-bold text-slate-800">{qi + 1}. {q.question}</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {q.options.map((opt) => {
                    const selected = testAnswers[qi] === opt;
                    const isAnswer = opt === q.answer;
                    let cls = "border-slate-200 hover:border-indigo-300";
                    if (testDone && isAnswer) cls = "border-emerald-400 bg-emerald-50 text-emerald-800";
                    else if (testDone && selected && !isAnswer) cls = "border-rose-300 bg-rose-50 text-rose-700";
                    else if (selected) cls = "border-indigo-400 bg-indigo-50 text-indigo-800";
                    return (
                      <button key={opt} disabled={testDone}
                        onClick={() => setTestAnswers((prev) => ({ ...prev, [qi]: opt }))}
                        className={`rounded-xl border px-4 py-2.5 text-left text-sm font-semibold transition ${cls}`}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {testDone && (
                  <p className="mt-3 text-sm text-slate-600">
                    <b>{testAnswers[qi] === q.answer ? "✅ Верно." : "❌ Неверно."}</b> {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
          {!testDone ? (
            <button onClick={() => setTestDone(true)} disabled={Object.keys(testAnswers).length < topic.test.length}
              className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700 disabled:opacity-50">
              Проверить тест
            </button>
          ) : (
            <div className={`mt-6 rounded-2xl px-4 py-4 text-center font-bold ${testScore === topic.test.length ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
              {testScore === topic.test.length
                ? "🎉 Отлично! Тест пройден полностью."
                : `Результат: ${testScore} из ${topic.test.length}. Вернись к теории и попробуй ещё раз.`}
              <div className="mt-3 flex justify-center gap-2">
                <button onClick={() => { setTestDone(false); setTestAnswers({}); }}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200">
                  Пройти заново
                </button>
                <Link href={`/course/${grade.id}`}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">
                  К программе класса →
                </Link>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
