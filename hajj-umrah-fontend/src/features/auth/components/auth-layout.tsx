import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/common/logo'

export function AuthLayout({
  visual,
  children,
}: {
  visual: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-page-canvas">
      {visual}
      <div className="relative flex flex-col bg-page-canvas">
        <span className="pointer-events-none absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-primary/5 blur-3xl -z-0 hidden lg:block" />
        <span className="pointer-events-none absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-amber-400/5 blur-3xl -z-0 hidden lg:block" />

        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-border bg-card/40 backdrop-blur">
          <Logo href="/" showText size="sm" />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> হোম
          </Link>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-sm">
            <Link
              href="/"
              className="hidden lg:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> সাইটে ফিরে যান
            </Link>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
