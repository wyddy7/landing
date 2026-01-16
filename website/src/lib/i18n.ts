export const translations = {
  en: {
    name: "Daniil Makeev",
    tagline: "Python Backend Developer | AI/ML Integration",
    connect: "Connect:",
    textMe: "Text Me",
    pingMe: "Ping me_",
    cards: [
      {
        id: "1",
        title: "Core Focus",
        description: "Python backend development and AI integration. Building scalable data pipelines and business process automation.",
      },
      {
        id: "2",
        title: "Education",
        description: "BMSTU (4th year, CS & Engineering). Focused on delivering impact through technical excellence.",
      },
      {
        id: "3",
        title: "Video Generation Pipeline",
        description: "Python-based system using FFmpeg and OpenAI. AsyncIO for queueing, Supabase for metadata. Processing ~100 videos daily.",
      },
      {
        id: "4",
        title: "NetWho (AI CRM Network Assistant)",
        description: "Bot built on aiogram 3.x with RAG architecture. Implemented semantic contact search (Vector Search) and news parsing via Jina AI. Data validation with Pydantic v2.",
      },
      {
        id: "5",
        title: "Technical Arsenal",
        description: "Python (AsyncIO), FastAPI, Docker, Supabase, PostgreSQL. RAG, LLM Integration, FFmpeg.",
      },
    ],
    techStack: [
      "Python (AsyncIO)",
      "FastAPI",
      "LLM Integration (OpenAI/Claude)",
      "RAG Pipelines",
      "Docker",
      "Supabase",
      "PostgreSQL",
      "Video Processing (FFmpeg)",
      "Vector Search",
      "Telegram Payments API",
    ],
  },
  ru: {
    name: "Даниил Макеев",
    tagline: "Python Backend Developer | AI/ML Integration",
    connect: "Связь:",
    textMe: "Написать мне",
    pingMe: "Пинг_",
    cards: [
      {
        id: "1",
        title: "Основной фокус",
        description: "Python Backend разработка и интеграция AI-решений. Создание масштабируемых пайплайнов данных и автоматизация процессов.",
      },
      {
        id: "2",
        title: "Образование",
        description: "МГТУ им. Н.Э. Баумана (4 курс, факультет «Информатика и вычислительная техника»).",
      },
      {
        id: "3",
        title: "Video Generation Pipeline",
        description: "Система на Python с FFmpeg и OpenAI. Асинхронная очередь (AsyncIO) на Supabase. Обработка ~100 видео в день. Фокус: FFmpeg CLI.",
      },
      {
        id: "4",
        title: "NetWho (AI CRM Network Assistant)",
        description: "Бот на aiogram 3.x с RAG-архитектурой. Реализовал семантический поиск по контактам (Vector Search) и парсинг новостей через Jina AI. Валидация данных на Pydantic v2.",
      },
      {
        id: "5",
        title: "Технический арсенал",
        description: "Python (AsyncIO), FastAPI, Docker, Supabase, PostgreSQL. RAG, интеграция LLM, FFmpeg.",
      },
    ],
    techStack: [
      "Python (AsyncIO)",
      "FastAPI",
      "Интеграция LLM (OpenAI/Claude)",
      "RAG пайплайны",
      "Docker",
      "Supabase",
      "PostgreSQL",
      "Обработка видео (FFmpeg)",
      "Векторный поиск",
      "Telegram Payments API",
    ],
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
