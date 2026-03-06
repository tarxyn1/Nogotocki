"use client"

import { siteConfig } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react"
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

export function Contacts() {
  const { ref, isInView } = useInView()

  return (
    <section id="contacts" className="py-24 lg:py-32 bg-card overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Header */}
          <div 
            className={`space-y-6 transition-all duration-1000 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs">
              Контакты
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground">
              Запишитесь сейчас
            </h2>
            <p className="text-muted-foreground text-lg">
              Отвечу в течение часа
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-200 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-7 text-base font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              asChild
            >
              <a 
                href={`https://wa.me/${siteConfig.contacts.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border border-foreground/30 hover:border-primary hover:bg-primary/10 px-12 py-7 text-base font-medium tracking-wider uppercase text-foreground transition-all duration-300 hover:scale-105"
              asChild
            >
              <a 
                href={`https://t.me/${siteConfig.contacts.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send className="w-5 h-5 mr-2" />
                Telegram
              </a>
            </Button>
          </div>
          
          {/* Contact details */}
          <div 
            className={`grid md:grid-cols-3 gap-8 pt-12 border-t border-border transition-all duration-1000 delay-400 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <a 
                href={`tel:${siteConfig.contacts.phone}`}
                className="text-foreground hover:text-primary transition-colors"
              >
                {siteConfig.contacts.phone}
              </a>
            </div>
            
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-foreground">{siteConfig.contacts.address}</p>
                <p className="text-muted-foreground text-sm">{siteConfig.contacts.city}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <p className="text-foreground">{siteConfig.contacts.workingHours}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
