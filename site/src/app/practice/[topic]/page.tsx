import Link from "next/link";
import { notFound } from "next/navigation";
import { findTopic } from "@/lib/curriculum";
import { PracticeRunner } from "@/components/PracticeRunner";

export default async function TopicPracticePage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicId } = await params;
  const found = findTopic(topicId);
  if (!found || !found.topic.practice) notFound();
  const { stage, grade, chapter, topic } = found;
  const young = stage.id === "early";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <nav className="text-sm text-slate-400">
        <Link href="/practice" className="hover:text-indigo-600">
          Практика
        </Link>{" "}
        / <span>{grade.title}</span> / <span className="text-slate-600">{chapter.title}</span>
      </nav>

      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">{topic.title}</h1>
          <p className="text-slate-500">{topic.summary}</p>
        </div>
        <Link
          href={`/theory/${topic.id}`}
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-indigo-600 ring-1 ring-indigo-100 transition hover:bg-indigo-50"
        >
          📖 Открыть теорию
        </Link>
      </header>

      <PracticeRunner spec={topic.practice!} topicId={topic.id} young={young} />
    </div>
  );
}
