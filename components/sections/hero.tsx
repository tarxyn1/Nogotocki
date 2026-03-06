"use client"

import { siteConfig } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main heading with staggered animation */}
          <div 
            className={`space-y-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Decorative logo mark */}
            <div className="flex justify-center mb-4">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 border border-primary/30 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-2 border border-primary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-4 border border-primary/40 rounded-full" />
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-8 h-8 text-primary"
                >
                  <path 
                    d="M12 2C10.5 2 9.5 3 9 4.5C8.5 6 8 8 8 10C8 12 8.5 14 9.5 15.5C10.5 17 11 18 11 19.5C11 20.5 11.5 21.5 12 22C12.5 21.5 13 20.5 13 19.5C13 18 13.5 17 14.5 15.5C15.5 14 16 12 16 10C16 8 15.5 6 15 4.5C14.5 3 13.5 2 12 2Z" 
                    fill="currentColor"
                  />
                  <ellipse 
                    cx="12" 
                    cy="6" 
                    rx="2.5" 
                    ry="2" 
                    fill="currentColor" 
                    className="opacity-60"
                  />
                </svg>
              </div>
            </div>
            
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs">
              {siteConfig.tagline}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-foreground tracking-tight leading-tight">
              <span className="block">{siteConfig.name}</span>
              <span className="block text-primary/80 text-2xl md:text-3xl lg:text-4xl mt-2 tracking-[0.15em] font-normal uppercase">маникюр и педикюр</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto pt-4">
              {siteConfig.description}
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center pt-8 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
                Записаться
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border border-foreground/30 hover:border-primary hover:bg-primary/10 px-12 py-7 text-base font-medium tracking-wider uppercase text-foreground transition-all duration-300 hover:scale-105"
              onClick={scrollToServices}
            >
              Услуги и цены
            </Button>
          </div>
          
          {/* Address */}
          <p 
            className={`text-muted-foreground text-sm tracking-widest uppercase pt-8 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {siteConfig.contacts.address}, {siteConfig.contacts.city}
          </p>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={scrollToServices}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 cursor-pointer ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-xs tracking-widest uppercase">Вниз</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </div>
    </section>
  )
}
