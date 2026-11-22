"use client";

import type { VisualKind } from "@/lib/types";

const EMOJIS = ["🍎", "⭐", "🐱", "🎈", "🍓", "🌸", "🐟", "🚗", "🦋", "🍭"];

export function Visual({
  kind,
  data,
  extra,
  caption,
}: {
  kind: VisualKind;
  data?: number[];
  extra?: Record<string, number>;
  caption?: string;
}) {
  return (
    <figure className="my-2 flex flex-col items-center gap-2 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <div className="w-full overflow-x-auto">{render(kind, data, extra)}</div>
      {caption && <figcaption className="text-center text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}

function render(kind: VisualKind, data?: number[], extra?: Record<string, number>) {
  switch (kind) {
    case "counting":
      return <Counting data={data} extra={extra} />;
    case "numberline":
      return <NumberLine data={data} />;
    case "shapes":
      return <Shapes data={data} />;
    case "fraction":
      return <Fraction data={data} />;
    case "grid":
      return <Grid data={data} />;
    case "coordinate":
      return <Coordinate />;
    case "parabola":
      return <Parabola />;
    case "triangle":
      return <TriangleVis data={data} />;
    case "clock":
      return <Clock />;
    case "barchart":
      return <BarChart />;
    default:
      return null;
  }
}

function Counting({ data, extra }: { data?: number[]; extra?: Record<string, number> }) {
  const groups = data && data.length ? data : [3];
  const emoji = EMOJIS[extra?.emojiIndex ?? 0];
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {groups.map((n, gi) => (
        <div key={gi} className="flex flex-col items-center">
          <div className="grid max-w-[220px] grid-cols-5 gap-1 text-3xl sm:text-4xl">
            {Array.from({ length: n }).map((_, i) => (
              <span key={i} className="select-none">
                {emoji}
              </span>
            ))}
          </div>
          {groups.length > 1 && gi < groups.length - 1 && <div className="mt-1 text-2xl font-bold text-slate-400">+</div>}
        </div>
      ))}
    </div>
  );
}

function NumberLine({ data }: { data?: number[] }) {
  const negative = data && data[0] < 0;
  const start = negative ? -5 : 0;
  const end = 10;
  const nums = [];
  for (let i = start; i <= end; i++) nums.push(i);
  const w = 640;
  const pad = 24;
  const step = (w - pad * 2) / (nums.length - 1);
  return (
    <svg viewBox={`0 0 ${w} 80`} className="mx-auto w-full max-w-2xl">
      <line x1={pad} y1={40} x2={w - pad} y2={40} stroke="#94a3b8" strokeWidth={2} />
      {nums.map((n, i) => {
        const x = pad + i * step;
        return (
          <g key={n}>
            <line x1={x} y1={34} x2={x} y2={46} stroke="#94a3b8" strokeWidth={2} />
            <circle cx={x} cy={40} r={4} fill={n === 0 ? "#6366f1" : "#cbd5e1"} />
            <text x={x} y={66} textAnchor="middle" fontSize={13} fill="#475569">
              {n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Shapes({ data }: { data?: number[] }) {
  const highlight = data?.[0];
  return (
    <div className="flex items-center justify-center gap-8">
      <svg width={90} height={90} className={highlight === 0 ? "drop-shadow-lg" : ""}>
        <circle cx={45} cy={45} r={38} fill="#fda4af" stroke="#f43f5e" strokeWidth={3} />
      </svg>
      <svg width={90} height={90} className={highlight === 1 ? "drop-shadow-lg" : ""}>
        <rect x={10} y={10} width={70} height={70} rx={6} fill="#93c5fd" stroke="#3b82f6" strokeWidth={3} />
      </svg>
      <svg width={90} height={90} className={highlight === 2 ? "drop-shadow-lg" : ""}>
        <polygon points="45,8 82,80 8,80" fill="#86efac" stroke="#22c55e" strokeWidth={3} />
      </svg>
    </div>
  );
}

function Fraction({ data }: { data?: number[] }) {
  const num = data?.[0] ?? 3;
  const den = data?.[1] ?? 4;
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 110;
  const slices = Array.from({ length: den });
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[240px]">
      {slices.map((_, i) => {
        const a0 = (i / den) * 2 * Math.PI - Math.PI / 2;
        const a1 = ((i + 1) / den) * 2 * Math.PI - Math.PI / 2;
        const x0 = cx + r * Math.cos(a0);
        const y0 = cy + r * Math.sin(a0);
        const x1 = cx + r * Math.cos(a1);
        const y1 = cy + r * Math.sin(a1);
        const large = a1 - a0 > Math.PI ? 1 : 0;
        return (
          <path
            key={i}
            d={`M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`}
            fill={i < num ? "#818cf8" : "#e2e8f0"}
            stroke="#fff"
            strokeWidth={3}
          />
        );
      })}
    </svg>
  );
}

function Grid({ data }: { data?: number[] }) {
  const cols = data?.[0] ?? 4;
  const rows = data?.[1] ?? 3;
  const cell = 30;
  const w = cols * cell + 2;
  const h = rows * cell + 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mx-auto" style={{ maxWidth: Math.min(w * 1.5, 360) }}>
      {Array.from({ length: rows }).map((_, ri) =>
        Array.from({ length: cols }).map((_, ci) => (
          <rect
            key={`${ri}-${ci}`}
            x={ci * cell + 1}
            y={ri * cell + 1}
            width={cell}
            height={cell}
            fill="#c7d2fe"
            stroke="#6366f1"
            strokeWidth={1.5}
          />
        )),
      )}
    </svg>
  );
}

function Coordinate() {
  const size = 260;
  const c = size / 2;
  const line = (k: number, b: number, color: string) => {
    const x1 = -c;
    const x2 = c;
    const y1 = k * x1 + b * 20;
    const y2 = k * x2 + b * 20;
    return (
      <line x1={c + x1} y1={c - y1} x2={c + x2} y2={c - y2} stroke={color} strokeWidth={2.5} />
    );
  };
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[260px]">
      {[-4, -3, -2, -1, 1, 2, 3, 4].map((n) => (
        <g key={n}>
          <line x1={c + n * 25} y1={0} x2={c + n * 25} y2={size} stroke="#f1f5f9" />
          <line x1={0} y1={c + n * 25} x2={size} y2={c + n * 25} stroke="#f1f5f9" />
        </g>
      ))}
      <line x1={0} y1={c} x2={size} y2={c} stroke="#94a3b8" strokeWidth={1.5} />
      <line x1={c} y1={0} x2={c} y2={size} stroke="#94a3b8" strokeWidth={1.5} />
      {line(1, 1, "#6366f1")}
      {line(-0.5, -1, "#f43f5e")}
    </svg>
  );
}

function Parabola() {
  const size = 260;
  const c = size / 2;
  const pts: string[] = [];
  for (let x = -4; x <= 4; x += 0.2) {
    const y = x * x;
    pts.push(`${c + x * 28},${c - y * 12}`);
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[260px]">
      <line x1={0} y1={c} x2={size} y2={c} stroke="#94a3b8" strokeWidth={1.5} />
      <line x1={c} y1={0} x2={c} y2={size} stroke="#94a3b8" strokeWidth={1.5} />
      <polyline points={pts.join(" ")} fill="none" stroke="#6366f1" strokeWidth={3} />
    </svg>
  );
}

function TriangleVis({ data }: { data?: number[] }) {
  const a = data?.[0] ?? 3;
  const b = data?.[1] ?? 4;
  const scale = 22;
  const ox = 40;
  const oy = 150;
  const A = [ox, oy];
  const B = [ox + b * scale, oy];
  const C = [ox, oy - a * scale];
  return (
    <svg viewBox="0 0 260 170" className="mx-auto w-full max-w-[280px]">
      <polygon
        points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${C[0]},${C[1]}`}
        fill="#bae6fd"
        stroke="#0ea5e9"
        strokeWidth={2.5}
      />
      <rect x={ox} y={oy - 14} width={14} height={14} fill="none" stroke="#0ea5e9" strokeWidth={1.5} />
      <text x={ox - 22} y={oy - (a * scale) / 2} fontSize={13} fill="#0369a1">
        {a}
      </text>
      <text x={ox + (b * scale) / 2} y={oy + 18} fontSize={13} fill="#0369a1">
        {b}
      </text>
      <text x={(B[0] + C[0]) / 2 + 6} y={(B[1] + C[1]) / 2 - 4} fontSize={13} fill="#0369a1">
        c
      </text>
    </svg>
  );
}

function Clock() {
  const now = { h: 10, m: 10 };
  const c = 90;
  const hAngle = ((now.h % 12) + now.m / 60) * 30 - 90;
  const mAngle = now.m * 6 - 90;
  const hx = c + 45 * Math.cos((hAngle * Math.PI) / 180);
  const hy = c + 45 * Math.sin((hAngle * Math.PI) / 180);
  const mx = c + 65 * Math.cos((mAngle * Math.PI) / 180);
  const my = c + 65 * Math.sin((mAngle * Math.PI) / 180);
  return (
    <svg viewBox="0 0 180 180" className="mx-auto w-full max-w-[180px]">
      <circle cx={c} cy={c} r={80} fill="#fff" stroke="#334155" strokeWidth={4} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 - 90) * (Math.PI / 180);
        const x = c + 68 * Math.cos(a);
        const y = c + 68 * Math.sin(a) + 4;
        return (
          <text key={i} x={x} y={y} textAnchor="middle" fontSize={12} fill="#475569">
            {i === 0 ? 12 : i}
          </text>
        );
      })}
      <line x1={c} y1={c} x2={hx} y2={hy} stroke="#1e293b" strokeWidth={5} strokeLinecap="round" />
      <line x1={c} y1={c} x2={mx} y2={my} stroke="#6366f1" strokeWidth={3} strokeLinecap="round" />
      <circle cx={c} cy={c} r={5} fill="#1e293b" />
    </svg>
  );
}

function BarChart() {
  const bars = [1, 1, 1, 1, 1, 1];
  const w = 240;
  const h = 140;
  const bw = w / bars.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mx-auto w-full max-w-[260px]">
      {bars.map((_, i) => (
        <g key={i}>
          <rect x={i * bw + 8} y={h - 90} width={bw - 16} height={80} fill="#a78bfa" rx={4} />
          <text x={i * bw + bw / 2} y={h - 6} textAnchor="middle" fontSize={12} fill="#475569">
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}
