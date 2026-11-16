/**
 * All copy and artwork live here.
 * Drop your own files into /public/art and set src to "/art/file.jpg".
 * Remote photos are stand-ins so the layout can be reviewed before real work is added.
 */

export type Piece = {
  id: string;
  src: string;
  alt: string;
  title: string;
  medium: string;
  year: string;
  tone: string;
};

export type Experience = {
  place: string;
  role: string;
  text: string;
};

export type Journey = {
  num: string;
  title: string;
  kicker: string;
  image: string;
  text: string;
};

export type Stat = {
  value: string;
  label: string;
};

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const wash = (from: string, to: string) => `linear-gradient(150deg, ${from}, ${to})`;

function piece(
  id: string,
  photo: string,
  title: string,
  medium: string,
  year: string,
  from: string,
  to: string,
  w = 1400,
): Piece {
  return {
    id,
    src: img(photo, w),
    alt: `${title}, ${medium}, ${year}`,
    title,
    medium,
    year,
    tone: wash(from, to),
  };
}

export const artist = {
  name: "Jennet.K",
  first: "Jennet",
  last: "K",
  year: "2026",
  email: "hello@milaorlova.art",
  phone: "+1 415 555 0198",
  site: "milaorlova.art",
  intro:
    "Oil paintings about memory, skin and light. A canvas starts as a quiet sketch and ends louder than I planned.",
};

export const hero = {
  main: piece(
    "after-the-rain",
    "photo-1541961017774-22349e4a1262",
    "After the Rain",
    "Acrylic on canvas",
    "2025",
    "#e39a62",
    "#6d2c34",
    1600,
  ),
  detail: piece(
    "warm-ground",
    "photo-1605721911519-3dfeb3be25e7",
    "Warm Ground",
    "Oil on linen",
    "2024",
    "#e8b07a",
    "#c45a6a",
    800,
  ),
};

export const oils = {
  text: "Large canvases from the studio. Layered pigment, scraped edges, and the slow heat of oil.",
  items: [
    piece("red-room", "photo-1547826039-bfc35e0f1ea8", "Red Room", "Oil on linen", "2025", "#e07a3d", "#7a2418"),
    piece("blue-water", "photo-1515405295579-ba7b45403062", "Blue Water", "Oil on canvas", "2024", "#7ea0c4", "#1a3048"),
    piece("the-window", "photo-1561214115-f2f134cc4912", "The Window, March", "Oil on canvas", "2025", "#e0b04a", "#2a241c"),
    piece("copper-light", "photo-1536924940846-227afb31e2a5", "Copper Light", "Oil on linen", "2023", "#e07040", "#1a2848"),
    piece("june-flowers", "photo-1579783900882-c0d3dad7b119", "June Flowers", "Oil on canvas", "2024", "#d46a78", "#2a1814"),
  ],
};

export const abstracts = {
  text: "Gesture, stain and the tools that make them. Pigment, brushes, and the mark left after the hand leaves.",
  items: [
    piece("field-note", "photo-1460661419201-fd4cecdf8a8b", "Loaded Brushes", "Studio", "2025", "#e85d4c", "#2f6f8f", 1200),
    piece("pigment", "photo-1579965342575-16428a7c8881", "Pigment", "Oil on paper", "2024", "#c4523a", "#e6c49a", 900),
    piece("open-palette", "photo-1459908676235-d5f02a50184b", "Open Palette", "Mixed media", "2023", "#d98a3a", "#4a6a38", 900),
    piece("thick-light", "photo-1605721911519-3dfeb3be25e7", "Thick Light", "Oil on linen", "2025", "#e8b07a", "#c45a6a", 900),
    piece("painted-face", "photo-1547891654-e66ed7ebb968", "Painted Face", "Acrylic on wall", "2022", "#e8c4a8", "#2a6a78", 1200),
  ],
};

