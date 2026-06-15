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

export const inquiries: Inquiry[] = [
  { id: 'inq-001', name: 'হাসান মাহমুদ', email: 'hassan.m@email.com', phone: '+880 1555-123456', type: 'package', subject: 'প্রিমিয়াম হজ্জ ২০২৬ সম্পর্কে প্রশ্ন', message: 'আমি আমার বয়স্ক পিতামাতার (৭৫ এবং ৭০) সাথে ভ্রমণ করছি। আপনারা কি হুইলচেয়ার-অ্যাক্সেসিবল মিনা তাঁবু অফার করেন? নিকটতম হোটেল অপশন কী?', packageRef: 'pkg-hajj-premium', status: 'in-progress', priority: 'high', createdDate: '2026-06-12T08:30:00' },
  { id: 'inq-002', name: 'লায়লা মোহাম্মদ', email: 'layla.m@email.com', phone: '+880 1712-901234', type: 'consultation', subject: 'প্রথমবারের উমরাহ পরামর্শ', message: 'আমি ৩২ বছর বয়সী এবং প্রথমবার উমরাহ করতে চাই। কেউ কি আমাকে প্রক্রিয়াটি ব্যাখ্যা করতে পারেন এবং সঠিক প্যাকেজ সুপারিশ করতে পারেন?', status: 'new', priority: 'medium', createdDate: '2026-06-12T14:15:00' },
  { id: 'inq-003', name: 'মরিয়ম আলি', email: 'm.ali@email.com', phone: '+880 1416-557788', type: 'package', subject: '২৫ জনের জন্য গ্রুপ বুকিং', message: 'আমাদের ইসলামিক সেন্টার মার্চ ২০২৬-এ উমরাহর জন্য ২৫ জনের একটি গ্রুপ বুক করতে চায়। কী গ্রুপ ডিসকাউন্ট উপলব্ধ?', packageRef: 'pkg-umrah-economy', status: 'responded', priority: 'high', createdDate: '2026-06-10T11:20:00' },
  { id: 'inq-004', name: 'বিলাল আহমদ', email: 'b.ahmad@email.com', phone: '+880 1412-349876', type: 'consultation', subject: 'মাল্টি-সিটি ভ্রমণসূচি', message: 'উমরাহকে ইস্তাম্বুল এবং জর্ডানের স্টপের সাথে একত্রিত করার চেষ্টা করছি। ২১-দিনের ভ্রমণসূচির পরিকল্পনায় সাহায্য প্রয়োজন।', status: 'in-progress', priority: 'low', createdDate: '2026-06-09T09:50:00' },
  { id: 'inq-005', name: 'সুমাইয়া খান', email: 's.khan@email.com', phone: '+880 1712-905566', type: 'general', subject: 'টিকার প্রয়োজনীয়তার আপডেট', message: '২০২৬ হজ্জের জন্য মেনিনজাইটিস টিকার প্রয়োজনীয়তা কি পরিবর্তিত হয়েছে? মেডিকেল রেকর্ডের জন্য স্পষ্টীকরণ প্রয়োজন।', status: 'responded', priority: 'medium', createdDate: '2026-06-08T13:10:00' },
  { id: 'inq-006', name: 'খালিদ রশিদ', email: 'k.rasheed@email.com', phone: '+880 1713-552233', type: 'package', subject: 'ভিআইপি হজ্জ প্রাপ্যতা', message: 'ভিআইপি হজ্জ ২০২৬ প্যাকেজে কি এখনও সিট পাওয়া যাচ্ছে? আমি দুটি পাশাপাশি একক স্যুট খুঁজছি।', packageRef: 'pkg-hajj-vip', status: 'in-progress', priority: 'high', createdDate: '2026-06-07T18:25:00' },
  { id: 'inq-007', name: 'ফাতিমা সালিম', email: 'f.saleem@email.com', phone: '+880 1611-554477', type: 'consultation', subject: 'শুধুমাত্র মহিলা উমরাহ গ্রুপ', message: 'এপ্রিলে প্রস্থানকারী একটি শুধুমাত্র মহিলা উমরাহ গ্রুপ খুঁজছি। এটি কি সম্ভব?', status: 'new', priority: 'medium', createdDate: '2026-06-12T07:00:00' },
]
