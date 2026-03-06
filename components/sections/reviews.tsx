"use client"

import { siteConfig } from "@/lib/site-config"
import { Quote } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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

export function Reviews() {
  const { ref, isInView } = useInView()

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <div 
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-6">
            Отзывы
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground">
            Что говорят клиенты
          </h2>
        </div>
        
        {/* Reviews grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {siteConfig.reviews.slice(0, 3).map((review, index) => (
            <div
              key={review.id}
              className={`text-center space-y-6 p-6 bg-card rounded-sm transition-all duration-700 hover:bg-secondary/50 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              <Quote className="w-8 h-8 text-primary/30 mx-auto" />
              
              <p className="text-foreground leading-relaxed italic">
                {review.text}
              </p>
              
              <div className="pt-4 border-t border-border">
                <p className="text-primary font-medium">{review.name}</p>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mt-1">
                  {review.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
