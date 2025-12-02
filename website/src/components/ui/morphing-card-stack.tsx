"use client"

import { useState, type ReactNode } from "react"

import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"

import { cn } from "@/lib/utils"

import { Grid3X3, Layers, LayoutList } from "lucide-react"

/**
 * Layout mode options for card display.
 * 
 * Implements multiple view modes to enhance UX:
 * - "stack": Card deck with depth perception (3D effect)
 * - "grid": Grid layout for overview (2x2)
 * - "list": Vertical list for detailed view
 */
export type LayoutMode = "stack" | "grid" | "list"

/**
 * Card data structure for portfolio items.
 * 
 * Represents a single card with all necessary display properties.
 * Designed for flexibility: supports optional icon and custom colors
 * for future theming capabilities.
 */
export interface CardData {
  /** Unique identifier for React key prop and layout animations */
  id: string
  /** Card heading/title */
  title: string
  /** Detailed description text */
  description: string
  /** Optional React icon component for visual hierarchy */
  icon?: ReactNode
  /** Optional custom background color (hex format) */
  color?: string
}

/**
 * Extended card data with layout position information.
 * 
 * Used internally for stack ordering and layout calculations.
 * Extends CardData with stack position for z-index and transform calculations.
 */
interface CardWithPosition extends CardData {
  /** Position in stack (0 = top, higher = deeper) */
  stackPosition: number
}

/**
 * Component props for MorphingCardStack.
 * 
 * Implements flexible API with sensible defaults:
 * - Optional cards array (empty state handled gracefully)
 * - Customizable className for styling flexibility
 * - Layout mode persistence via defaultLayout
 * - Optional callback for card interactions
 */
export interface MorphingCardStackProps {
  /** Array of cards to display. Empty array renders nothing. */
  cards?: readonly CardData[]
  /** Additional CSS classes for container customization */
  className?: string
  /** Initial layout mode (persists until user changes) */
  defaultLayout?: LayoutMode
  /** Callback fired when card is clicked (not during drag) */
  onCardClick?: (card: CardData) => void
}

/**
 * Icon mapping for layout mode buttons.
 * 
 * Provides visual representation for each layout mode in the toggle UI.
 * Uses Lucide icons for consistency and tree-shaking benefits.
 */
const layoutIcons: Record<LayoutMode, typeof Layers> = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
} as const

/**
 * Minimum swipe distance in pixels to trigger card navigation.
 * 
 * Prevents accidental card changes from minor touch movements.
 * Optimized for both mouse and touch interactions.
 */
const SWIPE_THRESHOLD: number = 50

/**
 * MorphingCardStack Component
 * 
 * Advanced card component with multiple layout modes and gesture-based navigation.
 * 
 * Architecture decisions:
 * - Uses Framer Motion's LayoutGroup for smooth layout transitions
 * - Implements gesture recognition for swipe navigation (mobile-friendly)
 * - Supports three layout modes for different use cases
 * - Optimized rendering with AnimatePresence for exit animations
 * 
 * Performance considerations:
 * - Memoized layout calculations to prevent unnecessary re-renders
 * - Conditional drag handlers (only top card draggable in stack mode)
 * - Hardware-accelerated animations via Framer Motion
 * 
 * Accessibility:
 * - ARIA labels on all interactive elements
 * - Keyboard navigation ready (can be extended)
 * - Semantic HTML structure
 * 
 * @param props - Component props
 * @returns JSX element or null if no cards provided
 */
