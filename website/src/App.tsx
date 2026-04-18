import { Code, Bot, Rocket, Layers, Github, Mail, MessageCircle } from "lucide-react"
import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/neon-button"
import Marquee from "react-fast-marquee"
import { useI18n } from "@/hooks/use-i18n"
import { LanguageSelector } from "@/components/ui/language-selector-dropdown"
import { siteContent } from "@/lib/i18n"

const NetWhoIcon = ({ className }: { className?: string }) => (
  <img 
    src="/netwho.svg" 
    alt="NetWho Logo" 
    className={className}
    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
  />
)

/**
 * Main application component.
 */
function App(): JSX.Element {
  const { t } = useI18n()
  const [showTechStack, setShowTechStack] = useState<boolean>(false)

  // Map icons to card data from translations
  const icons: Record<string, ReactNode> = {
    code: <Code className="h-5 w-5" />,
    layers: <Layers className="h-5 w-5" />,
    rocket: <Rocket className="h-5 w-5" />,
    netwho: <NetWhoIcon className="h-5 w-5" />,
    bot: <Bot className="h-5 w-5" />,
  }

  const renderDescription = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/(\[[^\]]+\]\([^)]+\)|@\w+|t\.me\/\w+)/g).map((part, j) => {
          if (!part) return null;

          // Markdown-style links [text](url)
          const markdownMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          if (markdownMatch) {
            const [, linkText, linkUrl] = markdownMatch;
            const href = linkUrl.startsWith('http') ? linkUrl : 
                        linkUrl.startsWith('@') ? `https://t.me/${linkUrl.slice(1)}` :
                        linkUrl.startsWith('t.me/') ? `https://${linkUrl}` :
                        linkUrl;
            return (
              <a key={j} href={href} target="_blank" rel="noopener noreferrer" className="text-[#CCFF00] hover:underline">
                {linkText}
              </a>
            );
          }

          // Regular @username links
          if (part.startsWith('@')) {
            return <a key={j} href={`https://t.me/${part.slice(1)}`} target="_blank" rel="noopener noreferrer" className="text-[#CCFF00] hover:underline">{part}</a>
          }

          // Regular t.me/username links
          if (part.startsWith('t.me/')) {
            return <a key={j} href={`https://${part}`} target="_blank" rel="noopener noreferrer" className="text-[#CCFF00] hover:underline">{part}</a>
          }

          return part
        })}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-5 py-4 sm:px-6 sm:py-6 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold font-heading tracking-tight text-white">
            <span>{t.name}</span> <span className="font-mono text-[#A1A1AA] font-normal">|</span> <span className="font-mono text-[#A1A1AA] font-normal text-base sm:text-base md:text-lg">{t.tagline}<span className="cursor-blink text-[#A1A1AA]">_</span></span>
          </h1>
          <div className="flex-shrink-0">
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Content - List */}
      <main className="flex-1 flex items-center justify-center px-5 py-2 sm:px-6 sm:py-4">
        <div className="w-full max-w-4xl">
          <ul className="space-y-4 sm:space-y-5" role="list">
            {t.cards.map((card) => {
              const handleMouseEnter = (): void => {
                if ("showTechStackOnHover" in card && card.showTechStackOnHover) {
                  setShowTechStack(true)
                }
              }

              const handleMouseLeave = (): void => {
                if ("showTechStackOnHover" in card && card.showTechStackOnHover) {
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
                    {icons[card.icon]}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-lg sm:text-lg md:text-xl mb-2 sm:mb-1.5 text-white group-hover:text-white transition-colors duration-200 tracking-tight">
                    {"link" in card && card.link ? (
                      <a 
                        href={card.link}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-[#CCFF00] transition-colors duration-200 inline-flex items-center gap-2"
                      >
                        {card.title}
                        <Github className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#CCFF00] transition-colors duration-200" />
                      </a>
                    ) : card.title}
                  </h2>
                  <p className="text-sm sm:text-sm text-[#A1A1AA] leading-relaxed font-body">
                    {renderDescription(card.description)}
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
            {t.techStack.map((tech, i) => (
              <span key={i} className="mx-8 text-sm font-mono text-gray-500">
                {tech}
              </span>
            ))}
          </Marquee>
        </div>
        
        <div className="px-5 py-3 sm:px-6 sm:py-4">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-base sm:text-base text-[#A1A1AA] flex items-center w-full min-w-0 gap-3 sm:gap-0">
            <div className="flex items-center gap-3 sm:gap-0 flex-shrink-0 min-w-0">
              <span className="whitespace-nowrap hidden sm:inline">&gt; {t.connect}</span>
              <a
                href={siteContent.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#CCFF00] transition-colors duration-200 inline-flex items-center flex-shrink-0 ml-0 sm:ml-2"
              >
                <Github className="h-6 w-6 sm:h-5 sm:w-5" />
              </a>
              <a
                href={`mailto:${siteContent.contacts.email}`}
                className="text-white hover:text-[#CCFF00] transition-colors duration-200 inline-flex items-center flex-shrink-0 ml-0 sm:ml-4"
              >
                <Mail className="h-6 w-6 sm:h-5 sm:w-5" />
              </a>
            </div>
            <div className="flex-1 min-w-0"></div>
            <Button
              href={siteContent.contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
              className="flex-shrink-0 inline-flex items-center gap-2 font-bold text-base ml-auto"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="hidden sm:inline">{t.textMe}</span>
              <span className="sm:hidden">{t.pingMe}</span>
            </Button>
          </div>
        </div>
      </div>
      </footer>
    </div>
  )
}

export default App
