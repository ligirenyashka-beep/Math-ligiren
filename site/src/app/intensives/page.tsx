import Link from "next/link";
import { INTENSIVES } from "@/lib/curriculum-full";

export default function IntensivesPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-800">Короткие интенсивы</h1>
        <p className="mt-1 text-slate-500">Фокус на одной теме за 1–8 недель. Без таймеров давления — в своём темпе.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {INTENSIVES.map((i) => (
          <div key={i.name} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-800">{i.name}</h2>
              <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">{i.duration}</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">{i.grades}</p>
            <p className="mt-2 text-sm text-slate-600">{i.desc}</p>
            <Link href="/apply" className="mt-4 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700">
              Записаться →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
