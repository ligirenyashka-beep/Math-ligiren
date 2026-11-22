"use client";

import { useProgress } from "@/lib/useProgress";
import { STAGES, findTopic } from "@/lib/curriculum";

export default function ParentPage() {
  const { name, rows, totals } = useProgress();
  const accuracy = totals.solved > 0 ? Math.round((totals.correct / totals.solved) * 100) : 0;

  const masteredTitles = rows.filter((r) => r.mastered).map((r) => findTopic(r.topicId)?.topic.title ?? r.topicId);
  const inProgress = rows.filter((r) => !r.mastered && r.solved > 0).map((r) => ({
    title: findTopic(r.topicId)?.topic.title ?? r.topicId,
    solved: r.solved,
    correct: r.correct,
  }));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-800">Дашборд родителя</h1>
        <p className="mt-1 text-slate-500">Прогресс — не баллы, а карта освоенных навыков с рекомендациями.</p>
      </header>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { n: totals.solved, l: "решено задач" },
          { n: `${accuracy}%`, l: "точность" },
          { n: totals.mastered, l: "тем освоено" },
          { n: totals.stars, l: "звёзд ⭐" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-100">
            <div className="text-3xl font-extrabold text-indigo-600">{s.n}</div>
            <div className="mt-1 text-sm text-slate-500">{s.l}</div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Сильные стороны {name ? `— ${name}` : ""}</h2>
        {masteredTitles.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">Пока нет полностью освоенных тем. Ребёнок только начинает — это нормально. Регулярные короткие занятия важнее длинных.</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {masteredTitles.map((t) => <li key={t} className="text-sm text-slate-600">✅ {t}</li>)}
          </ul>
        )}
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Зоны роста (без паники)</h2>
        {inProgress.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">Трудностей пока не видно. Продолжайте в том же темпе!</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {inProgress.map((t) => (
              <li key={t.title} className="text-sm text-slate-600">🌱 {t.title} — решено {t.solved}, верно {t.correct}. Рекомендация: короткое повторение с подсказкой, без давления.</li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Рекомендации и семейные задания</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
          <li>Предложите посчитать ступеньки, окна, машины по дороге.</li>
          <li>Измерьте комнату вместе (длина, ширина, площадь).</li>
          <li>Взвесьте продукты и сравните: что тяжелее?</li>
          <li>Сыграйте в «магазин»: цены, сдача, подсчёт.</li>
          <li>Занимайтесь в первой половине дня; сон закрепляет навык.</li>
          <li>Хвалите за усилие и рассуждение, а не только за ответ.</li>
        </ul>
        <p className="mt-3 text-xs text-slate-400">Еженедельный отчёт придёт на почту (при подключении сервера). Уведомления — только о важном.</p>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Все этапы курса</h2>
        <div className="mt-3 space-y-2">
          {STAGES.map((s) => (
            <div key={s.id} className="text-sm text-slate-600"><b>{s.emoji} {s.title}</b> · {s.ageLabel} — {s.description}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
