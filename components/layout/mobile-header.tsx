"use client"

import { useState, useEffect } from "react"
import { siteConfig } from "@/lib/site-config"
import { useTelegram } from "@/components/telegram-provider"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "home", label: "Главная", icon: "home" },
  { id: "services", label: "Услуги", icon: "services" },
  { id: "gallery", label: "Работы", icon: "gallery" },
  { id: "reviews", label: "Отзывы", icon: "reviews" },
  { id: "contacts", label: "Запись", icon: "contacts" },
]

function NavIcon({ icon, isActive }: { icon: string; isActive: boolean }) {
  const iconClass = cn(
    "w-5 h-5 transition-all duration-300",
    isActive ? "text-primary scale-110" : "text-muted-foreground"
  )

  switch (icon) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass}>
          <path
            d="M12 3L4 9V21H9V14H15V21H20V9L12 3Z"
            fill={isActive ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "services":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass}>
          <rect
            x="3"
            y="3"
            width="7"
            height="7"
            rx="1"
            fill={isActive ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="14"
            y="3"
            width="7"
            height="7"
            rx="1"
            fill={isActive ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="3"
            y="14"
            width="7"
            height="7"
            rx="1"
            fill={isActive ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="14"
            y="14"
            width="7"
            height="7"
            rx="1"
            fill={isActive ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      )
    case "gallery":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass}>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            fill={isActive ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="8.5" cy="8.5" r="1.5" fill={isActive ? "var(--background)" : "currentColor"} />
          <path
            d="M21 15L16 10L5 21"
            stroke={isActive ? "var(--background)" : "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "reviews":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass}>
          <path
            d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z"
            fill={isActive ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "contacts":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass}>
          <path
            d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.98C20.58 21.01 20.15 21.03 19.72 21.03C10.58 21.03 3.03 13.48 3.03 4.34C3.03 3.91 3.05 3.48 3.08 3.06C3.13 2.5 3.58 2.06 4.14 2.06H7.14C7.6 2.06 7.99 2.39 8.09 2.84L8.8 6.34C8.89 6.74 8.73 7.15 8.4 7.39L6.59 8.79C8.07 11.62 10.38 13.93 13.21 15.41L14.61 13.6C14.85 13.27 15.26 13.11 15.66 13.2L19.16 13.91C19.61 14.01 19.94 14.4 19.94 14.86V16.92H22Z"
            fill={isActive ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    default:
      return null
  }
}

export function MobileHeader() {
  const [activeSection, setActiveSection] = useState("home")
  const { haptic } = useTelegram()

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: item.id === "home" ? document.body : document.getElementById(item.id),
      }))

      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element) {
          const offsetTop = section.id === "home" ? 0 : (section.element as HTMLElement).offsetTop
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    haptic.selection()
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
    setActiveSection(id)
  }

  return (
    <>
      {/* Top bar with logo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 safe-area-top">
        <div className="flex items-center justify-center py-3 px-4">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 border border-primary/40 rounded-full" />
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-primary">
                <path
                  d="M12 2C10.5 2 9.5 3 9 4.5C8.5 6 8 8 8 10C8 12 8.5 14 9.5 15.5C10.5 17 11 18 11 19.5C11 20.5 11.5 21.5 12 22C12.5 21.5 13 20.5 13 19.5C13 18 13.5 17 14.5 15.5C15.5 14 16 12 16 10C16 8 15.5 6 15 4.5C14.5 3 13.5 2 12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-serif text-lg font-medium text-foreground">{siteConfig.name}</span>
          </div>
        </div>
      </header>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50 safe-area-bottom">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all duration-300 min-w-[60px]",
                activeSection === item.id
                  ? "bg-primary/10"
                  : "active:bg-muted/50"
              )}
            >
              <NavIcon icon={item.icon} isActive={activeSection === item.id} />
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors duration-300",
                  activeSection === item.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
