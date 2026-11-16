"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { covers, journeyPages, slides, workPages, type Piece } from "@/lib/data";

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.2 3.2h9.6v9.6M12.8 3.2 3.2 12.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Lightbox({
  pieces,
  index,
  onClose,
  onIndex,
  label,
  previous,
  next,
  close,
}: {
  pieces: Piece[] | null;
  index: number;
  onClose: () => void;
  onIndex: (next: number) => void;
  label: (title: string) => string;
  previous: string;
  next: string;
  close: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const indexRef = useRef(index);
  const drag = useRef<number | null>(null);
  indexRef.current = index;

  useEffect(() => {
    if (!pieces) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (pieces.length < 2) return;
      const current = indexRef.current;
      if (event.key === "ArrowRight") onIndex((current + 1) % pieces.length);
      if (event.key === "ArrowLeft") onIndex((current - 1 + pieces.length) % pieces.length);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [pieces, onClose, onIndex]);

  if (!pieces?.length) return null;

  const piece = pieces[Math.min(index, pieces.length - 1)];
  const many = pieces.length > 1;
  const step = (dir: number) => onIndex((index + dir + pieces.length) % pieces.length);

  return (
    <div className="lb" role="presentation" onClick={onClose}>
      <figure
        className="lb-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="lb-frame"
          onPointerDown={(event) => {
            drag.current = event.clientX;
          }}
          onPointerUp={(event) => {
            if (drag.current === null || !many) return;
            const dx = event.clientX - drag.current;
            drag.current = null;
            if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
          }}
        >
          <img key={piece.src} src={piece.src} alt={piece.alt} />
          {many && (
            <>
              <button type="button" className="lb-nav lb-prev" aria-label={previous} onClick={() => step(-1)}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10 3.5 5.5 8 10 12.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" className="lb-nav lb-next" aria-label={next} onClick={() => step(1)}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </div>
        <figcaption>
          <strong id={titleId}>{label(piece.title)}</strong>
          {many ? (
            <span className="lb-count">
              {String(index + 1).padStart(2, "0")}
              <span> / </span>
              {String(pieces.length).padStart(2, "0")}
            </span>
          ) : (
            (piece.medium || piece.year) && (
              <span>
                {piece.medium}
                {piece.medium && piece.year ? " · " : ""}
                {piece.year}
              </span>
            )
          )}
        </figcaption>
        <button ref={closeRef} type="button" className="lb-x" onClick={onClose} aria-label={close}>
          ×
        </button>
      </figure>
    </div>
  );
}

const NAV = ["top", "about", "gallery", "experience", "contact"] as const;

const LANGS = [
  { id: "ru", label: "Русский" },
  { id: "en", label: "English" },
  { id: "de", label: "Deutsch" },
] as const;

type Lang = (typeof LANGS)[number]["id"];

const COPY = {
  en: {
    nav: ["Home", "About", "Gallery", "Experience", "Contact"],
    heroKicker: "ART · EMOTION · INSPIRATION",
    hero1: "Discover",
    hero2: "the Beauty",
    hero3: "in",
    hero4: "Every Detail",
    heroLead: "Step into the world of art, where timeless beauty comes to life.",
    aboutKicker: "About me",
    about1: "Hello, I'm",
    about2: "Jennet K.",
    aboutText:
      "I'm a contemporary artist, inspired by the timeless beauty of nature, emotions, and the delicate balance between light and shadow. My work is a dialogue between classical traditions and modern sensibility, where every detail tells a story.",
    stats: ["Years of Experience", "Artworks Created", "Exhibitions"],
    scroll: "Scroll to explore",
    cover1: "Selected and popular",
    cover2: "posts on the social",
    cover3: "right now",
    worksKicker: "Gallery",
    works1: "My",
    works2: "Gallery",
    worksLead: "A collection of my works, where nature, emotion and classical traditions come together.",
    allWorks: "View All Works",
    journeyKicker: "My Journey",
    journeyTitle: "Experiences",
    journeyLead: "A journey through art, exhibitions and creative exploration.",
    touch: "Get in Touch",
    contact1: "Let's Create",
    contact2: "Something Beautiful",
    contact3: "Together",
    contactLead: "Have a question, collaboration idea, or simply want to learn more about my art? I'd love to hear from you.",
    email: "Email",
    studio: "Studio",
    instagram: "Instagram",
    sendTitle: "Send a Message",
    name: "Your Name *",
    mail: "Your Email *",
    subject: "Subject",
    message: "Your Message *",
    send: "Send Message",
    sent: "Message sent",
    follow: "Follow Me",
    top: "Back to Top",
    skip: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    previous: "Previous",
    next: "Next",
    close: "Close",
    sections: "Sections",
    language: "Language",
    slides: "Slides",
    selected: "Selected paintings",
    galleryLabel: "My Gallery",
    prevExp: "Previous experiences",
    nextExp: "Next experiences",
  },
  ru: {
    nav: ["Главная", "Обо мне", "Галерея", "Опыт", "Контакты"],
    heroKicker: "ИСКУССТВО · ЭМОЦИЯ · ВДОХНОВЕНИЕ",
    hero1: "Откройте",
    hero2: "красоту",
    hero3: "в",
    hero4: "каждой детали",
    heroLead: "Войдите в мир искусства, где вневременная красота оживает.",
    aboutKicker: "Обо мне",
    about1: "Здравствуйте, я",
    about2: "Jennet K.",
    aboutText:
      "Я современная художница. Меня вдохновляет вечная красота природы, чувства и тонкая грань света и тени. Моя работа — диалог классической традиции и современной чувствительности, где каждая деталь рассказывает историю.",
    stats: ["Лет опыта", "Созданных работ", "Выставок"],
    scroll: "Листайте дальше",
    cover1: "Избранные и популярные",
    cover2: "посты в соцсетях",
    cover3: "прямо сейчас",
    worksKicker: "Галерея",
    works1: "Моя",
    works2: "галерея",
    worksLead: "Коллекция моих работ, где природа, чувство и классическая традиция встречаются.",
    allWorks: "Все работы",
    journeyKicker: "Мой путь",
    journeyTitle: "Опыт",
    journeyLead: "Путь через искусство, выставки и творческий поиск.",
    touch: "Напишите мне",
    contact1: "Давайте создадим",
    contact2: "что-то прекрасное",
    contact3: "вместе",
    contactLead: "Есть вопрос, идея для совместной работы или просто хотите узнать больше о моём искусстве? Буду рада письму.",
    email: "Почта",
    studio: "Студия",
    instagram: "Инстаграм",
    sendTitle: "Написать",
    name: "Ваше имя *",
    mail: "Ваша почта *",
    subject: "Тема",
    message: "Ваше сообщение *",
    send: "Отправить",
    sent: "Отправлено",
    follow: "Подписаться",
    top: "Наверх",
    skip: "К содержанию",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    previous: "Назад",
    next: "Дальше",
    close: "Закрыть",
    sections: "Разделы",
    language: "Язык",
    slides: "Слайды",
    selected: "Избранные картины",
    galleryLabel: "Моя галерея",
    prevExp: "Предыдущий опыт",
    nextExp: "Следующий опыт",
  },
  de: {
    nav: ["Start", "Über mich", "Galerie", "Erfahrung", "Kontakt"],
    heroKicker: "KUNST · EMOTION · INSPIRATION",
    hero1: "Entdecke",
    hero2: "die Schönheit",
    hero3: "in",
    hero4: "jedem Detail",
    heroLead: "Tritt ein in die Welt der Kunst, in der zeitlose Schönheit lebendig wird.",
    aboutKicker: "Über mich",
    about1: "Hallo, ich bin",
    about2: "Jennet K.",
    aboutText:
      "Ich bin eine zeitgenössische Künstlerin, inspiriert von der zeitlosen Schönheit der Natur, von Gefühlen und dem feinen Gleichgewicht zwischen Licht und Schatten. Meine Arbeit ist ein Dialog zwischen klassischer Tradition und moderner Sensibilität.",
    stats: ["Jahre Erfahrung", "Werke entstanden", "Ausstellungen"],
    scroll: "Weiter scrollen",
    cover1: "Ausgewählte und beliebte",
    cover2: "Beiträge in den sozialen",
    cover3: "Medien gerade jetzt",
    worksKicker: "Galerie",
    works1: "Meine",
    works2: "Galerie",
    worksLead: "Eine Sammlung meiner Werke, in der Natur, Gefühl und klassische Tradition zusammenkommen.",
    allWorks: "Alle Werke",
    journeyKicker: "Mein Weg",
    journeyTitle: "Erfahrungen",
    journeyLead: "Ein Weg durch Kunst, Ausstellungen und kreatives Suchen.",
    touch: "Kontakt",
    contact1: "Lass uns",
    contact2: "etwas Schönes",
    contact3: "erschaffen",
    contactLead: "Eine Frage, eine Idee zur Zusammenarbeit oder einfach mehr über meine Kunst? Ich freue mich über eine Nachricht.",
    email: "E-Mail",
    studio: "Atelier",
    instagram: "Instagram",
    sendTitle: "Nachricht senden",
    name: "Ihr Name *",
    mail: "Ihre E-Mail *",
    subject: "Betreff",
    message: "Ihre Nachricht *",
    send: "Senden",
    sent: "Gesendet",
    follow: "Folgen",
    top: "Nach oben",
    skip: "Zum Inhalt",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    previous: "Zurück",
    next: "Weiter",
    close: "Schließen",
    sections: "Bereiche",
    language: "Sprache",
    slides: "Folien",
    selected: "Ausgewählte Bilder",
    galleryLabel: "Meine Galerie",
    prevExp: "Vorherige Erfahrungen",
    nextExp: "Nächste Erfahrungen",
  },
} as const;

const CARD: Record<Lang, Record<string, string>> = {
  en: {
    "Мои композиции": "My Compositions",
    "Копирование картины со смелыми мазками": "Copying a Painting with Bold Strokes",
    "Копирование классических работ великих художников": "Copying Classical Works of Great Artists",
    "Маленькие эскизы": "Small Sketches",
    "Работы из музейной практики": "Works from Museum Practice",
    "Крупномасштабная работа — горы": "Large-scale Work — Mountains",
    "Классные работы": "Studio Works",
    "Крупномасштабная работа": "Large-scale Work",
    "Мои рисунки": "My Drawings",
    "Национальный натюрморт": "National Still Life",
    "Цветочный натюрморт": "Floral Still Life",
    "Вечерний букет": "Evening Bouquet",
    "Белый пион": "White Peony",
    "Розовая роза": "Pink Rose",
    "Другие миры": "Other Worlds",
    "Смелые мазки": "Bold Strokes",
    "Звуковые смеси": "Sound Mixes",
    "Узоры и цвет": "Patterns and Color",
    "Плёночный свет": "Film Light",
    "Музейная практика": "Museum Practice",
    "Woman Reading": "Woman Reading",
    Mountain: "Mountain",
    Studio: "Studio",
    Flowers: "Flowers",
  },
  ru: {
    "Chasing that film look in the past": "В погоне за плёночным светом",
    "Selected projects from the last month": "Избранные проекты прошлого месяца",
    "Otherworldly places located on Earth": "Иные миры здесь, на Земле",
    "Visualizing distorted sound mixes": "Визуализация искажённых звуков",
    "Patterns and color inspiration": "Узоры и цвет как вдохновение",
    "Woman Reading": "Женщина за книгой",
    Mountain: "Горы",
    Studio: "Мастерская",
    Flowers: "Цветы",
  },
  de: {
    "Мои композиции": "Meine Kompositionen",
    "Копирование картины со смелыми мазками": "Kopie eines Bildes mit kühnen Strichen",
    "Копирование классических работ великих художников": "Kopien klassischer Werke großer Künstler",
    "Маленькие эскизы": "Kleine Skizzen",
    "Работы из музейной практики": "Arbeiten aus der Museumspraxis",
    "Крупномасштабная работа — горы": "Großformatige Arbeit — Berge",
    "Классные работы": "Atelierarbeiten",
    "Крупномасштабная работа": "Großformatige Arbeit",
    "Мои рисунки": "Meine Zeichnungen",
    "Национальный натюрморт": "Nationales Stillleben",
    "Цветочный натюрморт": "Blumenstillleben",
    "Вечерний букет": "Abendstrauß",
    "Белый пион": "Weiße Pfingstrose",
    "Розовая роза": "Rosa Rose",
    "Другие миры": "Andere Welten",
    "Смелые мазки": "Kühne Striche",
    "Звуковые смеси": "Klangmischungen",
    "Узоры и цвет": "Muster und Farbe",
    "Плёночный свет": "Filmisches Licht",
    "Музейная практика": "Museumspraxis",
    "Chasing that film look in the past": "Dem filmischen Licht auf der Spur",
    "Selected projects from the last month": "Ausgewählte Projekte des letzten Monats",
    "Otherworldly places located on Earth": "Andersweltliche Orte auf der Erde",
    "Visualizing distorted sound mixes": "Verzerrte Klänge sichtbar gemacht",
    "Patterns and color inspiration": "Muster und Farbe als Inspiration",
    "Woman Reading": "Lesende Frau",
    Mountain: "Berge",
    Studio: "Atelier",
    Flowers: "Blumen",
  },
};

const JOURNEY: Record<Exclude<Lang, "en">, { title: string; kicker: string; text: string }[][]> = {
  ru: [
    [
      { title: "Мастерские", kicker: "Учить и делиться", text: "Провожу мастерские, чтобы вдохновлять и делиться красотой живописи." },
      { title: "Выставки", kicker: "Искусство в мире", text: "Участие в выставках, где работы видит более широкая публика." },
      { title: "Исследование", kicker: "Поиск и учёба", text: "Постоянное изучение художественных приёмов и классической традиции." },
    ],
    [
      { title: "Резиденция", kicker: "Общая мастерская", text: "Сезон в общей студии, который заканчивается открытым уикендом новых портретов." },
      { title: "Персональная выставка", kicker: "Gallery Nord", text: "Двадцать четыре холста за три недели и вечер живой живописи." },
      { title: "Заказы", kicker: "Частные комнаты", text: "Росписи и картины для домов, небольших отелей и тихих комнат." },
    ],
    [
      { title: "Открытые студии", kicker: "Встретить работу", text: "Выходные, когда новые картины показывают в комнате, где они были написаны." },
      { title: "Дни обучения", kicker: "Малые группы", text: "Короткие занятия о цвете, лепестках и терпении смотреть." },
      { title: "Архив эскизов", kicker: "Сохранённые штудии", text: "Рисунки из музеев, садов и часов между выставками." },
    ],
  ],
  de: [
    [
      { title: "Werkstätten", kicker: "Lehren und teilen", text: "Ich gebe Werkstätten, um zu inspirieren und die Schönheit der Malerei zu teilen." },
      { title: "Ausstellungen", kicker: "Kunst in der Welt", text: "Teilnahme an Ausstellungen, in denen die Werke ein breiteres Publikum erreichen." },
      { title: "Forschung", kicker: "Suche und Studium", text: "Fortwährende Erkundung künstlerischer Techniken und klassischer Traditionen." },
    ],
    [
      { title: "Residenz", kicker: "Geteiltes Atelier", text: "Eine Saison im gemeinsamen Studio, abgeschlossen mit einem offenen Wochenende neuer Porträts." },
      { title: "Einzelausstellung", kicker: "Gallery Nord", text: "Vierundzwanzig Leinwände in drei Wochen und ein Abend mit Malerei vor Publikum." },
      { title: "Aufträge", kicker: "Private Räume", text: "Wandbilder und Gemälde für Wohnungen, kleine Hotels und stille Zimmer." },
    ],
    [
      { title: "Offene Ateliers", kicker: "Die Arbeit treffen", text: "Wochenenden, an denen neue Bilder in dem Raum gezeigt werden, in dem sie entstanden sind." },
      { title: "Unterrichtstage", kicker: "Kleine Gruppen", text: "Kurze Stunden über Farbe, Blütenblätter und die Geduld des Schauens." },
      { title: "Skizzenarchiv", kicker: "Bewahrte Studien", text: "Zeichnungen aus Museen, Gärten und den Stunden zwischen den Ausstellungen." },
    ],
  ],
};

function Mark() {
  return (
    <svg className="mark" viewBox="0 0 48 48" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.35">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <ellipse key={deg} cx="24" cy="11.4" rx="3.15" ry="8.7" transform={`rotate(${deg} 24 24)`} />
        ))}
      </g>
    </svg>
  );
}

function IconArrow() {
  return (
    <svg className="icon-arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function coverSlot(itemIndex: number, active: number, total: number) {
  let delta = itemIndex - active;
  const half = total / 2;
  if (delta > half) delta -= total;
  if (delta < -half) delta += total;
  if (delta < -2 || delta > 2) return "far";
  return String(delta);
}

export function PortfolioBoard() {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState<Piece[] | null>(null);
  const [slide, setSlide] = useState(0);
  const [section, setSection] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [langOpen, setLangOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [journeyPage, setJourneyPage] = useState(0);
  const [sent, setSent] = useState(false);
  const opener = useRef<HTMLButtonElement | null>(null);
  const scrollLock = useRef<string | null>(null);
  const swipe = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const langBox = useRef<HTMLDivElement | null>(null);
  const galleryHover = useRef(false);
  const galleryHold = useRef(false);
  galleryHold.current = active !== null;
  const t = COPY[lang];
  const text = (title: string) => CARD[lang][title] ?? title;
  const count = slides.length;

  const scrollToSection = useCallback((id: string) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduce ? "auto" : "smooth";
    scrollLock.current = id;
    setSection(id);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
    }
    window.history.pushState(null, "", `#${id}`);
    window.setTimeout(() => {
      if (scrollLock.current === id) scrollLock.current = null;
    }, 900);
  }, []);

  const jump = useCallback(
    (id: string) => {
      setMenuOpen(false);
      setLangOpen(false);
      scrollToSection(id);
    },
    [scrollToSection],
  );

  useEffect(() => {
    if (!menuOpen && !langOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setLangOpen(false);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!langBox.current?.contains(event.target as Node)) setLangOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen, langOpen]);

  useEffect(() => {
    const windowWithTimer = window as Window & { __jennetHero?: number };
    if (windowWithTimer.__jennetHero) window.clearInterval(windowWithTimer.__jennetHero);
    windowWithTimer.__jennetHero = window.setInterval(() => {
      if (document.hidden) return;
      setIndex((current) => (current + 1) % slides.length);
    }, 3000);
    return () => {
      if (windowWithTimer.__jennetHero) window.clearInterval(windowWithTimer.__jennetHero);
      windowWithTimer.__jennetHero = undefined;
    };
  }, []);

  useEffect(() => {
    const windowWithTimer = window as Window & { __jennetGallery?: number };
    if (windowWithTimer.__jennetGallery) window.clearInterval(windowWithTimer.__jennetGallery);
    windowWithTimer.__jennetGallery = window.setInterval(() => {
      if (galleryHover.current || galleryHold.current || document.hidden) return;
      setGalleryIndex((current) => (current + 1) % covers.length);
    }, 4200);
    return () => {
      if (windowWithTimer.__jennetGallery) window.clearInterval(windowWithTimer.__jennetGallery);
      windowWithTimer.__jennetGallery = undefined;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback(
    (next: number) => {
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const nodes = NAV
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLock.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const open = useCallback((piece: Piece & { album?: Piece[] }, el: HTMLButtonElement) => {
    opener.current = el;
    setSlide(0);
    setActive(piece.album?.length ? piece.album : [piece]);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    opener.current?.focus();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="site">
      <a
        className="skip"
        href="#top"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection("top");
        }}
      >
        {t.skip}
      </a>
      {menuOpen && (
        <button type="button" className="nav-backdrop" aria-label={t.closeMenu} onClick={() => setMenuOpen(false)} />
      )}
      <div className={`nav-shell ${solid ? "is-light" : ""}`}>
        <header className={`nav ${menuOpen ? "is-open" : ""}`}>
          <a
            className="brand"
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              jump("top");
            }}
          >
            <Mark />
            <span className="brand-name">
              <span className="brand-word">JENNET.KART</span>
              <span className="brand-sub">GALLERY</span>
            </span>
          </a>
          <nav id="site-menu" className="nav-links" aria-label={t.sections}>
            {NAV.map((id, navIndex) => (
              <a
                key={id}
                href={`#${id}`}
                className={section === id ? "is-on" : ""}
                onClick={(event) => {
                  event.preventDefault();
                  jump(id);
                }}
              >
                {t.nav[navIndex]}
              </a>
            ))}
          </nav>
          <div className="nav-tools">
            <div className={`lang ${langOpen ? "is-open" : ""}`} ref={langBox}>
              <button
                type="button"
                className="lang-btn"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((open) => !open)}
              >
                {LANGS.find((item) => item.id === lang)?.label}
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3.5 6.2 8 10.2l4.5-4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {langOpen && (
                <ul className="lang-menu" role="listbox" aria-label={t.language}>
                  {LANGS.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={lang === item.id}
                        className={lang === item.id ? "is-on" : ""}
                        onClick={() => {
                          setLang(item.id);
                          setLangOpen(false);
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="button"
              className="burger"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
              onClick={() => {
                setLangOpen(false);
                setMenuOpen((open) => !open);
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>
      </div>

      <main>
        <section
          className="hero"
          id="top"
          aria-roledescription="carousel"
          aria-label={t.selected}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") go(index + 1);
            if (event.key === "ArrowLeft") go(index - 1);
          }}
        >
          {slides.map((item, itemIndex) => (
            <div key={item.id} className={`slide ${itemIndex === index ? "is-on" : ""}`} aria-hidden={itemIndex !== index}>
              <img src={item.src} alt="" style={{ background: item.tone }} />
              <div className="slide-shade" />
            </div>
          ))}

          <div className="hero-copy">
            <p className="eyebrow">{t.heroKicker}</p>
            <h1>
              {t.hero1}
              <br />
              {t.hero2}
              <br />
              <em>{t.hero3}</em> {t.hero4}
            </h1>
            <p className="hero-lead">{t.heroLead}</p>
          </div>

          <div className="hero-dock">
            <div className="thumbs" role="tablist" aria-label={t.slides}>
              {slides.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  className={itemIndex === index ? "is-on" : ""}
                  aria-selected={itemIndex === index}
                  aria-label={text(item.title)}
                  onClick={() => go(itemIndex)}
                >
                  <img src={item.src} alt="" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="band about" id="about">
          <div className="about-stage">
            <figure className="about-arch">
              <img src="/art/about-jennet.jpg" alt="Jennet K." />
            </figure>
            <div className="about-copy">
              <p className="about-kicker">
                {t.aboutKicker}
                <i />
              </p>
              <h2>
                {t.about1}
                <br />
                <em>{t.about2}</em>
              </h2>
              <p>{t.aboutText}</p>
              <p className="about-sign">Jennet K.</p>
              <dl className="about-stats">
                <div>
                  <dt>8+</dt>
                  <dd>{t.stats[0]}</dd>
                </div>
                <div>
                  <dt>50+</dt>
                  <dd>{t.stats[1]}</dd>
                </div>
                <div>
                  <dt>20+</dt>
                  <dd>{t.stats[2]}</dd>
                </div>
              </dl>
            </div>
            <img className="about-blooms" src="/art/about-blooms.jpg" alt="" />
          </div>
          <button type="button" className="about-scroll" onClick={() => jump("gallery")}>
            <span className="scroll-orb" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M3.5 6.2 8 10.2l4.5-4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {t.scroll}
          </button>
        </section>

        <section className="band gallery" id="gallery">
          <div className="cover">
            <div className="cover-copy">
              <h2>
                {t.cover1}
                <br />
                {t.cover2}
                <br />
                {t.cover3}
              </h2>
            </div>
            <div
              className="cover-stage"
              aria-label={t.worksKicker}
              onMouseEnter={() => {
                galleryHover.current = true;
              }}
              onMouseLeave={() => {
                galleryHover.current = false;
              }}
              onTouchStart={(event) => {
                const touch = event.changedTouches[0];
                swipe.current = { x: touch.clientX, y: touch.clientY, moved: false };
              }}
              onTouchEnd={(event) => {
                const start = swipe.current;
                if (!start) return;
                const touch = event.changedTouches[0];
                const dx = touch.clientX - start.x;
                const dy = touch.clientY - start.y;
                if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
                start.moved = true;
                setGalleryIndex((current) => (current + (dx < 0 ? 1 : -1) + covers.length) % covers.length);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") setGalleryIndex((current) => (current + 1) % covers.length);
                if (event.key === "ArrowLeft") setGalleryIndex((current) => (current - 1 + covers.length) % covers.length);
              }}
            >
              {covers.map((item, itemIndex) => {
                const slot = coverSlot(itemIndex, galleryIndex, covers.length);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className="cover-card"
                    data-pos={slot}
                    style={{ background: item.tone }}
                    aria-hidden={slot === "far"}
                    tabIndex={slot === "far" ? -1 : 0}
                    aria-label={text(item.title)}
                    onClick={(event) => {
                      if (swipe.current?.moved) {
                        swipe.current.moved = false;
                        return;
                      }
                      if (slot === "0") open(item, event.currentTarget);
                      else if (slot !== "far") setGalleryIndex(itemIndex);
                    }}
                  >
                    <img src={item.src} alt="" />
                    <span>{text(item.title)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="works" aria-label={t.galleryLabel}>
          <div className="works-wrap">
            <header className="works-head">
              <div>
                <p className="works-kicker">
                  {t.worksKicker}
                  <i />
                </p>
                <h2>
                  <em>{t.works1}</em> {t.works2}
                </h2>
              </div>
              <p className="works-lead">{t.worksLead}</p>
            </header>
            <div className="bento">
              {(showAll ? workPages.flat() : workPages[0]).map((item) => (
                <button
                  key={`${item.id}-${item.title}`}
                  type="button"
                  className="work-card"
                  data-span={item.span}
                  onClick={(event) => open(item, event.currentTarget)}
                >
                  <img src={item.src} alt="" />
                  <span>{text(item.title)}</span>
                  <i className="work-go" aria-hidden="true">
                    <IconArrow />
                  </i>
                </button>
              ))}
            </div>
            <div className="works-foot">
              <button type="button" className="works-all" onClick={() => setShowAll((open) => !open)}>
                {t.allWorks} <IconArrow />
              </button>
            </div>
          </div>
        </section>

        <section className="band experience" id="experience">
          <img className="journey-bloom" src="/art/exp-bloom.jpg?v=1" alt="" />
          <div className="journey-wrap">
            <header className="journey-head">
              <div>
                <p className="journey-kicker">
                  {t.journeyKicker}
                  <i />
                </p>
                <h2>{t.journeyTitle}</h2>
              </div>
              <p className="journey-lead">{t.journeyLead}</p>
            </header>
            <ul className="journey-list">
              {journeyPages[journeyPage].map((item, itemIndex) => {
                const copy = lang === "en" ? item : JOURNEY[lang][journeyPage][itemIndex];
                return (
                <li key={`${journeyPage}-${item.num}`}>
                  <span className="journey-num">{item.num}</span>
                  <span className="journey-rule" aria-hidden="true" />
                  <div className="journey-title">
                    <strong>{copy.title}</strong>
                    <small>{copy.kicker}</small>
                  </div>
                  <img src={item.image} alt="" />
                  <div className="journey-copy">
                    <p>{copy.text}</p>
                  </div>
                </li>
                );
              })}
            </ul>
            <div className="journey-foot">
              <button type="button" className="about-scroll" onClick={() => jump("contact")}>
                <span className="scroll-orb" aria-hidden="true">
                  <svg viewBox="0 0 16 16">
                    <path d="M3.5 6.2 8 10.2l4.5-4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t.scroll}
              </button>
              <div className="journey-pager">
                <span>
                  {String(journeyPage + 1).padStart(2, "0")}
                  <span> / </span>
                  {String(journeyPages.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  aria-label={t.prevExp}
                  onClick={() => setJourneyPage((current) => (current - 1 + journeyPages.length) % journeyPages.length)}
                >
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M10 3.5 5.5 8 10 12.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label={t.nextExp}
                  onClick={() => setJourneyPage((current) => (current + 1) % journeyPages.length)}
                >
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="band contact" id="contact">
          <img className="contact-bloom contact-bloom-top" src="/art/contact-bloom-top.jpg?v=1" alt="" />
          <img className="contact-bloom contact-bloom-bottom" src="/art/contact-bloom-bottom.jpg?v=1" alt="" />
          <div className="contact-wrap">
            <div className="contact-intro">
              <p className="journey-kicker">
                {t.touch}
                <i />
              </p>
              <h2>
                {t.contact1}
                <br />
                {t.contact2}
                <br />
                <em>{t.contact3}</em>
              </h2>
              <p>{t.contactLead}</p>
              <p className="contact-sign">Jennet K.</p>
            </div>
            <ul className="contact-details">
              <li>
                <span className="contact-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <path d="m4 7.5 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <strong>{t.email}</strong>
                  <a href="mailto:jennet.k.art@gmail.com">jennet.k.art@gmail.com</a>
                </div>
              </li>
              <li>
                <span className="contact-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <div>
                  <strong>{t.studio}</strong>
                  <span>
                    123 Art Avenue,
                    <br />
                    New York, NY 10001
                  </span>
                </div>
              </li>
              <li>
                <span className="contact-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="16.7" cy="7.3" r="0.9" fill="currentColor" />
                  </svg>
                </span>
                <div>
                  <strong>{t.instagram}</strong>
                  <a href="https://instagram.com/jennet.k.art" target="_blank" rel="noreferrer">
                    @jennet.k.art
                  </a>
                </div>
              </li>
            </ul>
            <form
              className="contact-card"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <h3>{t.sendTitle}</h3>
              <div className="contact-fields">
                <input name="name" type="text" placeholder={t.name} aria-label={t.name} required />
                <input name="email" type="email" placeholder={t.mail} aria-label={t.mail} required />
                <input className="wide" name="subject" type="text" placeholder={t.subject} aria-label={t.subject} />
                <textarea className="wide" name="message" rows={4} placeholder={t.message} aria-label={t.message} required />
              </div>
              <button type="submit">
                {sent ? t.sent : t.send} {!sent && <IconArrow />}
              </button>
            </form>
          </div>
          <div className="contact-bar">
            <span>{t.follow}</span>
            <i />
            <a href="https://instagram.com/jennet.k.art" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="16.6" cy="7.4" r="0.8" fill="currentColor" />
              </svg>
            </a>
            <a href="https://pinterest.com/jennetk" target="_blank" rel="noreferrer" aria-label="Pinterest">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <path d="M10.2 17.5c.3-1.1.6-2.3.8-3.4.1-.4 0-.9-.3-1.2-.7-.8-.5-2.2.4-2.5 1.1-.4 2.2.6 2.2 1.8 0 .7-.3 1.6-.6 2.4.6.2 1.3.1 1.8-.3 1.1-.9 1.7-2.5 1.5-4-.3-2.2-2.3-3.6-4.6-3.2-2.6.4-4 2.6-3.6 4.8.2 1 .9 1.7 1.1 1.7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </a>
            <a href="https://youtube.com/@jennetk" target="_blank" rel="noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="6.5" width="18" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <path d="m11 9.5 4 2.5-4 2.5Z" fill="currentColor" />
              </svg>
            </a>
            <button type="button" onClick={() => jump("top")}>
              {t.top}
              <span aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="M3.5 9.8 8 5.8l4.5 4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </section>
      </main>
      <Lightbox
        pieces={active}
        index={slide}
        onClose={close}
        onIndex={setSlide}
        label={text}
        previous={t.previous}
        next={t.next}
        close={t.close}
      />
    </div>
  );
}
