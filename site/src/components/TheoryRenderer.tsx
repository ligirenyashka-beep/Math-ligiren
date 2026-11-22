"use client";

import type { TheoryBlock } from "@/lib/types";
import { Visual } from "./Visual";

export function TheoryRenderer({ blocks }: { blocks: TheoryBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading":
            return (
              <h2 key={i} className="pt-2 text-xl font-extrabold text-slate-800">
                {b.value}
              </h2>
            );
          case "text":
            return (
              <p key={i} className="text-[17px] leading-relaxed text-slate-700">
                {b.value}
              </p>
            );
          case "formula":
            return (
              <div key={i} className="my-2 rounded-2xl bg-slate-900 px-5 py-4 text-center">
                <div className="font-mono text-lg text-emerald-300 sm:text-xl">{b.value}</div>
                {b.caption && <div className="mt-1 text-xs text-slate-400">{b.caption}</div>}
              </div>
            );
          case "list":
            return (
              <ul key={i} className="space-y-1.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2 text-[17px] text-slate-700">
                    <span className="text-indigo-500">•</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "example":
            return (
              <div key={i} className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-indigo-500">Пример</div>
                <div className="mt-1 font-semibold text-slate-800">{b.problem}</div>
                <div className="mt-2 text-slate-600">
                  <span className="font-semibold text-emerald-600">Решение: </span>
                  {b.solution}
                </div>
              </div>
            );
          case "tip":
            return (
              <div key={i} className="flex gap-3 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100">
                <span className="text-xl">💡</span>
                <p className="text-[15px] text-amber-800">{b.value}</p>
              </div>
            );
          case "visual":
            return <Visual key={i} kind={b.kind} caption={b.caption} data={b.data} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
