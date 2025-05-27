'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useI18n, useCurrentLocale } from '@/i18n/client'
import { useAuthStore } from '@/store/authStore'
import { Input } from '@/app/components/ui/Input'
import Button from '@/app/components/ui/Button'

// Loading component
function Loading() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

export default function ProfileClient() {
  const t = useI18n()
  const locale = useCurrentLocale()
  const router = useRouter()
  const { user, isLoading, error, updateProfile, isAuthenticated } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')
  
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // if (mounted && !isLoading && !isAuthenticated) {
    //   router.push(`/${locale}/auth/login`)
    // }
    
    // Initialize form data when user is loaded
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      })
    }
  }, [mounted, isAuthenticated, isLoading, user, router, locale])
  
  // Don't render anything until the component is mounted
  if (!mounted) {
    return <Loading />
  }

  // Show loading state
  if (isLoading) {
    return <Loading />
  }

  // Show not authenticated state
  // if (!isAuthenticated || !user) {
  //   return null // Will redirect in useEffect
  // }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
    setPasswordError('')
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await updateProfile({
        name: formData.name,
      })
      setIsEditing(false)
    } catch (error) {
      console.log(error)
      // Error handling is done in the store
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError(t('errors.passwordMatch'))
      return
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError(t('errors.passwordLength'))
      return
    }
    
    try {
      // TODO: Implement password update
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setIsEditingPassword(false)
    } catch (error) {
      setPasswordError('Failed to update password')
      console.log(error)
    }
  }
  
  const toggleEditMode = () => {
    if (isEditing) {
      // Reset form data if canceling edit
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
      })
    }
    setIsEditing(!isEditing)
  }

  const togglePasswordEditMode = () => {
    if (isEditingPassword) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setPasswordError('')
    }
    setIsEditingPassword(!isEditingPassword)
  }
  
  return (
    <div className="max-w-2xl mx-auto min-h-[calc(100vh-216px)]">
      <div className="bg-white p-8 rounded-lg shadow-md mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t('profile.yourProfile')}</h1>
          <div className="flex gap-2">
            <Link href={`/${locale}/admin`}>
              <Button variant="outline" className='cursor-pointer'>
                {t('profile.admin')}
              </Button>
            </Link>
            <Link href={`/${locale}/user`}>
              <Button variant="outline" className='cursor-pointer'>
                {t('profile.user')}
              </Button>
            </Link>
            <Button 
              variant={isEditing ? 'outline' : 'primary'} 
              onClick={toggleEditMode}
              className='cursor-pointer'
            >
              {isEditing ? t('profile.cancel') : t('profile.edit')}
            </Button>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <Input
              id="name"
              name="name"
              type="text"
              label={t('profile.name')}
              value={formData.name}
              onChange={handleChange}
            />
            
            <Input
              id="email"
              name="email"
              type="email"
              label={t('profile.email')}
              value={formData.email}
              onChange={handleChange}
              className="opacity-70"
            />
            
            <div className="mt-6">
              <Button type="submit" isLoading={isLoading} className='cursor-pointer'>
                {t('profile.save')}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('profile.name')}</h3>
              <p className="mt-1 text-lg">{user?.name || "user name"}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('profile.email')}</h3>
              <p className="mt-1 text-lg">{user?.email || "user@example.com"}</p>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{t('profile.password')}</h3>
                <Button 
                  variant={isEditingPassword ? 'outline' : 'primary'} 
                  onClick={togglePasswordEditMode}
                  className='cursor-pointer'
                >
                  {isEditingPassword ? t('profile.cancel') : t('profile.changePassword')}
                </Button>
              </div>

              {isEditingPassword ? (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    label={t('profile.currentPassword')}
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                  
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    label={t('profile.newPassword')}
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                  
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label={t('profile.confirmPassword')}
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    error={passwordError}
                  />
                  
                  <Button type="submit" isLoading={isLoading}>
                    {t('profile.updatePassword')}
                  </Button>
                </form>
              ) : (
                <p className="text-muted-foreground">••••••••</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 