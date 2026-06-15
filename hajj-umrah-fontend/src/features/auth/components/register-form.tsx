'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { Input, Label } from '@/components/ui/input'
import { SocialAuthButtons } from './social-buttons'
import { ROUTES } from '@/constants'

export function RegisterForm() {
  const [showPwd, setShowPwd] = useState(false)
  return (
    <>
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 tracking-tight">
        অ্যাকাউন্ট তৈরি করুন
      </h2>
      <p className="text-muted-foreground mb-8">৩০ সেকেন্ড লাগে। ক্রেডিট কার্ড লাগবে না।</p>

      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="নামের প্রথম অংশ" icon={<User className="w-4 h-4" />}>
            <Input required placeholder="আহমাদ" className="h-12 pl-10" />
          </Field>
          <Field label="নামের শেষাংশ" icon={<User className="w-4 h-4" />}>
            <Input required placeholder="হাসান" className="h-12 pl-10" />
          </Field>
        </div>

        <Field label="ইমেইল" icon={<Mail className="w-4 h-4" />}>
          <Input type="email" required placeholder="you@email.com" className="h-12 pl-10" />
        </Field>

        <Field label="পাসওয়ার্ড" icon={<Lock className="w-4 h-4" />}>
          <Input
            type={showPwd ? 'text' : 'password'}
            required
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="h-12 pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPwd(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPwd ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখান'}
          >
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </Field>

        <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer pt-1">
          <input
            type="checkbox"
            required
            className="w-4 h-4 rounded border-border mt-0.5 accent-primary"
          />
          <span>
            আমি সম্মত{' '}
            <Link href={ROUTES.terms} className="text-primary hover:underline">
              শর্তাবলী
            </Link>{' '}
            ও{' '}
            <Link href={ROUTES.privacy} className="text-primary hover:underline">
              গোপনীয়তা নীতিতে
            </Link>
          </span>
        </label>

        <button
          type="submit"
          className="group relative w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center justify-center gap-2 transition-all"
        >
          অ্যাকাউন্ট তৈরি করুন
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>

      <SocialAuthButtons />

      <p className="mt-8 text-sm text-center text-muted-foreground">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
        <Link href={ROUTES.login} className="text-primary font-semibold hover:underline">
          সাইন ইন
        </Link>
      </p>
    </>
  )
}

function Field({
  label,
  icon,
  children,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          {icon}
        </span>
        {children}
      </div>
    </div>
  )
}
