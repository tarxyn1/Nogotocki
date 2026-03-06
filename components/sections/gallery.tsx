"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const galleryItems = [
  { id: 1, label: "Классика" },
  { id: 2, label: "Френч" },
  { id: 3, label: "Дизайн" },
  { id: 4, label: "Нюд" },
  { id: 5, label: "Арт" },
  { id: 6, label: "Педикюр" },
]

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const studioSection = useInView()
  const gallerySection = useInView()

  return (
    <>
      {/* Studio Section */}
      <section className="py-24 lg:py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-4" ref={studioSection.ref}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div 
              className={`space-y-8 transition-all duration-1000 ${
                studioSection.isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs">
                Студия
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight">
                Уютное
                <br />
                <span className="text-primary italic">пространство</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Приватная студия с комфортной атмосферой. Никаких очередей и посторонних — 
                только вы и мастер. Расслабьтесь под приятную музыку, пока я создаю 
                идеальный маникюр.
              </p>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 tracking-wider uppercase text-sm transition-all duration-300 hover:scale-105"
              >
                Смотреть студию
              </Button>
            </div>
            
            {/* Place image placeholder */}
            <div 
              className={`relative aspect-[4/3] bg-card rounded-sm overflow-hidden transition-all duration-1000 delay-200 ${
                studioSection.isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-muted" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="font-serif text-5xl text-primary/30">Студия</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 lg:py-32 bg-card overflow-hidden">
        <div className="container mx-auto px-4" ref={gallerySection.ref}>
          {/* Header */}
          <div 
            className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-1000 ${
              gallerySection.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-6">
              Портфолио
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground">
              Мои работы
            </h2>
          </div>
          
          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelectedImage(item.id)}
                className={`group relative aspect-square overflow-hidden cursor-pointer transition-all duration-700 ${
                  gallerySection.isInView 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-card transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-2xl md:text-4xl text-primary/40 group-hover:text-primary/70 transition-all duration-300 group-hover:scale-110">
                    {item.label}
                  </span>
                </div>
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
              </button>
            ))}
          </div>
          
          {/* View Work button */}
          <div 
            className={`text-center mt-12 transition-all duration-1000 delay-700 ${
              gallerySection.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 tracking-wider uppercase text-sm transition-all duration-300 hover:scale-105"
            >
              Все работы
            </Button>
          </div>
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5" />
            </button>
            
            <div 
              className="relative w-full max-w-4xl aspect-square animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-card rounded-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-6xl text-primary/50">
                  {galleryItems.find(i => i.id === selectedImage)?.label}
                </span>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
