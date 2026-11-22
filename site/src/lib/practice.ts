import type { GeneratedProblem, PracticeKind, PracticeSpec } from "./types";

// Seeded RNG so problems are reproducible per session but varied
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeRng(seed: number) {
  const r = mulberry32(seed);
  return {
    int: (min: number, max: number) => Math.floor(r() * (max - min + 1)) + min,
    pick: <T>(arr: T[]): T => arr[Math.floor(r() * arr.length)],
    next: r,
  };
}

const EMOJIS = ["🍎", "⭐", "🐱", "🎈", "🍓", "🌸", "🐟", "🚗", "🦋", "🍭"];

function shuffle<T>(arr: T[], r: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeOptions(correct: number, r: ReturnType<typeof makeRng>, spread = 5): string[] {
  const set = new Set<number>([correct]);
  while (set.size < 4) {
    const delta = r.int(-spread, spread);
    const cand = correct + delta;
    if (cand >= 0 || correct < 0) set.add(cand);
  }
  return shuffle([...set], r.next).map(String);
}

export function generateProblem(spec: PracticeSpec, seed: number): GeneratedProblem {
  const r = makeRng(seed);
  const id = `p-${seed}`;
  const kind: PracticeKind = spec.kind;
  const tier = spec.tier;

  switch (kind) {
    case "count-objects": {
      const n = r.int(tier === 1 ? 1 : 3, tier === 1 ? 5 : 10);
      const emoji = r.pick(EMOJIS);
      return {
        id,
        prompt: "Сколько здесь?",
        speak: "Посчитай, сколько предметов на картинке",
        visual: { kind: "counting", data: [n], extra: { emojiIndex: EMOJIS.indexOf(emoji) } },
        options: makeOptions(n, r, 3).map((v) => v),
        answer: String(n),
        explanation: `Считаем по одному: всего ${n}.`,
      };
    }
    case "compare-visual": {
      const a = r.int(1, 6);
      let b = r.int(1, 6);
      while (b === a) b = r.int(1, 6);
      const answer = a > b ? "◀ слева" : "справа ▶";
      return {
        id,
        prompt: "Где больше?",
        speak: "Посмотри на две группы и выбери, где предметов больше",
        visual: { kind: "counting", data: [a, b] },
        options: ["◀ слева", "справа ▶"],
        answer,
        explanation: `Слева ${a}, справа ${b}. Больше там, где ${Math.max(a, b)}.`,
      };
    }
    case "shape-match": {
      const shapes = ["круг", "квадрат", "треугольник"];
      const idx = r.int(0, 2);
      return {
        id,
        prompt: "Как называется эта фигура?",
        speak: "Выбери название фигуры",
        visual: { kind: "shapes", data: [idx] },
        options: shuffle(shapes, r.next),
        answer: shapes[idx],
        explanation: `Это ${shapes[idx]}.`,
      };
    }
    case "add-visual": {
      const a = r.int(1, 4);
      const b = r.int(1, 5);
      const sum = a + b;
      return {
        id,
        prompt: "Сколько стало вместе?",
        speak: "Посчитай все предметы вместе",
        visual: { kind: "counting", data: [a, b] },
        options: makeOptions(sum, r, 3),
        answer: String(sum),
        explanation: `${a} + ${b} = ${sum}.`,
      };
    }
    case "arithmetic": {
      const ranges: [number, number][] = [
        [1, 20],
        [10, 100],
        [100, 1000],
        [-50, 50],
        [2, 12],
      ];
      const [lo, hi] = ranges[Math.min(tier - 1, ranges.length - 1)];
      const a = r.int(lo, hi);
      const b = r.int(lo, hi);
      const op = r.pick(["+", "−"]);
      const answer = op === "+" ? a + b : a - b;
      return {
        id,
        prompt: `${a} ${op} ${b} = ?`,
        options: makeOptions(answer, r, Math.max(3, Math.round((hi - lo) / 8))),
        answer: String(answer),
        explanation: `${a} ${op} ${b} = ${answer}.`,
      };
    }
    case "multiplication": {
      const max = tier === 1 ? 9 : 20;
      const a = r.int(2, max);
      const b = r.int(2, 9);
      const answer = a * b;
      return {
        id,
        prompt: `${a} × ${b} = ?`,
        options: makeOptions(answer, r, 10),
        answer: String(answer),
        explanation: `${a} × ${b} = ${answer}.`,
      };
    }
    case "fractions": {
      const den = r.pick([2, 3, 4, 5, 6, 8]);
      const num = r.int(1, den - 1);
      return {
        id,
        prompt: "Какая дробь закрашена?",
        visual: { kind: "fraction", data: [num, den] },
        options: shuffle(
          [
            `${num}/${den}`,
            `${den - num}/${den}`,
            `${num}/${den + 1}`,
            `${num + 1}/${den}`,
          ],
          r.next,
        ),
        answer: `${num}/${den}`,
        explanation: `Закрашено ${num} из ${den} частей → ${num}/${den}.`,
      };
    }
    case "percent": {
      const base = r.pick([50, 100, 150, 200, 80, 120, 6]);
      const pct = r.pick([10, 20, 25, 50, 5]);
      const answer = (base * pct) / 100;
      return {
        id,
        prompt: `Найди ${pct}% от ${base}`,
        options: makeOptions(answer, r, Math.max(2, Math.round(answer / 2))),
        answer: String(answer),
        explanation: `${base} × ${pct} ÷ 100 = ${answer}.`,
      };
    }
    case "powers": {
      const base = r.int(2, 6);
      const exp = r.int(2, 3);
      const answer = base ** exp;
      return {
        id,
        prompt: `${base}^${exp} = ?`,
        options: makeOptions(answer, r, 15),
        answer: String(answer),
        explanation: `${base} в степени ${exp} = ${answer}.`,
      };
    }
    case "equation-linear": {
      const a = r.int(2, 9);
      const x = r.int(-6, 8);
      const b = r.int(-10, 10);
      const c = a * x + b;
      return {
        id,
        prompt: `Реши: ${a}x ${b >= 0 ? "+ " + b : "− " + Math.abs(b)} = ${c}`,
        options: makeOptions(x, r, 4),
        answer: String(x),
        explanation: `${a}x = ${c} ${b >= 0 ? "−" : "+"} ${Math.abs(b)} = ${c - b}; x = ${c - b} ÷ ${a} = ${x}.`,
      };
    }
    case "equation-quadratic": {
      // build x² + bx + c with integer roots
      const r1 = r.int(-6, 6);
      let r2 = r.int(-6, 6);
      while (r2 === r1) r2 = r.int(-6, 6);
      const b = -(r1 + r2);
      const c = r1 * r2;
      const roots = [r1, r2].sort((p, q) => p - q);
      const answer = `${roots[0]}; ${roots[1]}`;
      const wrongs = [
        `${roots[0] + 1}; ${roots[1]}`,
        `${roots[0]}; ${roots[1] - 1}`,
        `${-roots[0]}; ${-roots[1]}`,
      ];
      return {
        id,
        prompt: `Найди корни: x² ${b >= 0 ? "+ " + b : "− " + Math.abs(b)}x ${c >= 0 ? "+ " + c : "− " + Math.abs(c)} = 0`,
        options: shuffle([answer, ...wrongs], r.next),
        answer,
        explanation: `D = ${b}² − 4·${c} = ${b * b - 4 * c}. Корни: x₁ = ${roots[0]}, x₂ = ${roots[1]}.`,
      };
    }
    case "geometry-area": {
      if (tier >= 3) {
        // pythagoras
        const triples = [
          [3, 4, 5],
          [6, 8, 10],
          [5, 12, 13],
          [8, 15, 17],
        ];
        const [x, y, z] = r.pick(triples);
        return {
          id,
          prompt: `Катеты прямоугольного треугольника ${x} и ${y}. Найди гипотенузу.`,
          visual: { kind: "triangle", data: [x, y] },
          options: makeOptions(z, r, 4),
          answer: String(z),
          explanation: `c = √(${x}² + ${y}²) = √${x * x + y * y} = ${z}.`,
        };
      }
      const a = r.int(2, 12);
      const b = r.int(2, 12);
      return {
        id,
        prompt: `Площадь прямоугольника ${a} × ${b}?`,
        visual: { kind: "grid", data: [a, b] },
        options: makeOptions(a * b, r, 8),
        answer: String(a * b),
        explanation: `S = ${a} × ${b} = ${a * b}.`,
      };
    }
    case "trigonometry": {
      const table: Record<string, string> = {
        "sin 30°": "1/2",
        "cos 60°": "1/2",
        "sin 90°": "1",
        "cos 0°": "1",
        "sin 0°": "0",
        "cos 90°": "0",
        "sin 45°": "√2/2",
        "cos 45°": "√2/2",
      };
      const keys = Object.keys(table);
      const key = r.pick(keys);
      const answer = table[key];
      const opts = shuffle([...new Set(["1/2", "1", "0", "√2/2", "√3/2"])], r.next).slice(0, 4);
      if (!opts.includes(answer)) opts[0] = answer;
      return {
        id,
        prompt: `Чему равен ${key}?`,
        options: shuffle(opts, r.next),
        answer,
        explanation: `${key} = ${answer}.`,
      };
    }
    case "derivative": {
      const n = r.int(2, 6);
      const answer = `${n}x^${n - 1}`;
      const opts = shuffle(
        [answer, `${n - 1}x^${n}`, `${n}x^${n}`, `x^${n - 1}`],
        r.next,
      );
      return {
        id,
        prompt: `Найди производную f(x) = x^${n}`,
        options: opts,
        answer,
        explanation: `(xⁿ)' = n·xⁿ⁻¹, значит (x^${n})' = ${n}x^${n - 1}.`,
      };
    }
    case "integral": {
      const n = r.int(1, 5);
      const answer = `x^${n + 1}/${n + 1} + C`;
      const opts = shuffle(
        [answer, `x^${n}/${n} + C`, `${n}x^${n - 1} + C`, `x^${n + 1} + C`],
        r.next,
      );
      return {
        id,
        prompt: `Вычисли ∫ x^${n} dx`,
        options: opts,
        answer,
        explanation: `∫xⁿ dx = xⁿ⁺¹/(n+1) + C = x^${n + 1}/${n + 1} + C.`,
      };
    }
    case "olympiad": {
      // logic/word style problems
      const type = r.int(0, 2);
      if (type === 0) {
        const ani = r.int(2, 9);
        const total = ani * 3;
        return {
          id,
          prompt: `У Пети яблок в 2 раза больше, чем у Ани. Вместе ${total}. Сколько у Ани?`,
          options: makeOptions(ani, r, 3),
          answer: String(ani),
          explanation: `Аня = x, Петя = 2x, 3x = ${total}, x = ${ani}.`,
        };
      }
      if (type === 1) {
        const n = r.int(3, 6);
        const answer = (n * (n - 1)) / 2;
        return {
          id,
          prompt: `Сколько рукопожатий сделают ${n} человек, если каждый поздоровается с каждым?`,
          options: makeOptions(answer, r, 4),
          answer: String(answer),
          explanation: `Каждая пара — одно рукопожатие: C(${n},2) = ${n}·${n - 1}/2 = ${answer}.`,
        };
      }
      const days = r.int(4, 8);
      const answer = days - 1;
      return {
        id,
        prompt: `Улитка за день ползёт вверх на 3 м, за ночь сползает на 2 м. Колодец ${days + 2} м. За сколько дней вылезет?`,
        options: makeOptions(answer, r, 3),
        answer: String(answer),
        explanation: `Каждые сутки +1 м, но в последний день +3 сразу. Ответ: ${answer} дн.`,
      };
    }
    default: {
      const a = r.int(1, 10);
      const b = r.int(1, 10);
      return {
        id,
        prompt: `${a} + ${b} = ?`,
        options: makeOptions(a + b, r, 3),
        answer: String(a + b),
        explanation: `${a} + ${b} = ${a + b}.`,
      };
    }
  }
}

export function generateSet(spec: PracticeSpec, baseSeed: number, count: number): GeneratedProblem[] {
  const out: GeneratedProblem[] = [];
  for (let i = 0; i < count; i++) {
    out.push(generateProblem(spec, baseSeed * 100 + i * 7919));
  }
  return out;
}