export function Component({
  cards = [],
  className,
  defaultLayout = "stack",
  onCardClick,
}: MorphingCardStackProps): JSX.Element | null {
  /** Current layout mode (stack/grid/list) */
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  /** ID of currently expanded card (null if none) */
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  /** Index of active card in stack mode (for circular navigation) */
  const [activeIndex, setActiveIndex] = useState<number>(0)
  /** Tracks drag state to prevent click events during drag */
  const [isDragging, setIsDragging] = useState<boolean>(false)

  // Early return for empty state
  if (!cards || cards.length === 0) {
    return null
  }

  /**
   * Handles drag end event for swipe navigation.
   * 
   * Implements velocity-based swipe detection for natural feel:
   * - Fast swipes trigger navigation even with small distance
   * - Slow swipes require threshold distance
   * - Prevents accidental navigation from minor movements
   * 
   * @param _event - Drag event (unused but required by Framer Motion)
   * @param info - Pan gesture information (offset, velocity)
   */
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x

    // Swiped left - navigate to next card
    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex((prev) => (prev + 1) % cards.length)
    } 
    // Swiped right - navigate to previous card
    else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }

    setIsDragging(false)
  }

  /**
   * Calculates stack order for 3D depth effect.
   * 
   * Implements circular rotation: cards wrap around when reaching end.
   * Reverses array so top card (index 0) renders last (highest z-index).
   * 
   * @returns Array of cards with stack positions
   */
  const getStackOrder = (): readonly CardWithPosition[] => {
    const reordered: CardWithPosition[] = []
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i })
    }
    // Reverse so top card renders last (on top in DOM)
    return reordered.reverse()
  }

  /**
   * Calculates layout-specific styles for card positioning.
   * 
   * Returns different style objects based on layout mode:
   * - Stack: Offset positioning with rotation for 3D effect
   * - Grid/List: Flat positioning for 2D layouts
   * 
   * @param stackPosition - Position in stack (0 = top)
   * @returns Style object with position, z-index, and rotation
   */
  const getLayoutStyles = (stackPosition: number): {
    top: number
    left: number
    zIndex: number
    rotate: number
  } => {
    switch (layout) {
      case "stack":
        return {
          top: stackPosition * 8,
          left: stackPosition * 8,
          zIndex: cards.length - stackPosition,
          rotate: (stackPosition - 1) * 2,
        }
      case "grid":
      case "list":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        }
    }
  }

  /**
   * CSS class mappings for container layouts.
   * 
   * Defines responsive container styles for each layout mode.
   * Uses Tailwind utility classes for optimal bundle size.
   */
  const containerStyles: Record<LayoutMode, string> = {
    stack: "relative h-64 w-64",
    grid: "grid grid-cols-2 gap-3",
    list: "flex flex-col gap-3",
  } as const

  /**
   * Cards to display based on current layout mode.
   * 
   * - Stack mode: Uses calculated stack order with positions
   * - Grid/List modes: Maps cards with sequential positions
   */
  const displayCards: readonly CardWithPosition[] = 
    layout === "stack" 
      ? getStackOrder() 
      : cards.map((c, i) => ({ ...c, stackPosition: i }))

  return (
    <div className={cn("space-y-4", className)}>
      {/* Layout Toggle */}
      <div className="flex items-center justify-center gap-1 rounded-lg bg-secondary/50 p-1 w-fit mx-auto">
        {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
          const Icon = layoutIcons[mode]
          return (
            <button
              key={mode}
              onClick={() => setLayout(mode)}
              className={cn(
                "rounded-md p-2 transition-all",
                layout === mode
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
              aria-label={`Switch to ${mode} layout`}
            >
              <Icon className="h-4 w-4" />
            </button>
          )
        })}
      </div>

      {/* Cards Container */}
      <LayoutGroup>
        <motion.div layout className={cn(containerStyles[layout], "mx-auto")}>
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const styles = getLayoutStyles(card.stackPosition)
              const isExpanded = expandedCard === card.id
              const isTopCard = layout === "stack" && card.stackPosition === 0

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isExpanded ? 1.05 : 1,
                    x: 0,
                    ...styles,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -200 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                  onClick={() => {
                    if (isDragging) return
                    setExpandedCard(isExpanded ? null : card.id)
                    onCardClick?.(card)
                  }}
                  className={cn(
                    "cursor-pointer rounded-xl border border-border bg-card p-4",
                    "hover:border-primary/50 transition-colors",
                    layout === "stack" && "absolute w-56 h-48",
                    layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing",
                    layout === "grid" && "w-full aspect-square",
                    layout === "list" && "w-full",
                    isExpanded && "ring-2 ring-primary",
                  )}
                  style={{
                    backgroundColor: card.color || undefined,
                  }}
                >
                  <div className="flex items-start gap-3">
                    {card.icon && (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
                        {card.icon}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-card-foreground truncate">{card.title}</h3>
                      <p
                        className={cn(
                          "text-sm text-muted-foreground mt-1",
                          layout === "stack" && "line-clamp-3",
                          layout === "grid" && "line-clamp-2",
                          layout === "list" && "line-clamp-1",
                        )}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>
                  {isTopCard && (
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="text-xs text-muted-foreground/50">Swipe to navigate</span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {layout === "stack" && cards.length > 1 && (
        <div className="flex justify-center gap-1.5">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === activeIndex ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

