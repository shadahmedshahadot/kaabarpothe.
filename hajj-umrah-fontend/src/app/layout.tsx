import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Safelist } from '@/components/common/safelist'
import { rootMetadata, rootViewport } from '@/constants/metadata'
import GlobalProvider from '@/providers/globalProvider'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata = rootMetadata
export const viewport = rootViewport

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn-BD" dir="ltr" className={`${geistSans.variable} ${geistMono.variable} bg-background scroll-smooth`}>
      <body className="font-sans antialiased text-foreground overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-foreground focus:text-background focus:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          মূল কন্টেন্টে যান
        </a>
        <GlobalProvider>{children}</GlobalProvider>
        <Analytics />
      </body>
    </html>
  )
}
