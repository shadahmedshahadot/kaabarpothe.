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
    <html lang="bn" className={`${geistSans.variable} ${geistMono.variable} bg-background scroll-smooth`}>
      <body className="font-sans antialiased text-foreground overflow-x-hidden">
         <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  )
}
