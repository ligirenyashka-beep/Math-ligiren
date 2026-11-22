"use client";

import { useState } from "react";

interface Application {
  id: string;
  name: string;
  grade: string;
  goal: string;
  contact: string;
  time: string;
  createdAt: string;
}

const GOALS = ["Школьная программа", "ОГЭ", "ЕГЭ", "Олимпиады", "Всё сразу"];
const GRADES = ["1 класс","2 класс","3 класс","4 класс","5 класс","6 класс","7 класс","8 класс","9 класс","10 класс","11 класс","Дошкольник (4–6 лет)"];

export default function ApplyPage() {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("5 класс");
  const [goal, setGoal] = useState("Школьная программа");
  const [contact, setContact] = useState("");
  const [time, setTime] = useState("");
  const [done, setDone] = useState<Application | null>(null);
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Укажите имя ученика"); return; }
    if (!contact.trim()) { setError("Укажите телефон или почту для связи"); return; }
    const app: Application = {
      id: "A-" + Date.now().toString(36).toUpperCase(),
      name: name.trim(),
      grade,
      goal,
      contact: contact.trim(),
      time,
      createdAt: new Date().toISOString(),
    };
    try {
      const raw = localStorage.getItem("pingli:applications");
      const list: Application[] = raw ? JSON.parse(raw) : [];
      list.push(app);
      localStorage.setItem("pingli:applications", JSON.stringify(list));
    } catch {}
    setDone(app);
    setError("");
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
          <div className="text-5xl">🎉</div>
          <h1 className="mt-4 text-2xl font-extrabold text-slate-800">Заявка отправлена!</h1>
          <p className="mt-2 text-slate-500">
            Номер заявки: <b className="text-indigo-600">{done.id}</b>
          </p>
          <p className="mt-2 text-slate-500">
            {done.name} · {done.grade} · цель: {done.goal}
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Мы свяжемся с вами по контакту: {done.contact}
            {done.time ? ` · удобное время: ${done.time}` : ""}
          </p>
          <a href="/cabinet" className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-700">
            Открыть личный кабинет →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-800">Оставить заявку</h1>
        <p className="mt-1 text-slate-500">2 минуты — и мы подберём программу под класс и цель.</p>
      </header>
      <form onSubmit={submit} className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Имя ученика *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Например, Аня" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Класс</label>
          <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400">
            {GRADES.map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Цель</label>
          <div className="flex flex-wrap gap-2">
            {GOALS.map((g) => (
              <button key={g} type="button" onClick={() => setGoal(g)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${goal === g ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {g}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Телефон или почта *</label>
          <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="+7 … или email" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Удобное время для связи</label>
          <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Например, будни после 17:00" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400" />
        </div>
        {error && <p className="rounded-xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600">{error}</p>}
        <button type="submit" className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700">Отправить заявку →</button>
        <p className="text-center text-xs text-slate-400">Данные хранятся только в вашем браузере (прототип). При подключении сервера заявки будут отправляться на сервер.</p>
      </form>
    </div>
  );
}
