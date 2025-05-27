'use client';

import { useI18n } from '@/i18n/client'
import Image from 'next/image'
import { Zap, BarChart, Users } from 'lucide-react'

export default function About() {
  const t = useI18n()

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: t('about.feature1.title'),
      description: t('about.feature1.description'),
      bgColor: 'bg-blue-100',
    },
    {
      icon: <BarChart className="w-8 h-8 text-green-600" />,
      title: t('about.feature2.title'),
      description: t('about.feature2.description'),
      bgColor: 'bg-green-100',
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: t('about.feature3.title'),
      description: t('about.feature3.description'),
      bgColor: 'bg-purple-100',
    },
  ]

  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      image: 'https://picsum.photos/200/200?random=1',
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      image: 'https://picsum.photos/200/200?random=2',
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Developer',
      image: 'https://picsum.photos/200/200?random=3',
    },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('about.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('about.leaders')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}