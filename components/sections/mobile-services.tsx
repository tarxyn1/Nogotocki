"use client"

import { siteConfig } from "@/lib/site-config"
import { useTelegram } from "@/components/telegram-provider"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function MobileServices() {
  const { haptic, webApp } = useTelegram()
  const [activeCategory, setActiveCategory] = useState(0)

  // Group services by category
  const manicure = siteConfig.services.filter(
    (s) =>
      s.name.toLowerCase().includes("маникюр") &&
      !s.name.toLowerCase().includes("педикюр") &&
      !s.name.toLowerCase().includes("комплекс")
  )
  const pedicure = siteConfig.services.filter(
    (s) => s.name.toLowerCase().includes("педикюр") && !s.name.toLowerCase().includes("комплекс")
  )
  const other = siteConfig.services.filter(
    (s) => s.name.toLowerCase().includes("снятие") || s.name.toLowerCase().includes("комплекс")
  )

  const categories = [
    { title: "Маникюр", items: manicure },
    { title: "Педикюр", items: pedicure },
    { title: "Ещё", items: other },
  ]

  const handleCategoryChange = (index: number) => {
    haptic.selection()
    setActiveCategory(index)
  }

  const handleServiceTap = (serviceName: string) => {
    haptic.impact("light")
    const message = `Привет! Хочу записаться на ${serviceName}`
    const url = `https://wa.me/${siteConfig.contacts.whatsapp}?text=${encodeURIComponent(message)}`
    if (webApp) {
      webApp.openLink(url)
    } else {
      window.open(url, "_blank")
    }
  }

  return (
    <section id="services" className="py-8 bg-card">
      <div className="px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-primary/70 font-medium tracking-[0.2em] uppercase text-[10px] mb-2">
            прайс-лист
          </p>
          <h2 className="font-serif text-2xl font-medium text-foreground">Услуги и цены</h2>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          {categories.map((cat, index) => (
            <button
              key={cat.title}
              onClick={() => handleCategoryChange(index)}
              className={cn(
                "flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground active:bg-secondary/80"
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Services list */}
        <div className="space-y-3">
          {categories[activeCategory].items.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceTap(service.name)}
              className="w-full bg-background border border-border rounded-2xl p-4 text-left active:scale-[0.98] transition-transform"
            >
              <div className="flex justify-between items-start gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground text-sm">{service.name}</h4>
                    {service.popular && (
                      <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full">
                        Хит
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-primary font-serif text-lg font-medium whitespace-nowrap">
                  {service.price.toLocaleString("ru-RU")} ₽
                </span>
              </div>

              <p className="text-muted-foreground text-xs leading-relaxed mb-2">
                {service.description}
              </p>

              <div className="flex items-center gap-1 text-[10px] text-muted-foreground/70">
                <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 6V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>{service.duration}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Book button */}
        <div className="mt-6">
          <button
            onClick={() => {
              haptic.impact("medium")
              const url = `https://wa.me/${siteConfig.contacts.whatsapp}?text=${encodeURIComponent("Привет! Хочу записаться")}`
              if (webApp) {
                webApp.openLink(url)
              } else {
                window.open(url, "_blank")
              }
            }}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-medium tracking-wide active:scale-[0.98] transition-transform"
          >
            Записаться на услугу
          </button>
        </div>
      </div>
    </section>
  )
}
