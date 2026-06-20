import type { Metadata } from 'next'
import { AuthLayout } from '@/features/auth/components/auth-layout'
import { AuthVisual } from '@/features/auth/components/auth-visual'
import { LoginForm } from '@/features/auth/components/login-form'

export const metadata: Metadata = {
  title: 'সাইন ইন',
  description: 'কাবার পথে অ্যাকাউন্টে সাইন ইন করুন — বুকিং, পেমেন্ট ও ভিসা ট্র্যাক করুন।',
  alternates: { canonical: '/login' },
  robots: { index: false, follow: true },
}

const LOGIN_STATS = [
  { value: '৫০ হাজার+', label: 'হাজী' },
  { value: '৪.৯/৫', label: 'রেটিং' },
  { value: '২৪/৭', label: 'সহায়তা' },
]

export default function LoginPage() {
  return (
    <AuthLayout
      visual={
        <AuthVisual
          title="আপনার পবিত্র যাত্রায় স্বাগতম।"
          description="আপনার বুকিং, ডকুমেন্ট ও পেমেন্ট — সব এক জায়গায় পরিচালনা করুন।"
          gradient="from-amber-400 via-orange-500 to-rose-500"
          stats={LOGIN_STATS}
        />
      }
    >
      <LoginForm />
    </AuthLayout>
  )
}
