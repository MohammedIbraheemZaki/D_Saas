'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useI18n, useCurrentLocale } from '@/i18n/client'
import { Input } from '@/app/components/ui/Input'
import Button from '@/app/components/ui/Button'

export default function ForgotPasswordClient() {
  const t = useI18n()
  const locale = useCurrentLocale()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError(t('errors.required').replace('{field}', t('auth.email')))
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t('errors.emailFormat'))
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // In a real app, you'd make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
    } catch (error) {
      setError((error as string) || 'An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">{t('auth.forgotPassword')}</h1>
      {isSubmitted ? (
        <div className="text-center">
          <div className="mb-4 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="mb-6">
            {t('auth.forgotPasswordSuccess') || 'If an account exists with the email you provided, we have sent password reset instructions.'}
          </p>
          <Link 
            href={`/${locale}/auth/login`} 
            className="text-blue-600 hover:underline"
          >
            {t('auth.login')}
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-6 text-gray-600">
            {t('auth.forgotPasswordInstructions') || 'Enter your email address and we will send you instructions to reset your password.'}
          </p>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              label={t('auth.email')}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              error={error}
              placeholder="john@example.com"
            />
            <Button type="submit" fullWidth isLoading={isLoading} className='cursor-pointer mt-4'>
              {t('auth.resetPassword')}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link 
              href={`/${locale}/auth/login`} 
              className="text-blue-600 hover:underline"
            >
              {t('auth.login')}
            </Link>
          </div>
        </>
      )}
    </div>
  )
} 