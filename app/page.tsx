"use client"

import { MobileHeader } from "@/components/layout/mobile-header"
import { MobileHero } from "@/components/sections/mobile-hero"
import { MobileServices } from "@/components/sections/mobile-services"
import { MobileGallery } from "@/components/sections/mobile-gallery"
import { MobileReviews } from "@/components/sections/mobile-reviews"
import { MobileContacts } from "@/components/sections/mobile-contacts"

export default function HomePage() {
  return (
    <>
      <MobileHeader />
      <main className="pt-14 pb-16">
        <MobileHero />
        <MobileServices />
        <MobileGallery />
        <MobileReviews />
        <MobileContacts />
      </main>
    </>
  )
}
