import type { Metadata } from 'next'
import { AuthLayout } from '@/features/auth/components/auth-layout'
import { AuthVisual } from '@/features/auth/components/auth-visual'
import { RegisterForm } from '@/features/auth/components/register-form'

export const metadata: Metadata = { title: 'অ্যাকাউন্ট তৈরি' }

const REGISTER_BULLETS = [
  'পরে তুলনার জন্য প্যাকেজ সংরক্ষণ করুন',
  'ব্যক্তিগতকৃত সুপারিশ পান',
  '২৪/৭ বহুভাষিক আলেম সহায়তা',
  'বুকিং ও পেমেন্ট ট্র্যাক করুন',
]

export default function RegisterPage() {
  return (
    <AuthLayout
      visual={
        <AuthVisual
          title="আজই আপনার যাত্রা শুরু করুন।"
          description="ফ্রি অ্যাকাউন্ট। কোনো প্রতিশ্রুতি নেই। প্যাকেজ সংরক্ষণ করুন, ব্যক্তিগতকৃত কোট পান এবং আমাদের আলেম দলের সাথে চ্যাট করুন।"
          gradient="from-emerald-400 via-teal-500 to-cyan-600"
          pattern="dots"
          bullets={REGISTER_BULLETS}
        />
      }
    >
      <RegisterForm />
    </AuthLayout>
  )
}
