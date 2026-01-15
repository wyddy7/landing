export const translations = {
  en: {
    name: "Daniil Makeev",
    tagline: "AI Engineer & Systems Builder",
    connect: "Connect:",
    textMe: "Text Me",
    pingMe: "Ping me_",
    cards: [
      {
        id: "1",
        title: "Core Focus",
        description: "Engineering autonomous AI agents and scalable content pipelines. Focused on shipping production-ready systems that solve business problems fast.",
      },
      {
        id: "2",
        title: "Background",
        description: "BMSTU (Bauman). Founder mindset: deliver impact, not overhead.",
      },
      {
        id: "3",
        title: "AI Video Automation Platform (Founder & Lead)",
        description: "Architected and deployed a fully autonomous video generation system processing 500+ videos daily. Stack: Python, FFmpeg, OpenAI API, Supabase. Impact: Zero manual oversight required. 100% automated workflow.",
      },
      {
        id: "4",
        title: "Network AI Agent",
        description: "Designed and shipped a monetized personal CRM bot in 48h. Tech: RAG (Vector Search), AsyncIO, Telegram Payments. Impact: Autonomous user onboarding and real-time context recall.",
      },
      {
        id: "5",
        title: "Technical Arsenal",
        description: "AI Engineering: Agentic Workflows, RAG Pipelines, LLM Integration (OpenAI/Claude). Backend Engineering: Python (AsyncIO), FastAPI, Docker, Supabase (PostgreSQL). Data Systems: Resilient Scraping Infrastructure (99.9% uptime), Video Processing (FFmpeg).",
      },
    ],
    techStack: [
      "Agentic Workflows",
      "RAG Pipelines",
      "LLM Integration (OpenAI/Claude)",
      "Python (AsyncIO)",
      "FastAPI",
      "Docker",
      "Supabase",
      "PostgreSQL",
      "Resilient Scraping Infrastructure (99.9% uptime)",
      "Video Processing (FFmpeg)",
      "Vector Search",
      "Telegram Payments",
    ],
  },
  ru: {
    name: "Даниил Макеев",
    tagline: "AI Инженер и Системный Архитектор",
    connect: "Связь:",
    textMe: "Написать мне",
    pingMe: "Пинг_",
    cards: [
      {
        id: "1",
        title: "Основной фокус",
        description: "Проектирование автономных ИИ-агентов и масштабируемых пайплайнов. Специализируюсь на создании готовых к продакшену систем, которые быстро решают задачи бизнеса.",
      },
      {
        id: "2",
        title: "Background",
        description: "МГТУ им. Н.Э. Баумана. Мышление фаундера: нацеленность на результат, а не на процессы.",
      },
      {
        id: "3",
        title: "Платформа автоматизации видео (Head & Lead)",
        description: "Спроектировал и запустил полностью автономную систему генерации видео, обрабатывающую более 500 роликов ежедневно. Стек: Python, FFmpeg, OpenAI API, Supabase. Результат: 0 минут ручного контроля. 100% автоматизированный воркфлоу.",
      },
      {
        id: "4",
        title: "Нетворк ИИ-агент",
        description: "Разработал и запустил монетизируемого бота-CRM за 48 часов. Технологии: RAG (векторный поиск), AsyncIO, Telegram Payments. Результат: автономный онбординг пользователей и работа с контекстом в реальном времени.",
      },
      {
        id: "5",
        title: "Технический арсенал",
        description: "AI Engineering: Агентские воркфлоу, RAG пайплайны, интеграция LLM (OpenAI/Claude). Backend Engineering: Python (AsyncIO), FastAPI, Docker, Supabase (PostgreSQL). Системы данных: отказоустойчивая инфраструктура для скрапинга (аптайм 99.9%), обработка видео (FFmpeg).",
      },
    ],
    techStack: [
      "Агентские воркфлоу",
      "RAG пайплайны",
      "Интеграция LLM (OpenAI/Claude)",
      "Python (AsyncIO)",
      "FastAPI",
      "Docker",
      "Supabase",
      "PostgreSQL",
      "Инфраструктура скрапинга (99.9% аптайм)",
      "Обработка видео (FFmpeg)",
      "Векторный поиск",
      "Telegram Payments",
    ],
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
