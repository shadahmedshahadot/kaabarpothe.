export const tagTypesList = [
  'auth',
  'user',
  'package',
  'hotel',
  'flight',
  'transport',
  'booking',
  'payment',
  'invoice',
  'inquiry',
  'blog',
  'faq',
  'testimonial',
  'siteContent',
  'document',
  'notification',
  'bookingMessage',
  'bookingTimeline',
  'bookingDocument',
  'bookingActivity',
] as const

export type TagType = (typeof tagTypesList)[number]
