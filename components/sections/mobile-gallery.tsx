"use client"

import { siteConfig } from "@/lib/site-config"
import { useTelegram } from "@/components/telegram-provider"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

export function MobileGallery() {
  const { haptic } = useTelegram()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleImageTap = (index: number) => {
    haptic.impact("light")
    setSelectedImage(index)
  }

  const handleClose = () => {
    haptic.selection()
    setSelectedImage(null)
  }

  return (
    <section id="gallery" className="py-8 bg-background">
      <div className="px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-primary/70 font-medium tracking-[0.2em] uppercase text-[10px] mb-2">
            портфолио
          </p>
          <h2 className="font-serif text-2xl font-medium text-foreground">Мои работы</h2>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-4 pb-4 no-scrollbar snap-x snap-mandatory"
      >
        {siteConfig.gallery.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleImageTap(index)}
            className="relative flex-shrink-0 w-44 h-56 rounded-2xl overflow-hidden snap-center active:scale-[0.97] transition-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <span className="text-xs font-medium text-foreground/90">{item.category}</span>
            </div>
            {/* Placeholder image */}
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-card flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-primary/40">
                <path
                  d="M12 2C10.5 2 9.5 3 9 4.5C8.5 6 8 8 8 10C8 12 8.5 14 9.5 15.5C10.5 17 11 18 11 19.5C11 20.5 11.5 21.5 12 22C12.5 21.5 13 20.5 13 19.5C13 18 13.5 17 14.5 15.5C15.5 14 16 12 16 10C16 8 15.5 6 15 4.5C14.5 3 13.5 2 12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Image count indicator */}
      <div className="flex justify-center gap-1.5 mt-2 px-4">
        {siteConfig.gallery.slice(0, 5).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-colors",
              index === 0 ? "bg-primary" : "bg-border"
            )}
          />
        ))}
        {siteConfig.gallery.length > 5 && (
          <span className="text-[10px] text-muted-foreground ml-1">+{siteConfig.gallery.length - 5}</span>
        )}
      </div>

      {/* Fullscreen viewer */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-lg flex items-center justify-center"
          onClick={handleClose}
        >
          <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card flex items-center justify-center safe-area-top"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-foreground">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Image */}
            <div className="w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-card flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 text-primary/40">
                <path
                  d="M12 2C10.5 2 9.5 3 9 4.5C8.5 6 8 8 8 10C8 12 8.5 14 9.5 15.5C10.5 17 11 18 11 19.5C11 20.5 11.5 21.5 12 22C12.5 21.5 13 20.5 13 19.5C13 18 13.5 17 14.5 15.5C15.5 14 16 12 16 10C16 8 15.5 6 15 4.5C14.5 3 13.5 2 12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Category label */}
            <div className="absolute bottom-8 left-0 right-0 text-center safe-area-bottom">
              <span className="bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-foreground">
                {siteConfig.gallery[selectedImage].category}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
