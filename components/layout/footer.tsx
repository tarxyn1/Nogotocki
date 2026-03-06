import { siteConfig } from "@/lib/site-config"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 border border-primary/40 rounded-full" />
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-4 h-4 text-primary"
              >
                <path 
                  d="M12 2C10.5 2 9.5 3 9 4.5C8.5 6 8 8 8 10C8 12 8.5 14 9.5 15.5C10.5 17 11 18 11 19.5C11 20.5 11.5 21.5 12 22C12.5 21.5 13 20.5 13 19.5C13 18 13.5 17 14.5 15.5C15.5 14 16 12 16 10C16 8 15.5 6 15 4.5C14.5 3 13.5 2 12 2Z" 
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-medium text-foreground">{siteConfig.name}</span>
              <span className="text-[8px] tracking-[0.2em] uppercase text-muted-foreground -mt-1">маникюр и педикюр</span>
            </div>
          </div>
          
          {/* Contact */}
          <p className="text-muted-foreground text-sm">{siteConfig.contacts.workingHours}</p>
          
          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            {currentYear} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
