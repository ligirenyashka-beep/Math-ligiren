import { CHARACTERS } from "@/lib/curriculum-full";

export default function CharactersPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-800">Персонажи-проводники</h1>
        <p className="mt-1 text-slate-500">Каждый возраст — свой герой. Персонаж не эксплуатирует внимание: приветствие 10 секунд, прощание с мини-рефлексией.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CHARACTERS.map((c) => (
          <div key={c.name} className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100">
            <div className="text-5xl">{c.emoji}</div>
            <h2 className="mt-2 text-xl font-extrabold text-slate-800">{c.name}</h2>
            <p className="text-sm font-semibold text-indigo-600">{c.age}</p>
            <p className="mt-2 text-sm text-slate-600">{c.role}</p>
          </div>
        ))}
      </div>
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Видео и мультфильмы (план)</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
          <li>Видеоуроки 3–8 мин: противоречие → открытие → пример → мини-задача.</li>
          <li>Микро-анимации 5–15 сек без слов перед новым типом задания.</li>
          <li>Сезон 1 (1–4 кл.): «Приключения Пинга и Ли»; Сезон 2 (5–8 кл.): «Навигатор и Профессор»; Сезон 3 (9–11 кл.): «Капитан Экзамен».</li>
          <li>Сначала 3 пилотных серии, затем сезоны после подтверждения retention.</li>
        </ul>
      </section>
    </div>
  );
}