export const selected: Piece[] = [
  piece("north-edge", "photo-1470071459604-3b5ec3a7fe05", "North Edge", "Oil on canvas", "2023", "#8a9aa4", "#1c2428"),
  piece("late-sun", "photo-1469474968028-56623f02e42e", "Late Sun", "Oil on linen", "2024", "#e0a060", "#3a4a28"),
  piece("still-water", "photo-1501785888041-af3ef285b470", "Still Water", "Oil on canvas", "2022", "#7aa0b8", "#1a2830"),
  piece("green-field", "photo-1472214103451-9374bd1c798e", "Green Field", "Acrylic on canvas", "2023", "#8aaa58", "#2a3a20"),
  piece("after-storm", "photo-1433086966358-54859d0ed716", "After the Storm", "Oil on linen", "2021", "#6a8a98", "#1a2428"),
  piece("high-pass", "photo-1506905925346-21bda4d32df4", "High Pass", "Oil on canvas", "2024", "#d8d4dc", "#2a3444"),
  piece("market-day", "photo-1577720643272-265f09367456", "Market Day", "Oil on canvas", "2022", "#c45a48", "#3a3428"),
  piece("alpine-note", "photo-1582201943021-e8e5cb6dedc2", "Alpine Note", "Watercolour", "2020", "#e4e0d4", "#8a9080"),
];

export const portraits = {
  text: "Faces from long sittings. Warm skin against a cold ground, one person at a time, until presence feels physical.",
  items: [
    piece("mara", "photo-1531746020798-e6953c6e8e04", "Mara, Seated", "Oil on linen", "2025", "#c48a72", "#2a1614", 1000),
    piece("yellow-hour", "photo-1534528741775-53994a69daeb", "Yellow Hour", "Oil on canvas", "2024", "#e0b45a", "#3a2a22", 1000),
    piece("anna", "photo-1544005313-94ddf0286df2", "Anna in Grey", "Oil on linen", "2023", "#c8b8ae", "#2a2422", 1000),
  ],
};

export const awards: Piece[] = [
  piece("prize-emerging", "photo-1582201943021-e8e5cb6dedc2", "Best Emerging Painter", "Contemporary Art Prize", "2025", "#d8d4c8", "#6a6848"),
  piece("prize-choice", "photo-1577720643272-265f09367456", "Public Choice", "City Art Biennale", "2024", "#6a4030", "#1a1810"),
  piece("prize-gold", "photo-1506905925346-21bda4d32df4", "Gold Award", "Oil Painting Society", "2024", "#d0d4dc", "#2a3448"),
  piece("prize-finalist", "photo-1470071459604-3b5ec3a7fe05", "Top 10 Finalist", "Landscape Open", "2023", "#8aa0a8", "#1c2830"),
];

export const journeyPages: Journey[][] = [
  [
    {
      num: "01",
      title: "Art Workshops",
      kicker: "Teaching & Sharing",
      image: "/art/exp-workshops.jpg?v=1",
      text: "Conducting art workshops to inspire and share the beauty of painting.",
    },
    {
      num: "02",
      title: "Exhibitions",
      kicker: "Art in the World",
      image: "/art/exp-exhibitions.jpg?v=1",
      text: "Participation in exhibitions, showcasing my artworks to a wider audience.",
    },
    {
      num: "03",
      title: "Artistic Research",
      kicker: "Exploration & Study",
      image: "/art/exp-research.jpg?v=1",
      text: "Continuous exploration of artistic techniques and classical traditions.",
    },
  ],
  [
    {
      num: "01",
      title: "Studio Residency",
      kicker: "Shared Atelier",
      image: "/art/exp-exhibitions.jpg?v=1",
      text: "A season in a shared studio, ending with an open weekend of new portraits.",
    },
    {
      num: "02",
      title: "Solo Exhibition",
      kicker: "Gallery Nord",
      image: "/art/exp-research.jpg?v=1",
      text: "Twenty-four canvases over three weeks, plus a live painting evening.",
    },
    {
      num: "03",
      title: "Commissions",
      kicker: "Private Rooms",
      image: "/art/exp-workshops.jpg?v=1",
      text: "Murals and private paintings for homes, small hotels and quiet rooms.",
    },
  ],
  [
    {
      num: "01",
      title: "Open Studios",
      kicker: "Meet the Work",
      image: "/art/exp-research.jpg?v=1",
      text: "Weekend visits where new paintings are shown in the room they were made.",
    },
    {
      num: "02",
      title: "Teaching Days",
      kicker: "Small Groups",
      image: "/art/exp-workshops.jpg?v=1",
      text: "Short classes on colour, petals and the patience of looking.",
    },
    {
      num: "03",
      title: "Sketch Archive",
      kicker: "Studies Kept",
      image: "/art/exp-exhibitions.jpg?v=1",
      text: "Drawings from museums, gardens and the hours between exhibitions.",
    },
  ],
];

