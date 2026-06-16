export const tagTypesList = [
  'auth',
  'user',
  'package',
  'hotel',
  'flight',
  'transport',
  'booking',
  'payment',
  'inquiry',
  'blog',
  'faq',
  'testimonial',
  'siteContent',
  'document',
] as const

export type TagType = (typeof tagTypesList)[number]
