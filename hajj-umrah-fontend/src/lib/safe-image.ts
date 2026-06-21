const PLACEHOLDER = '/img/placeholder.svg'

export const FALLBACK_IMAGES = [PLACEHOLDER]

export const safeImage = (src: string | undefined | null, _seed?: string): string => {
  if (!src || typeof src !== 'string') return PLACEHOLDER
  if (src.startsWith('http://') || src.startsWith('https://')) return src
  if (src.startsWith('data:') || src.startsWith('blob:')) return src
  if (src.startsWith('/img/')) return src
  if (src.startsWith('/')) return PLACEHOLDER
  return src
}
