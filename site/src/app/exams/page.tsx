import Link from "next/link";

const EXAMS = [
  {
    id: "vpr",
    title: "ВПР",
    subtitle: "Всероссийские проверочные работы",
    color: "from-emerald-400 to-teal-500",
    icon: "📝",
    desc: "Тренажёры по каждому классу с 4 по 8. Задания повторяют структуру ВПР по математике.",
    items: [
      { grade: "4 класс", topic: "g4-million" },
      { grade: "5 класс", topic: "g5-fractions" },
      { grade: "6 класс", topic: "g6-percent" },
      { grade: "7 класс", topic: "g7-linear" },
      { grade: "8 класс", topic: "g8-quadratic" },
    ],
  },
  {
    id: "oge",
    title: "ОГЭ",
    subtitle: "9 класс · основной госэкзамен",
    color: "from-sky-400 to-blue-500",
    icon: "🎯",
    desc: "Полная подготовка: числа, уравнения, функции, геометрия, прогрессии. Разбор каждого типа заданий.",
    items: [
      { grade: "Уравнения", topic: "g7-linear" },
      { grade: "Квадратные уравнения", topic: "g8-quadratic" },
      { grade: "Проценты", topic: "g6-percent" },
      { grade: "Прогрессии", topic: "g9-arith-prog" },
      { grade: "Геометрия", topic: "g8-pythagoras" },
    ],
  },
  {
    id: "ege",
    title: "ЕГЭ",
    subtitle: "11 класс · база и профиль",
    color: "from-violet-400 to-purple-500",
    icon: "🏅",
    desc: "Тригонометрия, производные, интегралы, вероятность, текстовые задачи. Всё, что нужно на профиле.",
    items: [
      { grade: "Тригонометрия", topic: "g10-trig-basic" },
      { grade: "Производные", topic: "g10-derivative" },
      { grade: "Интегралы", topic: "g11-integral" },
      { grade: "Вероятность", topic: "g11-probability" },
      { grade: "Проценты", topic: "g6-percent" },
    ],
  },
];

export default function ExamsPage() {
  return (
    <div className="space-y-8">
      <header className="rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-extrabold">🎯 Подготовка к экзаменам</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Отдельный блок для подготовки к ВПР по каждому классу, ОГЭ и ЕГЭ. Спокойный режим без
          таймеров — сначала разбираем теорию, потом закрепляем практикой.
        </p>
      </header>

      <div className="space-y-6">
        {EXAMS.map((exam) => (
          <section key={exam.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="flex flex-wrap items-center gap-4">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${exam.color} text-2xl text-white shadow`}
              >
                {exam.icon}
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">{exam.title}</h2>
                <p className="text-sm text-slate-500">{exam.subtitle}</p>
              </div>
            </div>
            <p className="mt-3 text-slate-600">{exam.desc}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {exam.items.map((it) => (
                <div
                  key={it.grade + it.topic}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <span className="text-sm font-medium text-slate-700">{it.grade}</span>
                  <div className="flex gap-2">
                    <Link
                      href={`/theory/${it.topic}`}
                      className="rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-indigo-600 ring-1 ring-indigo-100 hover:bg-indigo-50"
                    >
                      Теория
                    </Link>
                    <Link
                      href={`/practice/${it.topic}`}
                      className="rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-indigo-700"
                    >
                      Практика
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
