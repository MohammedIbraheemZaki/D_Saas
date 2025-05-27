'use client'

import Hero from '../components/Hero'
import About from '../components/About'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
// import { useI18n } from '@/i18n/client'

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