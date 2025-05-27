'use client'

import About from "@/app/components/About"
import Contact from "@/app/components/Contact"
import Hero from "@/app/components/Hero"
import Pricing from "@/app/components/Pricing"

export default function LandingClient() {
  // Initialize i18n hook
  // const t = useI18n()

  return (
    <div className="w-full">
      <Hero />
      <About />
      <Pricing />
      <Contact />
    </div>
  )
} 