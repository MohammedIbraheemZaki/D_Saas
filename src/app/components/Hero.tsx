"use client"

import { useState, useEffect } from 'react'
import { useI18n } from '@/i18n/client'
import Button from '@/app/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const t = useI18n()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: t('hero.slide1.title'),
      description: t('hero.slide1.description'),
      image: 'https://picsum.photos/200/200?random=1',
    },
    {
      title: t('hero.slide2.title'),
      description: t('hero.slide2.description'),
      image: 'https://picsum.photos/200/200?random=2',
    },
    {
      title: t('hero.slide3.title'),
      description: t('hero.slide3.description'),
      image: 'https://picsum.photos/200/200?random=3',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
            <Image src={slide.image} alt={slide.title} fill />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                  {slide.title}
                </h1>
                <p className="text-xl sm:text-2xl mb-8">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="primary">
                    {t('hero.getStarted')}
                  </Button>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      
    </section>
  )
}