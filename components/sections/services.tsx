"use client"

import { siteConfig } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import { Clock, Sparkles } from "lucide-react"
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

export function Services() {
  const { ref, isInView } = useInView()
  
  // Group services by category
  const manicure = siteConfig.services.filter(s => s.name.toLowerCase().includes('маникюр') && !s.name.toLowerCase().includes('педикюр') && !s.name.toLowerCase().includes('комплекс'))
  const pedicure = siteConfig.services.filter(s => s.name.toLowerCase().includes('педикюр') && !s.name.toLowerCase().includes('комплекс'))
  const other = siteConfig.services.filter(s => s.name.toLowerCase().includes('снятие') || s.name.toLowerCase().includes('комплекс'))

  const categories = [
    { title: "Маникюр", items: manicure },
    { title: "Педикюр", items: pedicure },
    { title: "Дополнительно", items: other },
  ]

  return (
    <section id="services" className="py-24 lg:py-32 bg-card overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <div 
          className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-6">
            {siteConfig.name}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground">
            Услуги и цены
          </h2>
        </div>
        
        {/* Services categories */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {categories.map((category, catIndex) => (
            <div 
              key={category.title} 
              className={`space-y-8 transition-all duration-1000 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${catIndex * 200 + 200}ms` }}
            >
              <h3 className="font-serif text-2xl text-foreground text-center border-b border-border pb-4">
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.items.map((service, serviceIndex) => (
                  <div
                    key={service.id}
                    className={`group p-4 -mx-4 rounded-sm transition-all duration-300 hover:bg-secondary/50 ${
                      isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${catIndex * 200 + serviceIndex * 100 + 400}ms` }}
                  >
                    <div className="flex justify-between items-baseline gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {service.name}
                        </h4>
                        {service.popular && (
                          <Sparkles className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <span className="text-primary font-serif text-xl whitespace-nowrap">
                        {service.price.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-1">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* View all button */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 tracking-wider uppercase text-sm transition-all duration-300 hover:scale-105"
            asChild
          >
            <a 
              href={`https://wa.me/${siteConfig.contacts.whatsapp}?text=Здравствуйте! Хочу узнать подробнее об услугах`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Узнать подробнее
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
