import Link from "next/link";
import { GRADES } from "@/lib/curriculum-full";

export function generateStaticParams() {
  return GRADES.map((g) => ({ id: g.id }));
}

export default async function GradePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const grade = GRADES.find((g) => g.id === id) ?? GRADES[0];
  return (
    <div className="space-y-8">
      <Link href="/grades" className="text-sm font-semibold text-indigo-600 hover:underline">← Все классы</Link>
      <header className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white shadow-lg">
        <div className="text-sm text-indigo-100">{grade.age} · {grade.character} · {grade.hours}</div>
        <h1 className="mt-1 text-3xl font-extrabold">{grade.title}</h1>
        <p className="mt-2 text-indigo-100">{grade.goal}</p>
        <p className="mt-1 text-sm text-indigo-100"><b>Нейроокно:</b> {grade.neuro}</p>
      </header>
      {grade.quarters.map((q) => (
        <section key={q.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-bold text-slate-800">{q.title}</h2>
          <ul className="mt-3 space-y-2">
            {q.topics.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-0.5 text-indigo-500">▸</span>
                <span>{t.title}
                  {t.fipi && <span className="ml-2 rounded bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-600">ФИПИ {t.fipi}</span>}
                  {t.sirius && <span className="ml-2 rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">{t.sirius}</span>}
                  {t.note && <span className="ml-2 text-xs text-slate-400">{t.note}</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <div className="flex flex-wrap gap-3">
        <Link href="/apply" className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-700">Оставить заявку →</Link>
        <Link href="/cabinet" className="rounded-xl bg-slate-100 px-6 py-3 font-bold text-slate-700 hover:bg-slate-200">Личный кабинет</Link>
      </div>
    </div>
  );
}
