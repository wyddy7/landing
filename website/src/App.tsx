import { Code, Bot, Rocket, Layers, Github, Mail, MessageCircle } from "lucide-react"
import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/neon-button"
import Marquee from "react-fast-marquee"

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
    description: "Architecting fault-tolerant data pipelines handling 100k+ daily requests and deploying scalable microservices for real-time inference.",
    icon: <Code className="h-5 w-5" />,
  },
  {
    id: "2",
    title: "LLM Orchestration",
    description: "Designing agentic workflows using LangChain, RAG pipelines & multi-agent systems for automation.",
    icon: <Bot className="h-5 w-5" />,
  },
  {
    id: "3",
    title: "Background",
    description: "BMSTU (Bauman). Focus on System Architecture & High-load Systems. Founder mindset: shipping products, not just code.",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    id: "4",
    title: "Stealth AI Startup",
    description: "Founder & Lead Engineer. Built an end-to-end video generation platform automating 500+ daily videos with zero manual oversight.",
    icon: <Rocket className="h-5 w-5" />,
  },
] as const

/**
 * Technology stack array for infinite marquee.
 * 
 * Comprehensive list of technologies displayed in a continuous scrolling marquee.
 * Demonstrates breadth of technical expertise across AI, infrastructure, and development.
 */
const techStack: readonly string[] = [
  "RAG",
  "LLM Orchestration",
  "Agentic Workflows",
  "Python AsyncIO",
  "Docker",
  "LangChain",
  "OpenAI API",
  "OpenAI SDK",
  "FFmpeg",
  "AI Agents",
  "High-load Scraping (99.9% uptime)",
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "React 19",
  "TypeScript",
  "Click",
  "BeautifulSoup",
  "Pandas",
] as const

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
   * Controls visibility of tech stack marquee.
   * 
   * Implements progressive disclosure pattern: tech stack marquee appears
   * only on hover over "Background" card with smooth animation.
   */
  const [showTechStack, setShowTechStack] = useState<boolean>(false)

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      {/* Header */}
      <header className="px-5 py-8 sm:px-6 sm:py-8 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold font-heading tracking-tight text-white">
            <span>Daniil Makeev</span> <span className="font-mono text-[#A1A1AA] font-normal">|</span> <span className="font-mono text-[#A1A1AA] font-normal text-base sm:text-base md:text-lg">AI Systems Engineer | Building Autonomous Agents & Scalable LLM Pipelines | Founder (Stealth Mode)<span className="cursor-blink text-[#A1A1AA]">_</span></span>
          </h1>
        </div>
      </header>

      {/* Main Content - List */}
      <main className="flex-1 flex items-center justify-center px-5 py-8 pb-24 sm:pb-8 sm:px-6 sm:py-8">
        <div className="w-full max-w-4xl">
          <ul className="space-y-6 sm:space-y-6" role="list">
            {cardData.map((card: PortfolioCard) => {
              /**
               * Handles mouse enter event for tech stack marquee.
               * 
               * Shows marquee only when hovering over "Background" card.
               */
              const handleMouseEnter = (): void => {
                if (card.id === "3") {
                  setShowTechStack(true)
                }
              }

              /**
               * Handles mouse leave event for tech stack marquee.
               * 
               * Hides marquee when user moves away from "Background" card.
               */
              const handleMouseLeave = (): void => {
                if (card.id === "3") {
                  setShowTechStack(false)
                }
              }

              return (
                <li
                  key={card.id}
                  className="group flex items-start gap-4 sm:gap-5 transition-all duration-200 hover:translate-x-1"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                <div className="flex-shrink-0 mt-1 text-[#A1A1AA] group-hover:text-white transition-colors duration-200">
                  <div className="h-6 w-6 sm:h-5 sm:w-5">
                    {card.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-lg sm:text-lg md:text-xl mb-2 sm:mb-1.5 text-white group-hover:text-white transition-colors duration-200 tracking-tight">
                    {card.title}
                  </h2>
                  <p className="text-sm sm:text-sm text-[#A1A1AA] leading-relaxed font-body">
                    {card.description}
                  </p>
                </div>
              </li>
              )
            })}
          </ul>
        </div>
      </main>

      {/* Footer - на мобильных всегда виден внизу, на десктопе в конце контента */}
      <footer className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto sm:left-auto sm:right-auto bg-[#050505] border-t border-[#1F1F1F] flex-shrink-0 z-50 overflow-visible sm:relative sm:z-10">
        {/* Tech Stack Marquee - абсолютно позиционирован над футером, только на десктопе */}
        <div 
          className={`hidden sm:block absolute left-0 right-0 bg-[#050505] border-b border-gray-900/50 overflow-hidden transition-all duration-500 ease-out ${
            showTechStack 
              ? 'opacity-100 translate-y-0 py-4 z-30' 
              : 'opacity-0 translate-y-2 py-0 pointer-events-none z-0'
          }`}
          style={{
            bottom: '100%',
            maxHeight: showTechStack ? '100px' : '0',
            willChange: 'transform, opacity',
            isolation: 'isolate',
          }}
        >
          <Marquee gradient={false} speed={30} pauseOnHover>
            {techStack.map((tech, i) => (
              <span key={i} className="mx-8 text-sm font-mono text-gray-500">
                {tech}
              </span>
            ))}
          </Marquee>
        </div>
        
        <div className="px-5 py-4 sm:px-6 sm:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-base sm:text-base text-[#A1A1AA] flex items-center w-full min-w-0 gap-3 sm:gap-0">
            <div className="flex items-center gap-3 sm:gap-0 flex-shrink-0 min-w-0">
              <span className="whitespace-nowrap hidden sm:inline">&gt; Connect:</span>
              <a
                href="https://github.com/wyddy7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#CCFF00] transition-colors duration-200 inline-flex items-center flex-shrink-0 ml-0 sm:ml-2"
              >
                <Github className="h-6 w-6 sm:h-5 sm:w-5" />
              </a>
              <a
                href="mailto:your-email@example.com"
                className="text-white hover:text-[#CCFF00] transition-colors duration-200 inline-flex items-center flex-shrink-0 ml-0 sm:ml-4"
              >
                <Mail className="h-6 w-6 sm:h-5 sm:w-5" />
              </a>
            </div>
            <div className="flex-1 min-w-0"></div>
            <Button
              href="https://t.me/wyddy7"
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
              className="flex-shrink-0 inline-flex items-center gap-2 font-bold text-base ml-auto"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="hidden sm:inline">Text Me</span>
              <span className="sm:hidden">Ping me_</span>
            </Button>
          </div>
        </div>
      </div>
      </footer>
    </div>
  )
}

export default App