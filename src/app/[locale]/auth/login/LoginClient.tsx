'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useI18n, useCurrentLocale } from '@/i18n/client'
import { Input } from '@/app/components/ui/Input'
import Button from '@/app/components/ui/Button'
import { useAuthStore } from '@/store/authStore'

export default function LoginClient() {
  const t = useI18n()
  const locale = useCurrentLocale()
  const router = useRouter()
  const { login, isLoading } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear validation errors when user types
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const errors = {
      email: '',
      password: '',
    }
    let isValid = true

    if (!formData.email) {
      errors.email = t('errors.required').replace('{field}', t('auth.email'))
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('errors.emailFormat')
      isValid = false
    }

    if (!formData.password) {
      errors.password = t('errors.required').replace('{field}', t('auth.password'))
      isValid = false
    }

    setValidationErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    try {
      await login(formData.email, formData.password)
      router.push(`/${locale}`)
    } catch {
      // Error is handled in the auth store
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">{t('auth.login')}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          name="email"
          type="email"
          label={t('auth.email')}
          value={formData.email}
          onChange={handleChange}
          error={validationErrors.email}
          placeholder="john@example.com"
        />
        <Input
          id="password"
          name="password"
          type="password"
          label={t('auth.password')}
          value={formData.password}
          onChange={handleChange}
          error={validationErrors.password}
        />
        <div className="mb-4 text-right">
          <Link href={`/${locale}/auth/forgot-password`} className="text-sm text-blue-600 hover:underline">
            {t('auth.forgotPassword')}
          </Link>
        </div>
        <Button type="submit" fullWidth isLoading={isLoading}>
          {t('auth.login')}
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p>
          {t('auth.dontHaveAccount')}{' '}
          <Link href={`/${locale}/auth/register`} className="text-blue-600 hover:underline">
            {t('auth.signUp')}
          </Link>
        </p>
      </div>
    </div>
  )
} 