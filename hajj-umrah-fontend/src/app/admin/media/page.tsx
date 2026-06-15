import { Upload, FolderPlus, Search, Image as ImageIcon, Trash2, Download } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'

const folders = [
  { name: 'হজ্জ ২০২৬', count: 42, gradient: 'from-amber-400 to-orange-500' },
  { name: 'উমরাহ প্যাকেজ', count: 86, gradient: 'from-emerald-400 to-teal-500' },
  { name: 'হোটেল ছবি', count: 134, gradient: 'from-blue-400 to-indigo-500' },
  { name: 'আলেমদের অবতার', count: 18, gradient: 'from-rose-400 to-pink-500' },
  { name: 'ব্লগ কভার', count: 24, gradient: 'from-violet-400 to-purple-500' },
  { name: 'মার্কেটিং', count: 67, gradient: 'from-cyan-400 to-sky-500' },
]

const media = [
  'from-amber-400 to-orange-500', 'from-emerald-400 to-teal-500', 'from-rose-400 to-pink-500',
  'from-blue-400 to-indigo-500', 'from-violet-400 to-purple-500', 'from-cyan-400 to-sky-500',
  'from-yellow-400 to-amber-500', 'from-green-400 to-emerald-500', 'from-fuchsia-400 to-pink-500',
  'from-indigo-400 to-blue-500', 'from-orange-400 to-red-500', 'from-teal-400 to-cyan-500',
]

export default function AdminMediaPage() {
  return (
    <>
      <PageTitle
        title="মিডিয়া লাইব্রেরি"
        description="371 ফাইল · 100 GB এর মধ্যে 4.2 GB ব্যবহৃত"
        action={
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-border rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-muted">
              <FolderPlus className="w-4 h-4" /> নতুন ফোল্ডার
            </button>
            <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary">
              <Upload className="w-4 h-4" /> আপলোড
            </button>
          </div>
        }
      />

      {/* Folders */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {folders.map(f => (
          <button key={f.name} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all text-left">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} mb-3`} />
            <p className="font-semibold text-foreground truncate">{f.name}</p>
            <p className="text-xs text-muted-foreground">{f.count} ফাইল</p>
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 mb-4 flex items-center gap-3">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input className="flex-1 bg-transparent focus:outline-none text-sm" placeholder="মিডিয়া অনুসন্ধান…" />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {media.map((g, i) => (
          <div key={i} className="group relative aspect-square rounded-xl overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${g}`} />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button className="w-9 h-9 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"><Download className="w-4 h-4" /></button>
              <button className="w-9 h-9 rounded-lg bg-rose-500/80 hover:bg-rose-500 text-white flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity truncate">
              image-{i + 1}.jpg
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
