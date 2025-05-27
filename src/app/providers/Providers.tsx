'use client'

import { ReactNode } from 'react'
import { I18nProviderClient } from '@/i18n/client'

interface ProvidersProps {
  children: ReactNode
  locale: string
}

export default function Providers({ children, locale }: ProvidersProps) {
  return (
    <I18nProviderClient locale={locale as 'en' | 'ar'}>
      {children}
    </I18nProviderClient>
  )
} 