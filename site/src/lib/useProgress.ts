"use client";

import { useCallback, useEffect, useState } from "react";

export interface ProgressRow {
  topicId: string;
  solved: number;
  correct: number;
  mastered: boolean;
  stars: number;
}

function getClientId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("pingli_client_id");
  if (!id) {
    id = "u_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("pingli_client_id", id);
  }
  return id;
}

export function useProgress() {
  const [clientId, setClientId] = useState("");
  const [name, setNameState] = useState("Ученик");
  const [rows, setRows] = useState<ProgressRow[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = getClientId();
    setClientId(id);
    const savedName = localStorage.getItem("pingli_name");
    if (savedName) setNameState(savedName);
    // localStorage first (works without server)
    try {
      const raw = localStorage.getItem("pingli:progress");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setRows(parsed);
      }
    } catch {}
    fetch(`/api/progress?clientId=${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.progress) && d.progress.length > 0) {
          setRows(d.progress);
          try { localStorage.setItem("pingli:progress", JSON.stringify(d.progress)); } catch {}
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const setName = useCallback((n: string) => {
    setNameState(n);
    if (typeof window !== "undefined") localStorage.setItem("pingli_name", n);
  }, []);

  const record = useCallback(
    async (topicId: string, correct: boolean) => {
      if (!clientId) return;
      // optimistic
      setRows((prev) => {
        const idx = prev.findIndex((r) => r.topicId === topicId);
        if (idx === -1) {
          return [
            ...prev,
            { topicId, solved: 1, correct: correct ? 1 : 0, mastered: false, stars: correct ? 1 : 0 },
          ];
        }
        const copy = [...prev];
        const r = copy[idx];
        const newCorrect = r.correct + (correct ? 1 : 0);
        copy[idx] = {
          ...r,
          solved: r.solved + 1,
          correct: newCorrect,
          mastered: newCorrect >= 5,
          stars: Math.min(3, Math.floor(newCorrect / 3)),
        };
        return copy;
      });
      try {
        const raw = localStorage.getItem("pingli:progress");
        const cur: ProgressRow[] = raw ? JSON.parse(raw) : [];
        const idx = cur.findIndex((r) => r.topicId === topicId);
        if (idx === -1) {
          cur.push({ topicId, solved: 1, correct: correct ? 1 : 0, mastered: false, stars: correct ? 1 : 0 });
        } else {
          const r = cur[idx];
          const nc = r.correct + (correct ? 1 : 0);
          cur[idx] = { ...r, solved: r.solved + 1, correct: nc, mastered: nc >= 5, stars: Math.min(3, Math.floor(nc / 3)) };
        }
        localStorage.setItem("pingli:progress", JSON.stringify(cur));
      } catch {}
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clientId, topicId, correct, name }),
        });
      } catch {
        /* ignore network errors, optimistic state kept */
      }
    },
    [clientId, name],
  );

  const byTopic = useCallback(
    (topicId: string) => rows.find((r) => r.topicId === topicId),
    [rows],
  );

  const totals = {
    solved: rows.reduce((s, r) => s + r.solved, 0),
    correct: rows.reduce((s, r) => s + r.correct, 0),
    mastered: rows.filter((r) => r.mastered).length,
    stars: rows.reduce((s, r) => s + r.stars, 0),
  };

  return { clientId, name, setName, rows, byTopic, record, totals, loaded };
}
