export interface Testimonial {
  id: string
  name: string
  location: string
  packageName: string
  rating: number
  date: string
  content: string
  avatar: string
  verified: boolean
  featured: boolean
}

export const testimonials: Testimonial[] = []

export const getFeaturedTestimonials = () => testimonials.filter(t => t.featured)
