import Link from "next/link";
import { GRADES } from "@/lib/curriculum-full";

export default function GradesPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-800">Полный курс 1–11 классов</h1>
        <p className="mt-1 text-slate-500">Каждый класс — отдельная программа: темы по четвертям, коды ФИПИ, надстройка Сириуса/МГУ, нейроокно.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GRADES.map((g) => (
          <Link key={g.id} href={`/grades/${g.id}`} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:ring-indigo-300">
            <div className="text-sm font-semibold text-indigo-600">{g.age} · {g.character}</div>
            <h2 className="mt-1 text-xl font-extrabold text-slate-800">{g.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{g.goal}</p>
            <p className="mt-2 text-xs text-slate-400">{g.hours}</p>
            <span className="mt-3 inline-block text-sm font-bold text-indigo-600">Открыть программу →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
