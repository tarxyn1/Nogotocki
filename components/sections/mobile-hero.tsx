"use client"

import { siteConfig } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import { useTelegram } from "@/components/telegram-provider"
import { useEffect, useState } from "react"

export function MobileHero() {
  const [isVisible, setIsVisible] = useState(false)
  const { haptic, webApp } = useTelegram()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleBooking = () => {
    haptic.impact("medium")
    const whatsappUrl = `https://wa.me/${siteConfig.contacts.whatsapp}?text=${encodeURIComponent("Привет! Хочу записаться на маникюр")}`
    if (webApp) {
      webApp.openLink(whatsappUrl)
    } else {
      window.open(whatsappUrl, "_blank")
    }
  }

  const scrollToServices = () => {
    haptic.selection()
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[calc(100vh-120px)] flex items-center justify-center overflow-hidden pt-16 pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-30">
        <div className="absolute inset-0 border border-primary/20 rounded-full animate-[ping_3s_ease-in-out_infinite]" />
        <div className="absolute inset-8 border border-primary/30 rounded-full animate-[ping_3s_ease-in-out_infinite_0.5s]" />
        <div className="absolute inset-16 border border-primary/40 rounded-full animate-[ping_3s_ease-in-out_infinite_1s]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Logo animation */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-[spin_15s_linear_infinite]" />
            <div className="absolute inset-2 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
            <div className="absolute inset-4 bg-primary/5 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-primary">
                <path
                  d="M12 2C10.5 2 9.5 3 9 4.5C8.5 6 8 8 8 10C8 12 8.5 14 9.5 15.5C10.5 17 11 18 11 19.5C11 20.5 11.5 21.5 12 22C12.5 21.5 13 20.5 13 19.5C13 18 13.5 17 14.5 15.5C15.5 14 16 12 16 10C16 8 15.5 6 15 4.5C14.5 3 13.5 2 12 2Z"
                  fill="currentColor"
                />
                <ellipse cx="12" cy="6" rx="2.5" ry="2" fill="currentColor" className="opacity-60" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <div
          className={`space-y-3 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-primary/80 font-medium tracking-[0.2em] uppercase text-[10px]">
            {siteConfig.tagline}
          </p>
          <h1 className="font-serif text-4xl font-medium text-foreground tracking-tight">
            {siteConfig.name}
          </h1>
          <p className="text-primary/70 text-sm tracking-[0.15em] uppercase">
            маникюр и педикюр
          </p>
        </div>

        {/* Description */}
        <p
          className={`text-muted-foreground text-sm max-w-xs mx-auto mt-6 leading-relaxed transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {siteConfig.description}
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col gap-3 mt-8 transition-all duration-700 delay-450 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-sm font-medium tracking-wider uppercase active:scale-[0.98] transition-transform"
            onClick={handleBooking}
          >
            Записаться
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full border-border hover:border-primary hover:bg-primary/5 py-6 text-sm font-medium tracking-wider uppercase text-foreground active:scale-[0.98] transition-transform"
            onClick={scrollToServices}
          >
            Услуги и цены
          </Button>
        </div>

        {/* Location badge */}
        <div
          className={`mt-8 transition-all duration-700 delay-600 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-card/50 border border-border/50 rounded-full px-4 py-2">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-primary">
              <path
                d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-xs text-muted-foreground">{siteConfig.contacts.city}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
