import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LOGO_ALT } from '@/constants'
import logo from '../../../image/logo.jpeg'

interface LogoProps {
  href?: string | null
  variant?: 'light' | 'dark'
  showText?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
  xl: 'h-16',
}

export function Logo({
  href = '/',
  size = 'md',
  className,
}: LogoProps) {
  const heightClass = sizeMap[size]
  const inner = (
    <span className={cn('inline-flex items-center group', className)}>
      <span
        className={cn(
          'relative shrink-0 transition-transform duration-300 group-hover:scale-[1.03]',
          heightClass,
          'aspect-[1019/388]',
        )}
      >
        <Image
          src={logo}
          alt={LOGO_ALT}
          // fill
          width="500"
          height="100"
          className="object-contain"
          priority
        />
      </span>
    </span>
  )
  if (href === null) return inner
  return <Link href={href} aria-label={LOGO_ALT}>{inner}</Link>
}
