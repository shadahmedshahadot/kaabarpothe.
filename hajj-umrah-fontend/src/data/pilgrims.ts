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

export const pilgrims: Pilgrim[] = [
  { id: 'p-001', fullName: 'মোহাম্মদ আনোয়ার', email: 'm.anwar@email.com', phone: '+880 1711-552341', dateOfBirth: '1978-05-12', gender: 'male', nationality: 'বাংলাদেশী', passport: { number: 'A12345678', issueDate: '2021-08-15', expiryDate: '2031-08-14', country: 'বাংলাদেশ' }, address: '২৪৫ ধানমন্ডি, সড়ক ৫', city: 'ঢাকা', country: 'বাংলাদেশ', avatar: 'from-blue-400 to-indigo-500', emergencyContact: { name: 'খাদিজা আনোয়ার', relationship: 'স্ত্রী', phone: '+880 1711-552342' }, bookingsCount: 3, totalSpent: 38497, joinedDate: '2022-04-10', documents: [{ type: 'পাসপোর্ট', status: 'verified', uploadedDate: '2025-11-20' }, { type: 'ছবি', status: 'verified', uploadedDate: '2025-11-20' }, { type: 'টিকার সনদ', status: 'verified', uploadedDate: '2025-11-25' }] },
  { id: 'p-002', fullName: 'আয়েশা খান', email: 'aisha.khan@email.com', phone: '+880 1712-900123', dateOfBirth: '1992-09-22', gender: 'female', nationality: 'বাংলাদেশী', passport: { number: 'BD987654321', issueDate: '2020-03-10', expiryDate: '2030-03-09', country: 'বাংলাদেশ' }, address: '১২ গুলশান এভিনিউ', city: 'ঢাকা', country: 'বাংলাদেশ', avatar: 'from-rose-400 to-pink-500', emergencyContact: { name: 'ইমরান খান', relationship: 'ভাই', phone: '+880 1712-900124' }, bookingsCount: 1, totalSpent: 1749, joinedDate: '2025-11-15', documents: [{ type: 'পাসপোর্ট', status: 'verified', uploadedDate: '2025-12-08' }, { type: 'ছবি', status: 'verified', uploadedDate: '2025-12-08' }, { type: 'টিকার সনদ', status: 'verified', uploadedDate: '2025-12-10' }] },
  { id: 'p-003', fullName: 'ইউসুফ গার্সিয়া', email: 'y.garcia@email.com', phone: '+880 1832-559912', dateOfBirth: '1965-02-08', gender: 'male', nationality: 'বাংলাদেশী', passport: { number: 'BD87654321', issueDate: '2022-11-20', expiryDate: '2032-11-19', country: 'বাংলাদেশ' }, address: '৮৯১০ আগ্রাবাদ বাণিজ্যিক এলাকা', city: 'চট্টগ্রাম', country: 'বাংলাদেশ', avatar: 'from-emerald-400 to-teal-500', emergencyContact: { name: 'লায়লা গার্সিয়া', relationship: 'স্ত্রী', phone: '+880 1832-559913' }, bookingsCount: 4, totalSpent: 78498, joinedDate: '2019-07-22', documents: [{ type: 'পাসপোর্ট', status: 'verified', uploadedDate: '2025-10-12' }, { type: 'ছবি', status: 'verified', uploadedDate: '2025-10-12' }, { type: 'টিকার সনদ', status: 'verified', uploadedDate: '2025-10-15' }, { type: 'মেডিকেল চিঠি', status: 'verified', uploadedDate: '2025-10-15' }] },
  { id: 'p-004', fullName: 'হাফসা বিলাল', email: 'h.bilal@email.com', phone: '+880 1416-553344', dateOfBirth: '1985-11-30', gender: 'female', nationality: 'বাংলাদেশী', passport: { number: 'BD1234567', issueDate: '2023-05-15', expiryDate: '2033-05-14', country: 'বাংলাদেশ' }, address: '৪৫০ উত্তরা সেক্টর ৭', city: 'ঢাকা', country: 'বাংলাদেশ', avatar: 'from-violet-400 to-purple-500', emergencyContact: { name: 'বিলাল হাফসা', relationship: 'স্বামী', phone: '+880 1416-553345' }, bookingsCount: 2, totalSpent: 20198, joinedDate: '2023-12-05', documents: [{ type: 'পাসপোর্ট', status: 'verified', uploadedDate: '2025-09-30' }, { type: 'ছবি', status: 'verified', uploadedDate: '2025-09-30' }, { type: 'টিকার সনদ', status: 'verified', uploadedDate: '2025-10-02' }] },
  { id: 'p-005', fullName: 'ইব্রাহিম দিওপ', email: 'i.diop@email.com', phone: '+880 1612-345678', dateOfBirth: '1972-04-18', gender: 'male', nationality: 'বাংলাদেশী', passport: { number: 'BD12345678', issueDate: '2020-07-10', expiryDate: '2030-07-09', country: 'বাংলাদেশ' }, address: '৩৪ পান্থপথ রোড', city: 'ঢাকা', country: 'বাংলাদেশ', avatar: 'from-amber-400 to-orange-500', emergencyContact: { name: 'ফাতু দিওপ', relationship: 'স্ত্রী', phone: '+880 1612-345679' }, bookingsCount: 2, totalSpent: 27246, joinedDate: '2020-11-12', documents: [{ type: 'পাসপোর্ট', status: 'verified', uploadedDate: '2025-09-15' }, { type: 'ছবি', status: 'verified', uploadedDate: '2025-09-15' }, { type: 'টিকার সনদ', status: 'verified', uploadedDate: '2025-09-20' }] },
]

export const getPilgrim = (id: string) => pilgrims.find(p => p.id === id)
