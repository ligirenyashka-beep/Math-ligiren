import { db } from "@/db";
import { topicProgress, learners } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

// GET /api/progress?clientId=...
export async function GET(req: Request) {
  if (!db) return Response.json({ progress: [] });
  const url = new URL(req.url);
  const clientId = url.searchParams.get("clientId");
  if (!clientId) return Response.json({ error: "clientId required" }, { status: 400 });

  try {
    const rows = await db
      .select()
      .from(topicProgress)
      .where(eq(topicProgress.clientId, clientId));
    return Response.json({ progress: rows });
  } catch {
    return Response.json({ progress: [] });
  }
}

// POST /api/progress  { clientId, topicId, correct: boolean, name? }
export async function POST(req: Request) {
  if (!db) return Response.json({ ok: true, mode: "local" });
  try {
    const body = await req.json();
    const { clientId, topicId, correct, name } = body as {
      clientId: string;
      topicId: string;
      correct: boolean;
      name?: string;
    };
    if (!clientId || !topicId) {
      return Response.json({ error: "missing fields" }, { status: 400 });
    }

    // ensure learner exists
    const existingLearner = await db
      .select()
      .from(learners)
      .where(eq(learners.clientId, clientId))
      .limit(1);
    if (existingLearner.length === 0) {
      await db.insert(learners).values({ clientId, name: name ?? "Ученик" }).onConflictDoNothing();
    } else if (name && existingLearner[0].name !== name) {
      await db.update(learners).set({ name }).where(eq(learners.clientId, clientId));
    }

    const existing = await db
      .select()
      .from(topicProgress)
      .where(and(eq(topicProgress.clientId, clientId), eq(topicProgress.topicId, topicId)))
      .limit(1);

    if (existing.length === 0) {
      const stars = correct ? 1 : 0;
      await db.insert(topicProgress).values({
        clientId,
        topicId,
        solved: 1,
        correct: correct ? 1 : 0,
        stars,
        mastered: false,
      });
    } else {
      const row = existing[0];
      const newCorrect = row.correct + (correct ? 1 : 0);
      const newSolved = row.solved + 1;
      const mastered = newCorrect >= 5;
      const stars = Math.min(3, Math.floor(newCorrect / 3));
      await db
        .update(topicProgress)
        .set({
          solved: newSolved,
          correct: newCorrect,
          mastered,
          stars,
          updatedAt: new Date(),
        })
        .where(eq(topicProgress.id, row.id));
    }

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
