"use client"

import { siteConfig } from "@/lib/site-config"
import { MessageCircle } from "lucide-react"

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={`https://wa.me/${siteConfig.contacts.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-sm font-medium tracking-wider uppercase shadow-lg transition-all hover:scale-105"
        aria-label="Записаться в WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Записаться</span>
      </a>
    </div>
  )
}
