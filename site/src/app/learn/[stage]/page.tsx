import Link from "next/link";
import { notFound } from "next/navigation";
import { findStage } from "@/lib/curriculum";
import { StageGrades } from "./StageGrades";

export function generateStaticParams() {
  return [];
}

export default async function StagePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageId } = await params;
  const stage = findStage(stageId);
  if (!stage) notFound();

  return (
    <div className="space-y-8">
      <nav className="text-sm text-slate-400">
        <Link href="/learn" className="hover:text-indigo-600">
          Карта обучения
        </Link>{" "}
        / <span className="text-slate-600">{stage.title}</span>
      </nav>

      <header className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white shadow-lg">
        <div className="text-5xl">{stage.emoji}</div>
        <h1 className="mt-3 text-3xl font-extrabold">{stage.title}</h1>
        <p className="mt-1 text-indigo-100">
          {stage.ageLabel} · {stage.description}
        </p>
      </header>

      <StageGrades stage={stage} />
    </div>
  );
}
