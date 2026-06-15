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

export const testimonials: Testimonial[] = [
  {
    id: 'tst-001',
    name: 'মোহাম্মদ আনোয়ার',
    location: 'ঢাকা, বাংলাদেশ',
    packageName: 'প্রিমিয়াম হজ্জ ২০২৬',
    rating: 5,
    date: '2025-12-08',
    content: 'সুবহানাল্লাহ, কল্পনার চেয়ে বেশি সুসংগঠিত হজ্জ। আমাদের গ্রুপ পরিচালনাকারী শায়খ আহমাদ ছিলেন জ্ঞানী ও বিনয়ী। হোটেল হারাম থেকে ৫০ মিটার দূরে এবং মিনার তাঁবু প্রত্যাশার চেয়ে ভালো। প্রতিটি টাকা সার্থক।',
    avatar: 'from-blue-400 to-indigo-500',
    verified: true, featured: true,
  },
  {
    id: 'tst-002',
    name: 'আয়েশা খান',
    location: 'চট্টগ্রাম, বাংলাদেশ',
    packageName: 'ইকোনমি উমরাহ',
    rating: 5,
    date: '2025-11-22',
    content: 'প্রথম উমরাহ ও একা ভ্রমণে নার্ভাস ছিলাম। ফাতিমা ভিসা থেকে ফেরা পর্যন্ত সব নিরবচ্ছিন্ন করেছেন। সম্পূর্ণ নারী গ্রুপ ছিল চমৎকার অভিজ্ঞতা। প্রথমবার যাচ্ছেন এমন বোনদের জন্য সুপারিশ করছি।',
    avatar: 'from-rose-400 to-pink-500',
    verified: true, featured: true,
  },
  {
    id: 'tst-003',
    name: 'ইউসুফ গার্সিয়া',
    location: 'সিলেট, বাংলাদেশ',
    packageName: 'ভিআইপি হজ্জ ২০২৬',
    rating: 5,
    date: '2025-12-15',
    content: 'বছরের পর বছর তিনবার হজ্জ করেছি। ছোট গ্রুপের আকার ও ৫-তারকা ব্যবস্থাপনার কারণে এটি ছিল সবচেয়ে আধ্যাত্মিকভাবে নিবেদিত। ব্যক্তিগত আলেম, প্রাইভেট পরিবহন — নিখুঁত।',
    avatar: 'from-emerald-400 to-teal-500',
    verified: true, featured: true,
  },
  {
    id: 'tst-004',
    name: 'হাফসা বিলাল',
    location: 'রাজশাহী, বাংলাদেশ',
    packageName: 'লাক্সারি উমরাহ',
    rating: 5,
    date: '2025-10-30',
    content: 'আমার বয়স্ক বাবা-মায়ের হুইলচেয়ার দরকার ছিল এবং মরিয়ম প্রত্যাশার বাইরে গেছেন। প্রতিদিন হারামে পরিবহন, হারাম ভিউসহ আরামদায়ক স্যুট। মা বারবার বলছিলেন আগামী বছর আবার বুক করতে।',
    avatar: 'from-violet-400 to-purple-500',
    verified: true, featured: true,
  },
  {
    id: 'tst-005',
    name: 'ইব্রাহিম দিওপ',
    location: 'খুলনা, বাংলাদেশ',
    packageName: 'স্ট্যান্ডার্ড হজ্জ ২০২৬',
    rating: 5,
    date: '2025-12-02',
    content: 'ইব্রাহিম কেইতা আমাদের পরিবারের জন্য সবকিছু সংগঠিত করেছেন। সাংস্কৃতিক সংবেদনশীলতা, সুন্দর মিনা তাঁবু ও দুর্দান্ত যিয়ারত ট্যুর। তিন প্রজন্ম একসাথে নিশ্চিন্তে হজ্জ করেছি।',
    avatar: 'from-amber-400 to-orange-500',
    verified: true, featured: true,
  },
  {
    id: 'tst-006',
    name: 'জয়নব মুস্তফা',
    location: 'বরিশাল, বাংলাদেশ',
    packageName: 'বাজেট উমরাহ',
    rating: 4,
    date: '2025-11-10',
    content: 'দামের তুলনায় সত্যিই মুগ্ধ। হোটেল ১০ মিনিট হাঁটার দূরত্বে কিন্তু রুম পরিষ্কার ও শান্ত। ব্রেকফাস্টে ভাল বৈচিত্র্য। বাস প্রতিদিন সময়মতো। বাজেট-সচেতন পরিবারের জন্য সুপারিশ।',
    avatar: 'from-teal-400 to-cyan-500',
    verified: true, featured: false,
  },
  {
    id: 'tst-007',
    name: 'খালিদ রশিদ',
    location: 'রংপুর, বাংলাদেশ',
    packageName: 'প্রিমিয়াম উমরাহ',
    rating: 5,
    date: '2025-09-18',
    content: 'ইস্তাম্বুল হয়ে মাল্টি-সিটি ভ্রমণ ছিল চমৎকার। ওমর সব ভিসা পরিচালনা করেছেন এবং সুইসঁটেল মক্কার রুম থেকে ২২তম তলা থেকে হারামের দৃশ্য ছিল অসাধারণ। ইনশাআল্লাহ আবার বুক করব।',
    avatar: 'from-orange-400 to-red-500',
    verified: true, featured: true,
  },
  {
    id: 'tst-008',
    name: 'সালমা আল-ফয়সাল',
    location: 'ময়মনসিংহ, বাংলাদেশ',
    packageName: 'ইকোনমি উমরাহ',
    rating: 5,
    date: '2025-08-25',
    content: 'অ্যাপের মাধ্যমে বুকিং প্রক্রিয়া অবিশ্বাস্যভাবে মসৃণ। লাইভ চ্যাট সাপোর্ট মিনিটের মধ্যে উত্তর দিয়েছে। হোটেল পরিষ্কার, খাবার হালাল-সার্টিফায়েড। আল্লাহ কবুল করুন।',
    avatar: 'from-pink-400 to-fuchsia-500',
    verified: true, featured: false,
  },
  {
    id: 'tst-009',
    name: 'আব্দুর রহমান',
    location: 'কুমিল্লা, বাংলাদেশ',
    packageName: 'স্ট্যান্ডার্ড হজ্জ ২০২৬',
    rating: 5,
    date: '2025-12-12',
    content: 'খাদিজার প্রাক-প্রস্থান শিক্ষামূলক প্রোগ্রাম আমাদের হজ্জ প্রস্তুতি বদলে দিয়েছে। আমরা আধ্যাত্মিকভাবে প্রস্তুত হয়ে পৌঁছেছি এবং লজিস্টিকস ছিল নিখুঁত।',
    avatar: 'from-yellow-400 to-amber-500',
    verified: true, featured: true,
  },
  {
    id: 'tst-010',
    name: 'নুসাইবা আলী',
    location: 'নারায়ণগঞ্জ, বাংলাদেশ',
    packageName: 'প্রিমিয়াম উমরাহ',
    rating: 5,
    date: '2025-10-05',
    content: 'কর্মজীবী হিসেবে আমার সংক্ষিপ্ত উমরাহ প্রয়োজন ছিল। সাফিয়া ৭-দিনের প্রিমিয়াম প্যাকেজ ডিজাইন করেছেন যা আমার সময়সূচির সাথে দারুণ মিলেছে। অ্যাপ-ভিত্তিক ভ্রমণসূচি, রিয়েল-টাইম আপডেট।',
    avatar: 'from-indigo-400 to-violet-500',
    verified: true, featured: false,
  },
  {
    id: 'tst-011',
    name: 'সাঈদ মনসুর',
    location: 'গাজীপুর, বাংলাদেশ',
    packageName: 'ইকোনমি হজ্জ ২০২৬',
    rating: 5,
    date: '2025-11-28',
    content: 'দামের জন্য সাধারণ আশা করেছিলাম। যা পেলাম তা অসাধারণ। গ্রুপ লিডার নিজেই একজন আলেম। মিনার তাঁবু পরিষ্কার ও সুপরিচালিত। আল-সাফারের জন্য জোর সুপারিশ।',
    avatar: 'from-cyan-400 to-blue-500',
    verified: true, featured: false,
  },
  {
    id: 'tst-012',
    name: 'রাবিয়া তারিক',
    location: 'বগুড়া, বাংলাদেশ',
    packageName: 'ফ্যামিলি উমরাহ',
    rating: 5,
    date: '2025-09-30',
    content: '৮ বছরের নিচে দুই বাচ্চা নিয়ে ভ্রমণ অসম্ভব মনে হত যতক্ষণ এই প্ল্যাটফর্ম না পেলাম। ফ্যামিলি স্যুট, বাচ্চাদের খাবার, বেবি স্ট্রলার। বাচ্চারা এখনও তাওয়াফের কথা বলে।',
    avatar: 'from-emerald-400 to-green-500',
    verified: true, featured: false,
  },
]

export const getFeaturedTestimonials = () => testimonials.filter(t => t.featured)
