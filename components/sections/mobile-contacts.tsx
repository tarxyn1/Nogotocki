"use client"

import { siteConfig } from "@/lib/site-config"
import { useTelegram } from "@/components/telegram-provider"

export function MobileContacts() {
  const { haptic, webApp } = useTelegram()

  const handleWhatsApp = () => {
    haptic.impact("medium")
    const url = `https://wa.me/${siteConfig.contacts.whatsapp}?text=${encodeURIComponent("Привет! Хочу записаться на маникюр")}`
    if (webApp) {
      webApp.openLink(url)
    } else {
      window.open(url, "_blank")
    }
  }

  const handleTelegram = () => {
    haptic.impact("medium")
    const url = `https://t.me/${siteConfig.contacts.telegram}`
    if (webApp) {
      webApp.openTelegramLink(url)
    } else {
      window.open(url, "_blank")
    }
  }

  const handlePhone = () => {
    haptic.notification("success")
    window.location.href = `tel:${siteConfig.contacts.phone}`
  }

  return (
    <section id="contacts" className="py-8 pb-28 bg-background">
      <div className="px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-primary/70 font-medium tracking-[0.2em] uppercase text-[10px] mb-2">
            контакты
          </p>
          <h2 className="font-serif text-2xl font-medium text-foreground">Записаться</h2>
        </div>

        {/* Contact buttons */}
        <div className="space-y-3 mb-6">
          {/* WhatsApp */}
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center gap-4 bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl p-4 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-foreground">WhatsApp</p>
              <p className="text-muted-foreground text-sm">Быстрая запись</p>
            </div>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-muted-foreground">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Telegram */}
          <button
            onClick={handleTelegram}
            className="w-full flex items-center gap-4 bg-[#229ED9]/10 border border-[#229ED9]/20 rounded-2xl p-4 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 bg-[#229ED9] rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-foreground">Telegram</p>
              <p className="text-muted-foreground text-sm">@{siteConfig.contacts.telegram}</p>
            </div>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-muted-foreground">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Phone */}
          <button
            onClick={handlePhone}
            className="w-full flex items-center gap-4 bg-primary/10 border border-primary/20 rounded-2xl p-4 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-primary-foreground">
                <path
                  d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.98C20.58 21.01 20.15 21.03 19.72 21.03C10.58 21.03 3.03 13.48 3.03 4.34C3.03 3.91 3.05 3.48 3.08 3.06C3.13 2.5 3.58 2.06 4.14 2.06H7.14C7.6 2.06 7.99 2.39 8.09 2.84L8.8 6.34C8.89 6.74 8.73 7.15 8.4 7.39L6.59 8.79C8.07 11.62 10.38 13.93 13.21 15.41L14.61 13.6C14.85 13.27 15.26 13.11 15.66 13.2L19.16 13.91C19.61 14.01 19.94 14.4 19.94 14.86V16.92H22Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-foreground">Позвонить</p>
              <p className="text-muted-foreground text-sm">{siteConfig.contacts.phone}</p>
            </div>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-muted-foreground">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Location card */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Адрес студии</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {siteConfig.contacts.city}, {siteConfig.contacts.address}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Время работы</p>
              <p className="text-muted-foreground text-sm">{siteConfig.contacts.workingHours}</p>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-muted-foreground/60 text-xs mt-6">
          {siteConfig.name} {new Date().getFullYear()}
        </p>
      </div>
    </section>
  )
}