export const experiences: Experience[] = [
  {
    place: "Atelier Lumen",
    role: "Resident painter",
    text: "A season in a shared studio, ending with an open weekend of new portraits.",
  },
  {
    place: "Gallery Nord",
    role: "Solo exhibition",
    text: "Twenty-four canvases over three weeks, plus a live painting evening.",
  },
  {
    place: "Studio Kolor",
    role: "Commissioned work",
    text: "Murals and private paintings for homes, small hotels and quiet rooms.",
  },
];

export const landscape = {
  text: "Weather, fields and the edge of the city. Started outside and finished when the light was gone.",
  image: piece(
    "north-of-the-city",
    "photo-1578301978018-3005759f48f7",
    "North of the City",
    "Oil on canvas",
    "2024",
    "#c8b898",
    "#6a8090",
    1800,
  ),
};

export const stats: Stat[] = [
  { value: "120+", label: "Works" },
  { value: "25", label: "Exhibitions" },
  { value: "10+", label: "Years" },
  { value: "80+", label: "Collectors" },
];

export const about = {
  text: "I paint between the figure and the field. The work is slow and physical: paint put down, scraped back, and built again until the picture feels honest.",
  image: piece(
    "in-the-studio",
    "photo-1513364776144-60967b0f800f",
    "In the Studio",
    "Studio",
    "2026",
    "#f2efe8",
    "#e07030",
    1200,
  ),
};

function localPiece(id: string, file: string, title: string): Piece {
  return {
    id,
    src: `/art/${file}?v=6`,
    alt: title,
    title,
    medium: "Oil on canvas",
    year: "2024",
    tone: "#140e0c",
  };
}

export type Work = Piece & { span: number; album?: Piece[] };

function albumPiece(prefix: string, file: string, title: string, n: number): Piece {
  return {
    id: `${prefix}-${n}`,
    src: `/art/${file}?v=1`,
    alt: `${title}, ${n}`,
    title,
    medium: "",
    year: "",
    tone: "#140e0c",
  };
}

export const compositions: Piece[] = [
  "comp-01.jpg",
  "comp-02.jpg",
  "comp-03.jpg",
  "comp-04.jpg",
  "comp-05.jpg",
  "comp-06.jpg",
  "comp-07.jpg",
  "comp-08.jpg",
  "comp-09.jpg",
].map((file, index) => albumPiece("comp", file, "Мои композиции", index + 1));

export const impasto: Piece[] = [
  "impasto-01.jpg",
  "impasto-02.jpg",
  "impasto-03.jpg",
  "impasto-04.jpg",
].map((file, index) => albumPiece("impasto", file, "Копирование картины со смелыми мазками", index + 1));

export const classical: Piece[] = [
  "classical-01.jpg",
  "classical-02.jpg",
  "classical-03.jpg",
  "classical-04.jpg",
  "classical-05.jpg",
  "classical-06.jpg",
  "classical-07.jpg",
  "classical-08.jpg",
  "classical-09.jpg",
  "classical-10.jpg",
].map((file, index) => albumPiece("classical", file, "Копирование классических работ великих художников", index + 1));

export const sketches: Piece[] = ["sketch-01.jpg", "sketch-02.jpg", "sketch-03.jpg"].map((file, index) =>
  albumPiece("sketch", file, "Маленькие эскизы", index + 1),
);

