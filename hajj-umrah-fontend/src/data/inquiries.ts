export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  type: 'general' | 'package' | 'consultation'
  subject: string
  message: string
  packageRef?: string
  status: 'new' | 'in-progress' | 'responded' | 'closed'
  priority: 'low' | 'medium' | 'high'
  createdDate: string
}

export const inquiries: Inquiry[] = []
