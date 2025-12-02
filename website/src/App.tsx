import { Code, Bot, Rocket, Layers, Github, Mail, MessageCircle } from "lucide-react"
import { useState, type ReactNode } from "react"

/**
 * Portfolio card data structure.
 * 
 * Represents a portfolio item with icon, title, and description.
 * Used to showcase key skills and projects in a structured format.
 */
interface PortfolioCard {
  /** Unique identifier for the card */
  id: string
  /** Card title/heading */
  title: string
  /** Detailed description of the skill/project */
  description: string
  /** React icon component for visual representation */
  icon: ReactNode
}

/**
 * Portfolio card data configuration.
 * 
 * Defines the main portfolio items displayed on the landing page.
 * Structured to highlight AI Systems Engineering, LLM Orchestration,
 * and Project Management expertise.
 */
const cardData: readonly PortfolioCard[] = [
  {
    id: "1",
    title: "AI Systems Engineer",
    description: "Building scalable infrastructure for generative AI. Python AsyncIO, high-performance data pipelines, fault-tolerant parsers & cloud-native solutions.",
    icon: <Code className="h-5 w-5" />,
  },
  {
    id: "2",
    title: "LLM Orchestration",
    description: "Designing agentic workflows. RAG pipelines, batch processing, context management & multi-model integration.",
    icon: <Bot className="h-5 w-5" />,
  },
  {
    id: "3",
    title: "Secret Project",
    description: "Stealth mode startup. AI-powered automation platform. Full-stack development, infrastructure & product design.",
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    id: "4",
    title: "Background",
    description: "BMSTU Bauman (CS). Deep tech focus: System Architecture, High-load Data Processing & Full-stack Tooling (React/TS).",
    icon: <Layers className="h-5 w-5" />,
  },
] as const

/**
 * Technology stack string displayed on hover.
 * 
 * Shows comprehensive tech stack when user hovers over "Background" card.
 * Demonstrates breadth of technical expertise.
 */
const techStack: string = "React · TypeScript · Docker · PostgreSQL · Redis · Click · BeautifulSoup · Pandas · OpenAI API · LangChain"

/**
 * Main application component.
 * 
 * Implements a minimalist portfolio landing page with:
 * - Semantic HTML structure for accessibility and SEO
 * - Interactive hover states for enhanced UX
 * - Responsive design with mobile-first approach
 * - Performance-optimized rendering with React 18
 * 
 * Architecture decisions:
 * - Single-page application for fast load times
 * - Component-based structure for maintainability
 * - Type-safe props and state management
 * - CSS-in-JS via Tailwind for optimal bundle size
 * 
 * @returns {JSX.Element} The main application component
 */
function App(): JSX.Element {
  /**
   * Controls visibility of tech stack tooltip.
   * 
   * Implements progressive disclosure pattern: tech stack appears
   * only on hover over "Background" card to reduce visual clutter
   * while maintaining discoverability.
   */
  const [showTechStack, setShowTechStack] = useState<boolean>(false)

  return (
    <div className="h-screen bg-[#050505] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-6 py-8 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold font-heading tracking-tight text-white">
            <span>Daniil Makeev</span> <span className="font-mono text-[#A1A1AA] font-normal">|</span> <span className="font-mono text-[#A1A1AA] font-normal">AI Systems Engineer<span className="cursor-blink text-[#A1A1AA]">_</span></span>
          </h1>
        </div>
      </header>

      {/* Main Content - List */}
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-4xl">
          <ul className="space-y-6" role="list">
            {cardData.map((card: PortfolioCard) => {
              /**
               * Handles mouse enter event for tech stack tooltip.
               * 
               * Implements conditional rendering based on card ID to show
               * tech stack only for "Background" card, reducing cognitive load.
               */
              const handleMouseEnter = (): void => {
                if (card.id === "4") {
                  setShowTechStack(true)
                }
              }

              /**
               * Handles mouse leave event for tech stack tooltip.
               * 
               * Hides tooltip when user moves away from "Background" card,
               * maintaining clean UI state.
               */
              const handleMouseLeave = (): void => {
                if (card.id === "4") {
                  setShowTechStack(false)
                }
              }

              return (
                <li
                  key={card.id}
                  className="group flex items-start gap-5 transition-all duration-200 hover:translate-x-1"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                <div className="flex-shrink-0 mt-0.5 text-[#A1A1AA] group-hover:text-white transition-colors duration-200">
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-xl mb-1.5 text-white group-hover:text-white transition-colors duration-200 tracking-tight">
                    {card.title}
                  </h2>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed font-body">
                    {card.description}
                  </p>
                </div>
              </li>
              )
            })}
          </ul>
        </div>
      </main>

      {/* Tech Stack Tooltip (appears on hover Background) */}
      {showTechStack && (
        <div className="fixed bottom-24 right-6 font-mono text-xs text-[#A1A1AA] opacity-30 pointer-events-none">
          {techStack}
        </div>
      )}

      {/* Footer */}
      <footer className="px-6 py-6 flex-shrink-0 border-t border-[#1F1F1F]">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-sm text-[#A1A1AA]">
            <span>&gt; Connect:</span>{" "}
            <a
              href="https://github.com/wyddy7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#22C55E] transition-colors duration-200 inline-flex items-center ml-2"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://t.me/wyddy7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#22C55E] transition-colors duration-200 inline-flex items-center ml-4"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="mailto:your-email@example.com"
              className="text-white hover:text-[#22C55E] transition-colors duration-200 inline-flex items-center ml-4"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
