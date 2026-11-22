import Link from "next/link";
import { STAGES } from "@/lib/curriculum";

const ACCENT: Record<string, string> = {
  rose: "from-rose-400 to-rose-500",
  amber: "from-amber-400 to-orange-500",
  emerald: "from-emerald-400 to-teal-500",
  sky: "from-sky-400 to-blue-500",
  violet: "from-violet-400 to-purple-500",
  indigo: "from-indigo-400 to-indigo-600",
};

export default function Home() {
  const topicCount = STAGES.reduce(
    (s, st) =>
      s + st.grades.reduce((g, gr) => g + gr.chapters.reduce((c, ch) => c + ch.topics.length, 0), 0),
    0,
  );

  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 px-6 py-14 text-white shadow-xl sm:px-12">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            🐧 Математика от 4 до 18+ лет · без таймеров
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            Прорыв в математике для каждого возраста
          </h1>
          <p className="mt-4 text-lg text-indigo-100">
            Единая система обучения: от счёта яблок до высшей математики. Теория по ФГОС,
            олимпиады и подготовка к ВПР, ОГЭ и ЕГЭ. Учитесь в своём темпе — мы убрали таймеры,
            потому что они убивают мотивацию.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/learn"
              className="rounded-xl bg-white px-6 py-3 font-bold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
            >
              Начать обучение →
            </Link>
            <Link
              href="/theory"
              className="rounded-xl bg-white/15 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/25"
            >
              Открыть теорию
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 text-[220px] opacity-10">
          ∑
        </div>
      </section>

      {/* Quick stats */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { n: "6", l: "макро-этапов" },
          { n: `${topicCount}+`, l: "тем и уроков" },
          { n: "0", l: "таймеров ⏱️✕" },
          { n: "∞", l: "попыток и терпения" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-100">
            <div className="text-3xl font-extrabold text-indigo-600">{s.n}</div>
            <div className="mt-1 text-sm text-slate-500">{s.l}</div>
          </div>
        ))}
      </section>

      {/* Stages */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">Ваш путь по возрастам</h2>
            <p className="text-slate-500">Выберите этап — программа подстроится под возраст.</p>
          </div>
          <Link href="/learn" className="hidden text-sm font-semibold text-indigo-600 hover:underline sm:block">
            Вся карта →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((stage) => (
            <Link
              key={stage.id}
              href={`/learn/${stage.id}`}
              className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${
                  ACCENT[stage.accent]
                } text-2xl text-white shadow`}
              >
                {stage.emoji}
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-800">{stage.title}</h3>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                  {stage.ageLabel}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm text-slate-500">{stage.description}</p>
              <span className="mt-4 text-sm font-semibold text-indigo-600 group-hover:underline">
                Перейти →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-2xl font-extrabold text-slate-800">Почему ПингЛи Академия</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            { icon: "🧩", t: "По возрасту", d: "Малыши учатся по картинкам без чтения, старшие — по ФГОС и стандартам РФ." },
            { icon: "🎨", t: "Наглядно", d: "Графики, дроби, фигуры и анимации — понятно и интересно." },
            { icon: "🕊️", t: "Без стресса", d: "Никаких таймеров. Сколько нужно попыток — столько и делайте." },
            { icon: "📚", t: "Вся теория", d: "Все темы школьной, околошкольной, олимпиадной и высшей математики." },
            { icon: "🎯", t: "Экзамены", d: "Подготовка к ВПР по классам, ОГЭ и ЕГЭ в отдельном блоке." },
            { icon: "🎓", t: "Для вузов", d: "Отдельная программа «Высшая математика» для абитуриентов и студентов." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl bg-slate-50 p-5">
              <div className="text-3xl">{c.icon}</div>
              <h3 className="mt-2 font-bold text-slate-800">{c.t}</h3>
              <p className="mt-1 text-sm text-slate-500">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
