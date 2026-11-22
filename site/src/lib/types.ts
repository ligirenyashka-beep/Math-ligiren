// Core domain types for ПингЛи Академия

export type Standard = "ФГОС" | "Олимпиадная" | "Околошкольная" | "Высшая";

export interface Topic {
  id: string;
  title: string;
  /** Short human summary shown under the topic title */
  summary: string;
  /** Full theory content, rendered as structured blocks */
  theory: TheoryBlock[];
  /** Identifier of the practice generator to use for this topic */
  practice?: PracticeSpec;
  standard: Standard;
}

export interface Chapter {
  id: string;
  title: string;
  topics: Topic[];
}

export interface Grade {
  id: string;
  /** e.g. "1 класс", "Дошкольники", "Высшая математика" */
  title: string;
  /** age range label */
  ageLabel: string;
  chapters: Chapter[];
}

export interface Stage {
  id: string;
  title: string;
  ageLabel: string;
  /** color accent key */
  accent: string;
  emoji: string;
  description: string;
  grades: Grade[];
}

// ---- Theory rendering blocks ----
export type TheoryBlock =
  | { type: "text"; value: string }
  | { type: "heading"; value: string }
  | { type: "formula"; value: string; caption?: string }
  | { type: "list"; items: string[] }
  | { type: "example"; problem: string; solution: string }
  | { type: "tip"; value: string }
  | { type: "visual"; kind: VisualKind; caption?: string; data?: number[] };

export type VisualKind =
  | "numberline"
  | "counting"
  | "shapes"
  | "fraction"
  | "grid"
  | "coordinate"
  | "parabola"
  | "triangle"
  | "clock"
  | "barchart";

// ---- Practice generation ----
export type PracticeKind =
  | "count-objects" // visual, for 4-7 (no reading needed)
  | "compare-visual"
  | "shape-match"
  | "add-visual"
  | "arithmetic"
  | "multiplication"
  | "fractions"
  | "wordproblem"
  | "equation-linear"
  | "equation-quadratic"
  | "percent"
  | "powers"
  | "geometry-area"
  | "trigonometry"
  | "derivative"
  | "integral"
  | "olympiad";

export interface PracticeSpec {
  kind: PracticeKind;
  /** difficulty tier 1..5 */
  tier: number;
  /** whether the task needs almost no reading (young kids) */
  visual: boolean;
}

export interface GeneratedProblem {
  id: string;
  /** question prompt (may be short for young learners) */
  prompt: string;
  /** optional visual to render */
  visual?: { kind: VisualKind; data?: number[]; extra?: Record<string, number> };
  /** answer options for multiple choice; if empty use free input */
  options?: string[];
  answer: string;
  /** explanation shown after answering */
  explanation: string;
  /** for young kids: read prompt aloud text */
  speak?: string;
}
