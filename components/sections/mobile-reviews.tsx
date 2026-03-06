"use client"

import { siteConfig } from "@/lib/site-config"
import { useTelegram } from "@/components/telegram-provider"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function MobileReviews() {
  const { haptic } = useTelegram()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft
      const cardWidth = scrollRef.current.offsetWidth - 32
      const newIndex = Math.round(scrollLeft / cardWidth)
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
        haptic.selection()
      }
    }
  }

  return (
    <section id="reviews" className="py-8 bg-card">
      <div className="px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-primary/70 font-medium tracking-[0.2em] uppercase text-[10px] mb-2">
            отзывы
          </p>
          <h2 className="font-serif text-2xl font-medium text-foreground">Что говорят клиенты</h2>
        </div>
      </div>

      {/* Reviews carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar snap-x snap-mandatory"
      >
        {siteConfig.reviews.map((review, index) => (
          <div
            key={review.id}
            className="flex-shrink-0 w-[calc(100vw-48px)] snap-center"
          >
            <div className="bg-background border border-border rounded-2xl p-5">
              {/* Quote icon */}
              <div className="mb-4">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-primary/30">
                  <path
                    d="M10 8C10 10.21 8.21 12 6 12C5.5 12 5 11.93 4.54 11.8C4.19 12.84 4 13.92 4 15V18H9V15C9 13.34 9.5 11.78 10.36 10.46C9.5 10.84 8.77 11.41 8.2 12.1C8.07 11.58 8 11.04 8 10.5C8 9.67 8.67 9 9.5 9C9.68 9 9.84 9.03 10 9.08V8ZM20 8C20 10.21 18.21 12 16 12C15.5 12 15 11.93 14.54 11.8C14.19 12.84 14 13.92 14 15V18H19V15C19 13.34 19.5 11.78 20.36 10.46C19.5 10.84 18.77 11.41 18.2 12.1C18.07 11.58 18 11.04 18 10.5C18 9.67 18.67 9 19.5 9C19.68 9 19.84 9.03 20 9.08V8Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Review text */}
              <p className="text-foreground/90 text-sm leading-relaxed mb-4">{review.text}</p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">{review.author}</p>
                  <p className="text-muted-foreground text-xs">{review.source}</p>
                </div>
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 text-primary" fill="currentColor">
                      <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-2">
        {siteConfig.reviews.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === activeIndex ? "bg-primary w-6" : "bg-border"
            )}
          />
        ))}
      </div>
    </section>
  )
}
