import type { Category, Product } from "@/types";

export const categories: Category[] = [
  {
    slug: "krabiki",
    title: "Крабики",
    subtitle: "Невесомая фиксация",
    description:
      "Изящные крабики с матовым покрытием — мягко удерживают волосы и подчёркивают силуэт причёски.",
    image: "/categories/krabiki.jpg",
  },
  {
    slug: "rascheski",
    title: "Расчёски",
    subtitle: "Деревянная коллекция",
    description:
      "Расчёски ручной работы из бука и груши с натуральной щетиной — забота о волосах с первого касания.",
    image: "/categories/rascheski.jpg",
  },
  {
    slug: "kosmetichki",
    title: "Косметички",
    subtitle: "Атлас и сатин",
    description:
      "Стёганые косметички из переработанного атласа — компактные, но вмещают всё самое необходимое.",
    image: "/categories/kosmetichki.jpg",
  },
  {
    slug: "grebeshki",
    title: "Гребешки",
    subtitle: "С персонализацией",
    description:
      "Деревянные гребешки с гравировкой имени или инициалов — превращайте подарок в личную историю.",
    image: "/categories/grebeshki.jpg",
  },
  {
    slug: "sumki",
    title: "Сумки",
    subtitle: "Мягкая кожа nappa",
    description:
      "Сумки минималистичных силуэтов из nappa‑кожи — спутник для прогулок, кафе и встреч.",
    image: "/categories/sumki.jpg",
  },
];

export const products: Product[] = [
  {
    id: "raschesk-aurora",
    name: "Расчёска «Aurora Blush»",
    category: "rascheski",
    price: 1490,
    images: ["/products/raschesk-aurora-blush.jpg"],
    description:
      "Расчёска из светлого бука с мягкой розовой полировкой и закруглёнными зубцами. Создана для нежного ухода за волосами в утреннем свете.",
    details: [
      "Длина: 20 см",
      "Материал: светлый бук, перламутровая полировка",
      "Антистатическое покрытие",
      "Подарочная упаковка из переработанного картона",
    ],
    isBestseller: true,
  },
  {
    id: "shkatulka-petite-maison",
    name: "Шкатулка «Petite Maison»",
    category: "kosmetichki",
    price: 3490,
    images: ["/products/shkatulka-petite-maison.jpg"],
    description:
      "Миниатюрная шкатулка для украшений и мелочей. Стёганый внешний слой, бархатная подкладка и тонкая золотая фурнитура — маленький дом для самого личного.",
    details: [
      "Размер: 14 × 10 × 7 см",
      "Материал: стёганый сатин, бархатная подкладка",
      "Магнитная застёжка",
      "Внутри — мягкие отделения и подушечка для колец",
    ],
    isBestseller: true,
  },
  {
    id: "krab-pearl",
    name: "Крабик «Pearl Whisper»",
    category: "krabiki",
    price: 1290,
    oldPrice: 1590,
    images: ["/products/krab-pearl-whisper.jpg"],
    description:
      "Крабик с жемчужным напылением, скруглёнными зубцами и бесшумным замком. Поддерживает даже густые волосы и не оставляет заломов.",
    details: [
      "Размер: 9 × 5 см",
      "Материал: ацетат, жемчужное напыление",
      "Бесшумный пружинный замок",
      "Подарочная упаковка из переработанного картона",
    ],
    isBestseller: true,
    colors: [
      { name: "Розовый кварц", hex: "#F4D6D8" },
      { name: "Айвори", hex: "#FBF4F1" },
      { name: "Шампань", hex: "#E5C9A8" },
    ],
  },
  {
    id: "krab-rose",
    name: "Крабик «Rose Petal»",
    category: "krabiki",
    price: 990,
    images: [
      "https://images.unsplash.com/photo-1633538155471-4e3c95ca2bf2?w=1200&q=80&auto=format&fit=crop",
    ],
    description:
      "Лёгкий крабик в форме лепестка из акрила премиум‑класса. Идеален для нежных пучков и небрежных причёсок.",
    details: [
      "Размер: 8 × 4.5 см",
      "Материал: премиум‑акрил",
      "Вес: 18 г",
    ],
    isNew: true,
  },
  {
    id: "krab-mini",
    name: "Набор мини‑крабиков «Bouquet»",
    category: "krabiki",
    price: 1490,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80&auto=format&fit=crop",
    ],
    description:
      "Набор из шести миниатюрных крабиков пастельной палитры — для тонких прядей и творческих причёсок.",
    details: [
      "В наборе: 6 крабиков",
      "Размер каждого: 4 × 2 см",
      "Материал: ацетат",
    ],
  },

  {
    id: "raschesk-buk",
    name: "Расчёска «Beech Bloom»",
    category: "rascheski",
    price: 1890,
    oldPrice: 2520,
    images: ["/products/raschesk-beech-bloom.jpg"],
    description:
      "Расчёска из массива бука с гладкой полировкой и натуральной щетиной кабана. Бережно распутывает и придаёт блеск.",
    details: [
      "Длина: 22 см",
      "Материал: массив бука, щетина кабана",
      "Подходит для всех типов волос",
    ],
    isBestseller: true,
  },
  {
    id: "kosmet-quilt",
    name: "Косметичка «Quilt Rose»",
    category: "kosmetichki",
    price: 2490,
    images: [],
    description:
      "Стёганая косметичка из переработанного атласа с золотистой молнией. Внутри — водоотталкивающая подкладка.",
    details: [
      "Размер: 22 × 15 × 8 см",
      "Материал: атлас, водоотталкивающая подкладка",
      "Молния YKK с золотым покрытием",
    ],
    isBestseller: true,
    colors: [
      { name: "Розовый кварц", hex: "#F4D6D8" },
      { name: "Пудра", hex: "#EFD7CE" },
    ],
  },
  {
    id: "greb-bamboo",
    name: "Гребешок «Bamboo Soul»",
    category: "grebeshki",
    price: 1890,
    images: [],
    description:
      "Лёгкий гребешок из бамбука с матовым лаком и индивидуальной гравировкой — экологичный подарок.",
    details: [
      "Длина: 15 см",
      "Материал: бамбук, матовый лак",
      "Гравировка до 16 символов",
    ],
    isNew: true,
    customizable: true,
  },

  {
    id: "sumka-pouch",
    name: "Сумка‑pouch «Cloud»",
    category: "sumki",
    price: 5490,
    images: [
      "https://images.unsplash.com/photo-1590739225497-56cdba9b5e0d?w=1200&q=80&auto=format&fit=crop",
    ],
    description:
      "Мягкая сумка‑облако из стёганой кожи. Лёгкость и объём для повседневных образов.",
    details: [
      "Размер: 30 × 22 × 10 см",
      "Материал: стёганая натуральная кожа",
      "Магнитная застёжка",
    ],
    isNew: true,
  },
];

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getBestsellers() {
  return products.filter((p) => p.isBestseller);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
