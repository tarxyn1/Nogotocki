"use client"

import { useState, useEffect } from "react"
import { siteConfig } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#services", label: "Услуги" },
  { href: "#gallery", label: "Работы" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md py-4" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            className="group flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            {/* Decorative nail icon */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 border border-primary/40 rounded-full group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-1 border border-primary/20 rounded-full group-hover:rotate-45 transition-transform duration-500" />
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-5 h-5 text-primary"
              >
                <path 
                  d="M12 2C10.5 2 9.5 3 9 4.5C8.5 6 8 8 8 10C8 12 8.5 14 9.5 15.5C10.5 17 11 18 11 19.5C11 20.5 11.5 21.5 12 22C12.5 21.5 13 20.5 13 19.5C13 18 13.5 17 14.5 15.5C15.5 14 16 12 16 10C16 8 15.5 6 15 4.5C14.5 3 13.5 2 12 2Z" 
                  fill="currentColor"
                  className="group-hover:opacity-80 transition-opacity"
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
            
            {/* Text with decorative elements */}
            <div className="flex flex-col">
              <span className="font-serif text-xl font-medium text-foreground tracking-wide group-hover:text-primary transition-colors duration-300">
                {siteConfig.name}
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground -mt-0.5">
                маникюр и педикюр
              </span>
            </div>
          </a>
          
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-medium text-foreground/70 hover:text-primary transition-colors tracking-[0.2em] uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 tracking-wider uppercase text-xs"
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
          </div>
          
          {/* Mobile menu button */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-8 space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-foreground/70 hover:text-primary transition-colors tracking-[0.2em] uppercase text-sm"
            >
              {link.label}
            </a>
          ))}
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground tracking-wider uppercase text-sm mt-4"
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
        </div>
      </div>
    </header>
  )
}
