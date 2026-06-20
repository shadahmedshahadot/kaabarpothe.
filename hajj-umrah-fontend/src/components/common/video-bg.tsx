'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  videoId: string
  fallbackImage?: string
  className?: string
}

export function YouTubeVideoBackground({ videoId, fallbackImage, className = '' }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 400)
    return () => clearTimeout(t)
  }, [])

  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&fs=0&cc_load_policy=0`

  return (
    <div
      className={`absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full overflow-hidden pointer-events-none ${className}`}
    >
      {fallbackImage && (
        <div
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-700 ${loaded ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100vw,177.77vh)] h-[max(100vh,56.25vw)]">
        <iframe
          ref={iframeRef}
          src={src}
          title="Background video"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          frameBorder={0}
          className="absolute inset-0 w-full h-full"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  )
}
