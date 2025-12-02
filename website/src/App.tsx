import { Code, Bot, Rocket, Layers, Github, Mail, MessageCircle } from "lucide-react"

const cardData = [
  {
    id: "1",
    title: "AI Systems Engineer",
    description: "Building scalable infrastructure for generative AI. Python, Docker, AsyncIO & Cloud-native solutions.",
    icon: <Code className="h-5 w-5" />,
  },
  {
    id: "2",
    title: "LLM Orchestration",
    description: "Designing agentic workflows. RAG pipelines, context management & multi-model integration.",
    icon: <Bot className="h-5 w-5" />,
  },
  {
    id: "3",
    title: "Founder @ ReelsGen",
    description: "Automated video generation platform. FFmpeg + LLM pipelines powering content automation at scale.",
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    id: "4",
    title: "Background",
    description: "MSTU Bauman (CS). Deep tech focus: System Architecture, High-load Data Processing & Algorithms.",
    icon: <Layers className="h-5 w-5" />,
  },
]

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-mono">
            Daniil Makeev | AI Systems Engineer
            <span className="cursor-blink">_</span>
          </h1>
        </div>
      </header>

      {/* Main Content - List */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl">
          <ul className="space-y-1">
            {cardData.map((card) => (
              <li
                key={card.id}
                className="group flex items-start gap-4 p-4 rounded-lg border border-transparent hover:border-primary/30 hover:bg-secondary/5 transition-all duration-200"
              >
                <div className="flex-shrink-0 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors">
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-lg mb-1">{card.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-sm">
            <span className="text-muted-foreground">&gt; Connect:</span>{" "}
            <a
              href="https://github.com/wyddy7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 ml-2"
            >
              <Github className="h-4 w-4" />
              <span>[GitHub]</span>
            </a>
            <a
              href="https://t.me/wyddy7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 ml-4"
            >
              <MessageCircle className="h-4 w-4" />
              <span>[Telegram]</span>
            </a>
            <a
              href="mailto:your-email@example.com"
              className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 ml-4"
            >
              <Mail className="h-4 w-4" />
              <span>[Email]</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
