export interface Pilgrim {
  id: string
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female'
  nationality: string
  passport: { number: string; issueDate: string; expiryDate: string; country: string }
  address: string
  city: string
  country: string
  avatar: string
  emergencyContact: { name: string; relationship: string; phone: string }
  bookingsCount: number
  totalSpent: number
  joinedDate: string
  documents: { type: string; status: 'pending' | 'uploaded' | 'verified'; uploadedDate?: string }[]
}

export const pilgrims: Pilgrim[] = []

export const getPilgrim = (id: string) => pilgrims.find(p => p.id === id)
