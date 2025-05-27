'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useI18n, useCurrentLocale } from '@/i18n/client'
import { useAuthStore } from '@/store/authStore'
import { Input } from '@/app/components/ui/Input'
import Button from '@/app/components/ui/Button'

export default function RegisterClient() {
  const t = useI18n()
  const locale = useCurrentLocale()
  const router = useRouter()
  const { register, isLoading } = useAuthStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
    let isValid = true

    if (!formData.name) {
      errors.name = t('errors.required').replace('{field}', t('auth.name'))
      isValid = false
    }

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
    } else if (formData.password.length < 6) {
      errors.password = t('errors.passwordLength')
      isValid = false
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = t('errors.required').replace('{field}', t('auth.confirmPassword'))
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t('errors.passwordMatch')
      isValid = false
    }

    setValidationErrors(errors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      await register(formData.name, formData.email, formData.password)
      router.push(`/${locale}`)
    } catch {
      // Error is handled in the auth store
    }
  }
  
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">{t('auth.register')}</h1>
      
      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          name="name"
          type="text"
          label={t('auth.name')}
          value={formData.name}
          onChange={handleChange}
          error={validationErrors.name}
          placeholder="John Doe"
        />
        
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
        
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label={t('auth.confirmPassword')}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={validationErrors.confirmPassword}
        />
        
        <Button type="submit" className="mt-4" fullWidth isLoading={isLoading}>
          {t('auth.register')}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p>
          {t('auth.alreadyHaveAccount')}{' '}
          <Link href={`/${locale}/auth/login`} className="text-blue-600 hover:underline">
            {t('auth.login')}
          </Link>
        </p>
      </div>
    </div>
  )
} 