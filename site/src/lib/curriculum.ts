import type { Stage, TheoryBlock, VisualKind } from "./types";

// Helper to keep theory declarations compact
const t = (value: string): TheoryBlock => ({ type: "text", value });
const h = (value: string): TheoryBlock => ({ type: "heading", value });
const f = (value: string, caption?: string): TheoryBlock => ({ type: "formula", value, caption });
const li = (items: string[]): TheoryBlock => ({ type: "list", items });
const ex = (problem: string, solution: string): TheoryBlock => ({ type: "example", problem, solution });
const tip = (value: string): TheoryBlock => ({ type: "tip", value });
const vis = (kind: VisualKind, caption?: string, data?: number[]): TheoryBlock =>
  ({ type: "visual", kind, caption, data });

export const STAGES: Stage[] = [
  // =========================================================
  // STAGE 1: Дошкольники 4-7
  // =========================================================
  {
    id: "early",
    title: "Малыши",
    ageLabel: "4–7 лет",
    accent: "rose",
    emoji: "🐣",
    description: "Первые числа, счёт, формы и цвета. Всё через картинки — читать почти не нужно.",
    grades: [
      {
        id: "pre-a",
        title: "Первые шаги",
        ageLabel: "4–5 лет",
        chapters: [
          {
            id: "pre-a-count",
            title: "Считаем предметы",
            topics: [
              {
                id: "count-1-5",
                title: "Числа от 1 до 5",
                summary: "Учимся считать яблочки, звёздочки и мячики.",
                standard: "ФГОС",
                theory: [
                  h("Считаем вместе!"),
                  t("Число показывает, сколько предметов. Посчитаем пальчиком каждую фигурку и назовём число."),
                  vis("counting", "Посчитай кружочки", [1, 2, 3, 4, 5]),
                  tip("Считай медленно и показывай пальчиком на каждый предмет — так не собьёшься!"),
                ],
                practice: { kind: "count-objects", tier: 1, visual: true },
              },
              {
                id: "count-1-10",
                title: "Числа от 1 до 10",
                summary: "Считаем побольше — до десяти.",
                standard: "ФГОС",
                theory: [
                  h("До десяти!"),
                  t("После пяти идут числа 6, 7, 8, 9 и 10. Десять — это две руки пальчиков."),
                  vis("numberline", "Числовая дорожка до 10"),
                ],
                practice: { kind: "count-objects", tier: 2, visual: true },
              },
            ],
          },
          {
            id: "pre-a-shapes",
            title: "Формы и фигуры",
            topics: [
              {
                id: "shapes-basic",
                title: "Круг, квадрат, треугольник",
                summary: "Узнаём фигуры вокруг нас.",
                standard: "ФГОС",
                theory: [
                  h("Волшебные фигуры"),
                  li(["⭕ Круг — как солнышко и колесо", "🟥 Квадрат — как окошко", "🔺 Треугольник — как крыша домика"]),
                  vis("shapes", "Найди фигуры"),
                ],
                practice: { kind: "shape-match", tier: 1, visual: true },
              },
            ],
          },
        ],
      },
      {
        id: "pre-b",
        title: "Готовимся к школе",
        ageLabel: "6–7 лет",
        chapters: [
          {
            id: "pre-b-compare",
            title: "Больше и меньше",
            topics: [
              {
                id: "compare",
                title: "Сравниваем количество",
                summary: "Где больше, а где меньше?",
                standard: "ФГОС",
                theory: [
                  h("Кого больше?"),
                  t("Чтобы узнать, где больше, посчитай предметы в каждой группе и сравни числа."),
                  vis("counting", "Слева и справа", [3, 5]),
                  tip("Больше — там, где число называем позже при счёте."),
                ],
                practice: { kind: "compare-visual", tier: 1, visual: true },
              },
            ],
          },
          {
            id: "pre-b-add",
            title: "Складываем и вычитаем",
            topics: [
              {
                id: "add-visual",
                title: "Сложение в пределах 10",
                summary: "Добавляем предметы и считаем сколько стало.",
                standard: "ФГОС",
                theory: [
                  h("Прибавляем!"),
                  t("Когда мы добавляем предметы — мы складываем. Знак сложения: +"),
                  ex("🍎🍎 + 🍎 = ?", "Было 2 яблока, добавили 1 — стало 3. 2 + 1 = 3"),
                  vis("counting", "Посчитай всё вместе", [2, 3]),
                ],
                practice: { kind: "add-visual", tier: 1, visual: true },
              },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================
  // STAGE 2: Начальная школа 7-11 (1-4 класс)
  // =========================================================
  {
    id: "primary",
    title: "Начальная школа",
    ageLabel: "7–11 лет",
    accent: "amber",
    emoji: "🎒",
    description: "1–4 класс. Числа до миллиона, таблица умножения, дроби, задачи и первая геометрия.",
    grades: [
      {
        id: "g1",
        title: "1 класс",
        ageLabel: "7 лет",
        chapters: [
          {
            id: "g1-num",
            title: "Числа до 20",
            topics: [
              {
                id: "g1-add20",
                title: "Сложение и вычитание до 20",
                summary: "Переход через десяток.",
                standard: "ФГОС",
                theory: [
                  h("Складываем через десяток"),
                  t("Чтобы сложить 8 + 5, дополни 8 до 10 (нужно 2), затем прибавь остаток 3: 8 + 2 + 3 = 13."),
                  f("8 + 5 = 8 + 2 + 3 = 13"),
                  ex("Реши 7 + 6", "7 + 3 = 10, осталось 3: 10 + 3 = 13"),
                ],
                practice: { kind: "arithmetic", tier: 1, visual: false },
              },
            ],
          },
          {
            id: "g1-geo",
            title: "Геометрические фигуры",
            topics: [
              {
                id: "g1-lines",
                title: "Точка, линия, отрезок, луч",
                summary: "Базовые геометрические объекты.",
                standard: "ФГОС",
                theory: [
                  h("Из чего состоит геометрия"),
                  li(["Точка — ставится карандашом, не имеет размера", "Прямая — бесконечная линия", "Отрезок — часть прямой с двумя концами", "Луч — начинается в точке и уходит в бесконечность"]),
                ],
              },
            ],
          },
        ],
      },
      {
        id: "g2",
        title: "2 класс",
        ageLabel: "8 лет",
        chapters: [
          {
            id: "g2-mult",
            title: "Таблица умножения",
            topics: [
              {
                id: "g2-multiplication",
                title: "Умножение и деление",
                summary: "Умножение — это сложение одинаковых чисел.",
                standard: "ФГОС",
                theory: [
                  h("Что такое умножение"),
                  t("Умножить 4 на 3 — значит сложить четыре три раза: 4 + 4 + 4 = 12."),
                  f("4 × 3 = 4 + 4 + 4 = 12"),
                  vis("grid", "3 ряда по 4 — всего 12"),
                  tip("Деление — обратное действие: 12 ÷ 3 = 4."),
                ],
                practice: { kind: "multiplication", tier: 1, visual: false },
              },
            ],
          },
          {
            id: "g2-time",
            title: "Время",
            topics: [
              {
                id: "g2-clock",
                title: "Часы и минуты",
                summary: "Учимся определять время по часам.",
                standard: "ФГОС",
                theory: [
                  h("Как читать часы"),
                  t("Короткая стрелка показывает часы, длинная — минуты. Полный круг длинной стрелки = 60 минут = 1 час."),
                  vis("clock", "Который час?"),
                ],
              },
            ],
          },
        ],
      },
      {
        id: "g3",
        title: "3 класс",
        ageLabel: "9 лет",
        chapters: [
          {
            id: "g3-mult",
            title: "Внетабличное умножение",
            topics: [
              {
                id: "g3-bigmult",
                title: "Умножение двузначных чисел",
                summary: "Умножаем 23 × 4 по разрядам.",
                standard: "ФГОС",
                theory: [
                  h("Умножаем по разрядам"),
                  t("Раскладываем число: 23 × 4 = (20 + 3) × 4 = 80 + 12 = 92."),
                  f("23 × 4 = 20×4 + 3×4 = 80 + 12 = 92"),
                ],
                practice: { kind: "multiplication", tier: 2, visual: false },
              },
            ],
          },
          {
            id: "g3-area",
            title: "Площадь",
            topics: [
              {
                id: "g3-rect-area",
                title: "Площадь прямоугольника",
                summary: "Площадь = длина × ширина.",
                standard: "ФГОС",
                theory: [
                  h("Считаем площадь"),
                  f("S = a × b", "a — длина, b — ширина"),
                  vis("grid", "Клетки внутри прямоугольника"),
                  ex("Прямоугольник 5×3", "S = 5 × 3 = 15 квадратных единиц"),
                ],
                practice: { kind: "geometry-area", tier: 1, visual: false },
              },
            ],
          },
        ],
      },
      {
        id: "g4",
        title: "4 класс",
        ageLabel: "10 лет",
        chapters: [
          {
            id: "g4-num",
            title: "Многозначные числа",
            topics: [
              {
                id: "g4-million",
                title: "Числа до миллиона",
                summary: "Классы и разряды больших чисел.",
                standard: "ФГОС",
                theory: [
                  h("Разряды и классы"),
                  t("Числа разбивают на классы по 3 цифры: единицы, тысячи, миллионы."),
                  li(["Единицы, десятки, сотни", "Тысячи, десятки тысяч, сотни тысяч", "Миллионы"]),
                ],
                practice: { kind: "arithmetic", tier: 3, visual: false },
              },
            ],
          },
          {
            id: "g4-word",
            title: "Задачи",
            topics: [
              {
                id: "g4-speed",
                title: "Скорость, время, расстояние",
                summary: "Главная формула движения.",
                standard: "ФГОС",
                theory: [
                  h("Формула движения"),
                  f("S = v × t", "путь = скорость × время"),
                  ex("Машина едет 60 км/ч 2 часа", "S = 60 × 2 = 120 км"),
                ],
                practice: { kind: "wordproblem", tier: 2, visual: false },
              },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================
  // STAGE 3: Средняя школа 11-15 (5-9 класс)
  // =========================================================
  {
    id: "middle",
    title: "Средняя школа",
    ageLabel: "11–15 лет",
    accent: "emerald",
    emoji: "📐",
    description: "5–9 класс. Дроби, проценты, уравнения, функции, геометрия. Подготовка к ОГЭ.",
    grades: [
      {
        id: "g5",
        title: "5 класс",
        ageLabel: "11 лет",
        chapters: [
          {
            id: "g5-frac",
            title: "Обыкновенные дроби",
            topics: [
              {
                id: "g5-fractions",
                title: "Дроби: что это такое",
                summary: "Числитель, знаменатель, часть от целого.",
                standard: "ФГОС",
                theory: [
                  h("Что такое дробь"),
                  t("Дробь показывает часть целого. В 3/4 знаменатель 4 — на сколько частей поделили, числитель 3 — сколько взяли."),
                  vis("fraction", "3/4 закрашено", [3, 4]),
                  tip("Чем больше знаменатель, тем меньше каждая часть."),
                ],
                practice: { kind: "fractions", tier: 1, visual: true },
              },
            ],
          },
          {
            id: "g5-nat",
            title: "Натуральные числа",
            topics: [
              {
                id: "g5-divis",
                title: "Делимость и признаки",
                summary: "Признаки делимости на 2, 3, 5, 9, 10.",
                standard: "ФГОС",
                theory: [
                  h("Признаки делимости"),
                  li(["На 2 — если последняя цифра чётная", "На 5 — если оканчивается на 0 или 5", "На 10 — если оканчивается на 0", "На 3 — если сумма цифр делится на 3", "На 9 — если сумма цифр делится на 9"]),
                  ex("Делится ли 258 на 3?", "2+5+8 = 15, 15 делится на 3 → да"),
                ],
                practice: { kind: "arithmetic", tier: 3, visual: false },
              },
            ],
          },
        ],
      },
      {
        id: "g6",
        title: "6 класс",
        ageLabel: "12 лет",
        chapters: [
          {
            id: "g6-perc",
            title: "Проценты и отношения",
            topics: [
              {
                id: "g6-percent",
                title: "Проценты",
                summary: "Процент — это сотая часть.",
                standard: "ФГОС",
                theory: [
                  h("Что такое процент"),
                  f("1% = 1/100 = 0,01"),
                  t("Чтобы найти процент от числа, умножь число на процент и раздели на 100."),
                  ex("20% от 150", "150 × 20 ÷ 100 = 30"),
                ],
                practice: { kind: "percent", tier: 1, visual: false },
              },
            ],
          },
          {
            id: "g6-neg",
            title: "Отрицательные числа",
            topics: [
              {
                id: "g6-integers",
                title: "Целые числа и координатная прямая",
                summary: "Числа со знаком минус.",
                standard: "ФГОС",
                theory: [
                  h("Отрицательные числа"),
                  t("Слева от нуля расположены отрицательные числа. Чем левее — тем меньше."),
                  vis("numberline", "Отрицательные и положительные"),
                  f("−3 + 5 = 2"),
                ],
                practice: { kind: "arithmetic", tier: 4, visual: false },
              },
            ],
          },
        ],
      },
      {
        id: "g7",
        title: "7 класс",
        ageLabel: "13 лет",
        chapters: [
          {
            id: "g7-alg",
            title: "Алгебра: уравнения",
            topics: [
              {
                id: "g7-linear",
                title: "Линейные уравнения",
                summary: "Находим неизвестное x.",
                standard: "ФГОС",
                theory: [
                  h("Линейное уравнение"),
                  f("ax + b = 0  ⟹  x = −b / a"),
                  t("Переносим слагаемые через знак равенства, меняя знак, затем делим."),
                  ex("2x + 6 = 0", "2x = −6, x = −3"),
                ],
                practice: { kind: "equation-linear", tier: 1, visual: false },
              },
              {
                id: "g7-func",
                title: "Линейная функция и график",
                summary: "y = kx + b — прямая линия.",
                standard: "ФГОС",
                theory: [
                  h("График прямой"),
                  f("y = kx + b", "k — наклон, b — сдвиг по оси y"),
                  vis("coordinate", "График y = kx + b"),
                ],
              },
            ],
          },
          {
            id: "g7-geo",
            title: "Геометрия: треугольники",
            topics: [
              {
                id: "g7-triangle",
                title: "Сумма углов треугольника",
                summary: "Всегда 180°.",
                standard: "ФГОС",
                theory: [
                  h("Углы треугольника"),
                  f("α + β + γ = 180°"),
                  vis("triangle", "Три угла в сумме дают 180°"),
                ],
              },
            ],
          },
        ],
      },
      {
        id: "g8",
        title: "8 класс",
        ageLabel: "14 лет",
        chapters: [
          {
            id: "g8-quad",
            title: "Квадратные уравнения",
            topics: [
              {
                id: "g8-quadratic",
                title: "Квадратные уравнения",
                summary: "Дискриминант и корни.",
                standard: "ФГОС",
                theory: [
                  h("Формула корней"),
                  f("ax² + bx + c = 0"),
                  f("D = b² − 4ac"),
                  f("x = (−b ± √D) / (2a)"),
                  ex("x² − 5x + 6 = 0", "D = 25 − 24 = 1, x = (5 ± 1)/2 → x=3 или x=2"),
                ],
                practice: { kind: "equation-quadratic", tier: 1, visual: false },
              },
              {
                id: "g8-parabola",
                title: "Парабола y = ax²",
                summary: "График квадратичной функции.",
                standard: "ФГОС",
                theory: [
                  h("Парабола"),
                  vis("parabola", "y = x²"),
                  t("Вершина параболы в точке x = −b/(2a)."),
                ],
              },
            ],
          },
          {
            id: "g8-pyth",
            title: "Теорема Пифагора",
            topics: [
              {
                id: "g8-pythagoras",
                title: "Теорема Пифагора",
                summary: "Связь сторон прямоугольного треугольника.",
                standard: "ФГОС",
                theory: [
                  h("Теорема Пифагора"),
                  f("a² + b² = c²", "c — гипотенуза"),
                  ex("Катеты 3 и 4", "c = √(9+16) = √25 = 5"),
                ],
                practice: { kind: "geometry-area", tier: 3, visual: false },
              },
            ],
          },
        ],
      },
      {
        id: "g9",
        title: "9 класс · ОГЭ",
        ageLabel: "15 лет",
        chapters: [
          {
            id: "g9-prog",
            title: "Прогрессии",
            topics: [
              {
                id: "g9-arith-prog",
                title: "Арифметическая прогрессия",
                summary: "Последовательность с постоянной разностью.",
                standard: "ФГОС",
                theory: [
                  h("Арифметическая прогрессия"),
                  f("aₙ = a₁ + (n−1)d"),
                  f("Sₙ = (a₁ + aₙ)·n / 2"),
                  ex("2, 5, 8, 11...", "d=3, a₅ = 2 + 4·3 = 14"),
                ],
                practice: { kind: "arithmetic", tier: 4, visual: false },
              },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================
  // STAGE 4: Старшая школа 15-18 (10-11 класс)
  // =========================================================
  {
    id: "high",
    title: "Старшая школа",
    ageLabel: "15–18 лет",
    accent: "sky",
    emoji: "🎓",
    description: "10–11 класс. Тригонометрия, производные, интегралы, вероятность. Подготовка к ЕГЭ.",
    grades: [
      {
        id: "g10",
        title: "10 класс",
        ageLabel: "16 лет",
        chapters: [
          {
            id: "g10-trig",
            title: "Тригонометрия",
            topics: [
              {
                id: "g10-trig-basic",
                title: "Синус, косинус, тангенс",
                summary: "Тригонометрические отношения.",
                standard: "ФГОС",
                theory: [
                  h("Тригонометрия"),
                  f("sin²α + cos²α = 1"),
                  f("tg α = sin α / cos α"),
                  li(["sin 30° = 1/2", "cos 60° = 1/2", "sin 90° = 1", "cos 0° = 1"]),
                ],
                practice: { kind: "trigonometry", tier: 1, visual: false },
              },
            ],
          },
          {
            id: "g10-deriv",
            title: "Производная",
            topics: [
              {
                id: "g10-derivative",
                title: "Производная функции",
                summary: "Скорость изменения функции.",
                standard: "ФГОС",
                theory: [
                  h("Правила дифференцирования"),
                  f("(xⁿ)' = n·xⁿ⁻¹"),
                  f("(sin x)' = cos x,  (cos x)' = −sin x"),
                  f("(eˣ)' = eˣ,  (ln x)' = 1/x"),
                  ex("f(x) = x³", "f'(x) = 3x²"),
                ],
                practice: { kind: "derivative", tier: 1, visual: false },
              },
            ],
          },
        ],
      },
      {
        id: "g11",
        title: "11 класс · ЕГЭ",
        ageLabel: "17–18 лет",
        chapters: [
          {
            id: "g11-int",
            title: "Интегралы",
            topics: [
              {
                id: "g11-integral",
                title: "Первообразная и интеграл",
                summary: "Действие, обратное производной.",
                standard: "ФГОС",
                theory: [
                  h("Интегрирование"),
                  f("∫ xⁿ dx = xⁿ⁺¹/(n+1) + C"),
                  f("∫ cos x dx = sin x + C"),
                  ex("∫ 2x dx", "= x² + C"),
                ],
                practice: { kind: "integral", tier: 1, visual: false },
              },
            ],
          },
          {
            id: "g11-prob",
            title: "Вероятность и статистика",
            topics: [
              {
                id: "g11-probability",
                title: "Классическая вероятность",
                summary: "Отношение благоприятных исходов ко всем.",
                standard: "ФГОС",
                theory: [
                  h("Вероятность"),
                  f("P = m / n", "m — благоприятные, n — все исходы"),
                  ex("Вероятность выпадения 6 на кубике", "P = 1/6 ≈ 0,17"),
                  vis("barchart", "Распределение исходов"),
                ],
                practice: { kind: "percent", tier: 3, visual: false },
              },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================
  // STAGE 5: Олимпиадная математика
  // =========================================================
  {
    id: "olympiad",
    title: "Олимпиадная математика",
    ageLabel: "8–18 лет",
    accent: "violet",
    emoji: "🏆",
    description: "Нестандартные задачи, логика, комбинаторика, теория чисел. Для будущих чемпионов.",
    grades: [
      {
        id: "olymp-junior",
        title: "Младшая лига",
        ageLabel: "8–11 лет",
        chapters: [
          {
            id: "ol-logic",
            title: "Логика и смекалка",
            topics: [
              {
                id: "ol-logic-basic",
                title: "Логические задачи",
                summary: "Задачи на рассуждение, а не на вычисление.",
                standard: "Олимпиадная",
                theory: [
                  h("Как решать логические задачи"),
                  t("Читай условие внимательно, выписывай факты и делай выводы шаг за шагом."),
                  ex("У Пети яблок в 2 раза больше, чем у Ани. Вместе 12. Сколько у Ани?", "Аня = x, Петя = 2x, 3x = 12, x = 4"),
                  tip("Здесь нет таймера — думай столько, сколько нужно!"),
                ],
                practice: { kind: "olympiad", tier: 2, visual: false },
              },
            ],
          },
        ],
      },
      {
        id: "olymp-senior",
        title: "Старшая лига",
        ageLabel: "12–18 лет",
        chapters: [
          {
            id: "ol-combi",
            title: "Комбинаторика",
            topics: [
              {
                id: "ol-combinatorics",
                title: "Перестановки и сочетания",
                summary: "Сколько способов? Считаем комбинации.",
                standard: "Олимпиадная",
                theory: [
                  h("Комбинаторика"),
                  f("Перестановки: Pₙ = n!"),
                  f("Сочетания: Cₙᵏ = n! / (k!·(n−k)!)"),
                  ex("Сколькими способами усадить 3 человек?", "3! = 6"),
                ],
                practice: { kind: "olympiad", tier: 4, visual: false },
              },
            ],
          },
          {
            id: "ol-numbertheory",
            title: "Теория чисел",
            topics: [
              {
                id: "ol-nt",
                title: "НОД, НОК, простые числа",
                summary: "Свойства делимости для олимпиад.",
                standard: "Олимпиадная",
                theory: [
                  h("Теория чисел"),
                  li(["Простое число делится только на 1 и на себя", "НОД — наибольший общий делитель", "НОК — наименьшее общее кратное"]),
                  f("НОД(a,b) × НОК(a,b) = a × b"),
                ],
                practice: { kind: "olympiad", tier: 5, visual: false },
              },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================
  // STAGE 6: Высшая математика
  // =========================================================
  {
    id: "higher",
    title: "Высшая математика",
    ageLabel: "Абитуриенты и студенты",
    accent: "indigo",
    emoji: "∑",
    description: "Матанализ, линейная алгебра, дифференциальные уравнения для вузов.",
    grades: [
      {
        id: "he-calc",
        title: "Математический анализ",
        ageLabel: "1 курс",
        chapters: [
          {
            id: "he-limits",
            title: "Пределы",
            topics: [
              {
                id: "he-limit",
                title: "Пределы последовательностей и функций",
                summary: "Основа всего матанализа.",
                standard: "Высшая",
                theory: [
                  h("Предел функции"),
                  f("lim (x→∞) 1/x = 0"),
                  f("lim (x→0) sin x / x = 1", "Первый замечательный предел"),
                  f("lim (x→∞) (1 + 1/x)ˣ = e", "Второй замечательный предел"),
                ],
                practice: { kind: "derivative", tier: 3, visual: false },
              },
            ],
          },
          {
            id: "he-series",
            title: "Ряды",
            topics: [
              {
                id: "he-taylor",
                title: "Ряд Тейлора",
                summary: "Разложение функции в степенной ряд.",
                standard: "Высшая",
                theory: [
                  h("Ряд Тейлора"),
                  f("f(x) = Σ f⁽ⁿ⁾(a)·(x−a)ⁿ / n!"),
                  f("eˣ = 1 + x + x²/2! + x³/3! + ..."),
                ],
                practice: { kind: "integral", tier: 4, visual: false },
              },
            ],
          },
        ],
      },
      {
        id: "he-linalg",
        title: "Линейная алгебра",
        ageLabel: "1–2 курс",
        chapters: [
          {
            id: "he-matrix",
            title: "Матрицы и определители",
            topics: [
              {
                id: "he-determinant",
                title: "Определитель матрицы 2×2",
                summary: "Ключевая характеристика матрицы.",
                standard: "Высшая",
                theory: [
                  h("Определитель 2×2"),
                  f("det = a·d − b·c"),
                  ex("Матрица [[2,1],[3,4]]", "det = 2·4 − 1·3 = 5"),
                ],
                practice: { kind: "arithmetic", tier: 5, visual: false },
              },
            ],
          },
        ],
      },
    ],
  },
];

// Flatten helpers
export function findStage(id: string) {
  return STAGES.find((s) => s.id === id);
}

export function findTopic(topicId: string) {
  for (const stage of STAGES) {
    for (const grade of stage.grades) {
      for (const chapter of grade.chapters) {
        const topic = chapter.topics.find((tp) => tp.id === topicId);
        if (topic) return { stage, grade, chapter, topic };
      }
    }
  }
  return null;
}

export function allTopicsWithPractice() {
  const out: { stageId: string; gradeId: string; topicId: string; title: string }[] = [];
  for (const stage of STAGES) {
    for (const grade of stage.grades) {
      for (const chapter of grade.chapters) {
        for (const topic of chapter.topics) {
          if (topic.practice) out.push({ stageId: stage.id, gradeId: grade.id, topicId: topic.id, title: topic.title });
        }
      }
    }
  }
  return out;
}