export const museum: Piece[] = ["museum-01.jpg", "museum-02.jpg", "museum-03.jpg", "museum-04.jpg"].map((file, index) =>
  albumPiece("museum", file, "Работы из музейной практики", index + 1),
);

export const large: Piece[] = Array.from({ length: 31 }, (_, index) => {
  const n = String(index + 1).padStart(2, "0");
  return albumPiece("large", `large-${n}.jpg`, "Крупномасштабная работа", index + 1);
});

export const cool: Piece[] = Array.from({ length: 10 }, (_, index) => {
  const n = String(index + 1).padStart(2, "0");
  return albumPiece("cool", `cool-${n}.jpg`, "Классные работы", index + 1);
});

export const national: Piece[] = Array.from({ length: 13 }, (_, index) => {
  const n = String(index + 1).padStart(2, "0");
  return albumPiece("nat", `nat-${n}.jpg`, "Национальный натюрморт", index + 1);
});

export const drawings: Piece[] = Array.from({ length: 4 }, (_, index) => {
  const n = String(index + 1).padStart(2, "0");
  return albumPiece("draw", `draw-${n}.jpg`, "Мои рисунки", index + 1);
});

function work(file: string, title: string, span: number, album?: Piece[]): Work {
  const id = file.replace(".jpg", "");
  return { ...localPiece(id, file, title), src: `/art/${file}?v=8`, span, album };
}

export const workPages: Work[][] = [
  [
    work("work-compositions.jpg", "Мои композиции", 4, compositions),
    work("work-impasto.jpg", "Копирование картины со смелыми мазками", 2, impasto),
    work("work-classical.jpg", "Копирование классических работ великих художников", 2, classical),
    work("work-sketch.jpg", "Маленькие эскизы", 2, sketches),
    work("work-museum.jpg", "Работы из музейной практики", 2, museum),
    work("work-mountains.jpg", "Крупномасштабная работа — горы", 2),
    work("work-bouquet.jpg", "Классные работы", 2, cool),
    work("work-peony.jpg", "Крупномасштабная работа", 2, large),
    work("work-drawing.jpg", "Мои рисунки", 2, drawings),
    work("work-still-life.jpg", "Национальный натюрморт", 4, national),
  ],
  [
    work("still-life.jpg", "Цветочный натюрморт", 4),
    work("dark-bouquet.jpg", "Вечерний букет", 2),
    work("white-peony.jpg", "Белый пион", 2),
    work("pink-rose.jpg", "Розовая роза", 2),
    work("cover-places.jpg", "Другие миры", 2),
    work("cover-projects.jpg", "Смелые мазки", 2),
    work("cover-sound.jpg", "Звуковые смеси", 2),
    work("cover-patterns.jpg", "Узоры и цвет", 2),
    work("cover-film.jpg", "Плёночный свет", 2),
    work("work-museum.jpg", "Музейная практика", 4),
  ],
];

export const covers: Piece[] = [
  "cf-film.jpg|Chasing that film look in the past",
  "cf-projects.jpg|Selected projects from the last month",
  "cf-places.jpg|Otherworldly places located on Earth",
  "cf-sound.jpg|Visualizing distorted sound mixes",
  "cf-patterns.jpg|Patterns and color inspiration",
].map((row) => {
  const [file, title] = row.split("|");
  const id = file.replace(".jpg", "");
  return { ...localPiece(id, file, title), src: `/art/${file}?v=1` };
});

export const slides: Piece[] = [
  "hero-01.jpg|Woman Reading",
  "hero-02.jpg|Mountain",
  "hero-03.jpg|Studio",
  "hero-04.jpg|Flowers",
].map((row) => {
  const [file, title] = row.split("|");
  const id = file.replace(".jpg", "");
  return { ...localPiece(id, file, title), src: `/art/${file}?v=1` };
});

const seen = new Set<string>();
export const gallery: Piece[] = [
  ...oils.items,
  ...portraits.items,
  landscape.image,
  ...selected,
  abstracts.items[3],
  abstracts.items[4],
].filter((item) => {
  if (seen.has(item.id)) return false;
  seen.add(item.id);
  return true;
});
