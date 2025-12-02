import { Component } from "@/components/ui/morphing-card-stack"
import { Layers, Code, Bot, Rocket } from "lucide-react"

// Данные для карточек - можно заменить на ваши проекты/навыки
const cardData = [
  {
    id: "1",
    title: "AI Backend Engineer",
    description: "Python, TypeScript, Docker, GCP. Интеграция LLM моделей для автоматизации и AI-систем.",
    icon: <Code className="h-5 w-5" />,
  },
  {
    id: "2",
    title: "LLM Orchestration",
    description: "Интеграция и оркестрация языковых моделей для video generation, motion design и автоматизации.",
    icon: <Bot className="h-5 w-5" />,
  },
  {
    id: "3",
    title: "Стартап: reelsgen-autoposting",
    description: "AI-автопостинг видео в TikTok. FFmpeg + LLM для автоматизации контента.",
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    id: "4",
    title: "МГТУ Баумана",
    description: "Информатика. Курсовые по VHDL, databases, networking. Применение в продакшене.",
    icon: <Layers className="h-5 w-5" />,
  },
]

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Component cards={cardData} />
      </div>
    </div>
  )
}

export default App

