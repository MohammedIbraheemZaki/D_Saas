'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useI18n, useChangeLocale, useCurrentLocale } from '@/i18n/client'
import { useAuthStore } from '@/store/authStore'
import Image from 'next/image'
import Cookies from 'js-cookie'
import Logo from '../../../public/logo.svg'

export default function Navbar() {
  const t = useI18n()
  const pathname = usePathname()
  const router = useRouter()
  const changeLocale = useChangeLocale()
  const locale = useCurrentLocale()
  const { isAuthenticated, logout } = useAuthStore()

  // Extract the path without the locale prefix to use for language switching
  const pathWithoutLocale = pathname.split('/').slice(2).join('/')
  
  // Function to handle language change
  const handleLanguageChange = async (newLocale: 'en' | 'ar') => {
    try {
      // Set the cookie first
      Cookies.set('NEXT_LOCALE', newLocale, { 
        expires: 365,
        path: '/',
        sameSite: 'lax'
      })
      
      // Change the locale using next-international
      await changeLocale(newLocale)
      
      // Update the URL to reflect the new locale
      const newPath = `/${newLocale}/${pathWithoutLocale}`
      router.push(newPath)
      
      // Force a page reload to ensure all components update
      window.location.href = newPath
    } catch (error) {
      console.error('Error changing language:', error)
    }
  }

  return (
    <nav className="bg-gray-800 text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex-shrink-0">
              <Image 
                src={Logo} 
                alt="logo" 
                width={200} 
                height={32} 
                priority
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative group">
              <button 
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-700"
                onClick={() => document.querySelector('.language-dropdown')?.classList.toggle('hidden')}
              >
                <span>{t('common.language')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 language-dropdown hidden z-10">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${locale === 'en' ? 'font-bold bg-gray-100' : ''}`}
                >
                  {t('common.english')}
                </button>
                <button
                  onClick={() => handleLanguageChange('ar')}
                  className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${locale === 'ar' ? 'font-bold bg-gray-100' : ''}`}
                >
                  {t('common.arabic')}
                </button>
              </div>
            </div>

            {/* Authentication Links */}
            {isAuthenticated ? (
              <>
                <Link href={`/${locale}/profile`} className="hover:text-gray-300">
                  {t('profile.title')}
                </Link>
                <button 
                  onClick={() => logout()} 
                  className="hover:text-gray-300"
                >
                  {t('auth.logout')}
                </button>
              </>
            ) : (
              <>
                <Link href={`/${locale}/auth/login`} className="hover:text-gray-300">
                  {t('auth.login')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 