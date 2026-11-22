import Link from "next/link";
import { notFound } from "next/navigation";
import { findTopic } from "@/lib/curriculum";
import { TheoryRenderer } from "@/components/TheoryRenderer";

export default async function TopicTheoryPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicId } = await params;
  const found = findTopic(topicId);
  if (!found) notFound();
  const { stage, grade, chapter, topic } = found;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <nav className="text-sm text-slate-400">
        <Link href="/theory" className="hover:text-indigo-600">
          Теория
        </Link>{" "}
        / <span>{stage.title}</span> / <span>{grade.title}</span> /{" "}
        <span className="text-slate-600">{chapter.title}</span>
      </nav>

      <header className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          {topic.standard}
        </span>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-800">{topic.title}</h1>
        <p className="mt-1 text-slate-500">{topic.summary}</p>
      </header>

      <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
        <TheoryRenderer blocks={topic.theory} />
      </article>

      <div className="flex flex-wrap gap-3">
        {topic.practice && (
          <Link
            href={`/practice/${topic.id}`}
            className="flex-1 rounded-xl bg-indigo-600 px-6 py-4 text-center font-bold text-white shadow-sm transition hover:bg-indigo-700"
          >
            ✏️ Перейти к практике
          </Link>
        )}
        <Link
          href={`/learn/${stage.id}`}
          className="flex-1 rounded-xl bg-white px-6 py-4 text-center font-bold text-indigo-600 ring-1 ring-indigo-100 transition hover:bg-indigo-50"
        >
          ← К этапу «{stage.title}»
        </Link>
      </div>
    </div>
  );
}
