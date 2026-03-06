"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
}

interface TelegramWebApp {
  ready: () => void
  expand: () => void
  close: () => void
  enableClosingConfirmation: () => void
  disableClosingConfirmation: () => void
  setHeaderColor: (color: string) => void
  setBackgroundColor: (color: string) => void
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    show: () => void
    hide: () => void
    enable: () => void
    disable: () => void
    setText: (text: string) => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
  }
  BackButton: {
    isVisible: boolean
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
  }
  HapticFeedback: {
    impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void
    notificationOccurred: (type: "error" | "success" | "warning") => void
    selectionChanged: () => void
  }
  initDataUnsafe: {
    user?: TelegramUser
  }
  colorScheme: "light" | "dark"
  themeParams: {
    bg_color?: string
    text_color?: string
    hint_color?: string
    link_color?: string
    button_color?: string
    button_text_color?: string
    secondary_bg_color?: string
  }
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void
  openTelegramLink: (url: string) => void
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

interface TelegramContextType {
  webApp: TelegramWebApp | null
  user: TelegramUser | null
  colorScheme: "light" | "dark"
  isReady: boolean
  haptic: {
    impact: (style?: "light" | "medium" | "heavy" | "rigid" | "soft") => void
    notification: (type?: "error" | "success" | "warning") => void
    selection: () => void
  }
}

const TelegramContext = createContext<TelegramContextType>({
  webApp: null,
  user: null,
  colorScheme: "dark",
  isReady: false,
  haptic: {
    impact: () => {},
    notification: () => {},
    selection: () => {},
  },
})

export const useTelegram = () => useContext(TelegramContext)

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const app = window.Telegram?.WebApp
    if (app) {
      app.ready()
      app.expand()
      app.setHeaderColor("#1a1a1a")
      app.setBackgroundColor("#121212")
      setWebApp(app)
      setIsReady(true)
    } else {
      // Fallback for browser preview
      setIsReady(true)
    }
  }, [])

  const haptic = {
    impact: (style: "light" | "medium" | "heavy" | "rigid" | "soft" = "light") => {
      webApp?.HapticFeedback?.impactOccurred(style)
    },
    notification: (type: "error" | "success" | "warning" = "success") => {
      webApp?.HapticFeedback?.notificationOccurred(type)
    },
    selection: () => {
      webApp?.HapticFeedback?.selectionChanged()
    },
  }

  return (
    <TelegramContext.Provider
      value={{
        webApp,
        user: webApp?.initDataUnsafe?.user || null,
        colorScheme: webApp?.colorScheme || "dark",
        isReady,
        haptic,
      }}
    >
      {children}
    </TelegramContext.Provider>
  )
}
