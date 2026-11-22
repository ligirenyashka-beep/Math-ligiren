"use client";

import { useMemo, useState } from "react";
import type { PracticeSpec, GeneratedProblem } from "@/lib/types";
import { generateProblem } from "@/lib/practice";
import { Visual } from "./Visual";
import { useProgress } from "@/lib/useProgress";

export function PracticeRunner({
  spec,
  topicId,
  young,
}: {
  spec: PracticeSpec;
  topicId: string;
  young: boolean;
}) {
  const { record, byTopic } = useProgress();
  const [seedBase] = useState(() => Math.floor(Math.random() * 1e6));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [freeInput, setFreeInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  const problem: GeneratedProblem = useMemo(
    () => generateProblem(spec, seedBase * 1000 + index),
    [spec, seedBase, index],
  );

  const useOptions = problem.options && problem.options.length > 0;
  const isCorrect = checked
    ? (useOptions ? selected : normalize(freeInput)) === normalizeAnswer(problem, useOptions)
    : false;

  function check() {
    if (checked) return;
    const answered = useOptions ? selected : freeInput.trim();
    if (!answered) return;
    const correct =
      (useOptions ? selected : normalize(freeInput)) === normalizeAnswer(problem, useOptions);
    setChecked(true);
    setSessionTotal((t) => t + 1);
    if (correct) setSessionCorrect((c) => c + 1);
    record(topicId, correct);
    if (correct && young) speak("Молодец! Правильно!");
    else if (!correct && young) speak("Попробуй ещё раз, у тебя получится!");
  }

  function next() {
    setIndex((i) => i + 1);
    setSelected(null);
    setFreeInput("");
    setChecked(false);
  }

  function retry() {
    setChecked(false);
    setSelected(null);
    setFreeInput("");
  }

  const progress = byTopic(topicId);

  return (
    <div className="space-y-5">
      {/* Session bar — no timer, only encouraging progress */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <div className="text-sm text-slate-500">
          Задача №{index + 1} · <span className="text-slate-400">без ограничения времени 🕊️</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <span className="text-emerald-600">✔ {sessionCorrect}</span>
          <span className="text-slate-400">из {sessionTotal}</span>
          {progress && progress.stars > 0 && <span>{"⭐".repeat(progress.stars)}</span>}
        </div>
      </div>

      {/* Problem card */}
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
        <div className="flex items-start justify-between gap-3">
          <h2 className={`font-bold text-slate-800 ${young ? "text-2xl" : "text-xl"}`}>
            {problem.prompt}
          </h2>
          {young && (
            <button
              onClick={() => speak(problem.speak ?? problem.prompt)}
              className="shrink-0 rounded-full bg-indigo-100 px-3 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-200"
              title="Прочитать вслух"
            >
              🔊 Слушать
            </button>
          )}
        </div>

        {problem.visual && (
          <div className="my-4">
            <Visual kind={problem.visual.kind} data={problem.visual.data} extra={problem.visual.extra} />
          </div>
        )}

        {/* Answer area */}
        {useOptions ? (
          <div className={`mt-4 grid gap-3 ${young ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}>
            {problem.options!.map((opt) => {
              const active = selected === opt;
              let cls = "border-slate-200 bg-white text-slate-800 hover:border-indigo-300";
              if (checked) {
                if (opt === normalizeAnswer(problem, true)) cls = "border-emerald-400 bg-emerald-50 text-emerald-700";
                else if (active) cls = "border-rose-400 bg-rose-50 text-rose-700";
                else cls = "border-slate-200 bg-white text-slate-400";
              } else if (active) {
                cls = "border-indigo-500 bg-indigo-50 text-indigo-700";
              }
              return (
                <button
                  key={opt}
                  disabled={checked}
                  onClick={() => setSelected(opt)}
                  className={`rounded-2xl border-2 px-4 font-bold transition ${cls} ${
                    young ? "py-6 text-2xl" : "py-4 text-lg"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-4">
            <input
              value={freeInput}
              disabled={checked}
              onChange={(e) => setFreeInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && check()}
              placeholder="Введите ответ"
              className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 text-lg font-semibold text-slate-800 outline-none focus:border-indigo-500"
            />
          </div>
        )}

        {/* Feedback */}
        {checked && (
          <div
            className={`mt-5 rounded-2xl p-4 ${
              isCorrect ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"
            }`}
          >
            <div className="font-bold">
              {isCorrect ? "🎉 Верно! Отличная работа!" : "🤔 Не совсем. Ничего страшного!"}
            </div>
            <div className="mt-1 text-sm">{problem.explanation}</div>
          </div>
        )}

        {/* Controls */}
        <div className="mt-6 flex flex-wrap gap-3">
          {!checked ? (
            <button
              onClick={check}
              disabled={useOptions ? !selected : !freeInput.trim()}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Проверить
            </button>
          ) : (
            <>
              <button
                onClick={next}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Следующая задача →
              </button>
              {!isCorrect && (
                <button
                  onClick={retry}
                  className="rounded-xl bg-white px-6 py-3 font-bold text-indigo-600 ring-1 ring-indigo-200 transition hover:bg-indigo-50"
                >
                  🔁 Попробовать снова
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function normalize(s: string) {
  return s.trim().replace(",", ".").replace(/\s+/g, "");
}
function normalizeAnswer(p: GeneratedProblem, useOptions: boolean | undefined) {
  return useOptions ? p.answer : normalize(p.answer);
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ru-RU";
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  } catch {
    /* ignore */
  }
}
