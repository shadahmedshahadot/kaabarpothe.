'use client'

import { useRef, useState } from 'react'
import { ImagePlus, Loader2, Trash2, UploadCloud } from 'lucide-react'
import { toast } from 'sonner'

import { useUploadMultipleMutation } from '@/redux/fetchres/upload/uploadApi'

export interface GalleryUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  folder?:
    | 'packages'
    | 'hotels'
    | 'flights'
    | 'transports'
    | 'blogs'
    | 'avatars'
    | 'documents'
    | 'site'
    | 'misc'
  label?: string
  max?: number
  disabled?: boolean
}

export function GalleryUpload({
  value,
  onChange,
  folder = 'misc',
  label = 'গ্যালারি',
  max = 20,
  disabled,
}: GalleryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [uploadMultiple, { isLoading }] = useUploadMultipleMutation()

  const handleFiles = async (files: File[]) => {
    if (!files.length) return
    const remaining = max - value.length
    if (remaining <= 0) {
      toast.error(`সর্বোচ্চ ${max}টি ছবি যোগ করা যাবে`)
      return
    }
    const accept = files.slice(0, remaining)
    const invalid = accept.find(f => !f.type.startsWith('image/'))
    if (invalid) {
      toast.error('শুধুমাত্র ছবি আপলোড করা যাবে')
      return
    }
    const tooBig = accept.find(f => f.size > 5 * 1024 * 1024)
    if (tooBig) {
      toast.error('প্রতিটি ফাইল ৫ MB এর বেশি হতে পারবে না')
      return
    }
    const fd = new FormData()
    accept.forEach(f => fd.append('files', f))
    fd.append('folder', folder)
    try {
      const res = await uploadMultiple(fd).unwrap()
      const urls = (res?.data ?? []).map(d => d.url).filter(Boolean) as string[]
      onChange([...value, ...urls])
      toast.success(`${urls.length}টি ছবি আপলোড সফল হয়েছে`)
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || 'আপলোড ব্যর্থ হয়েছে')
    }
  }

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length) handleFiles(files)
    e.target.value = ''
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files ?? [])
    if (files.length) handleFiles(files)
  }

  const removeAt = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx))
  }

  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return
    const next = [...value]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    onChange(next)
  }

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">{label}</label>
          <span className="text-xs text-muted-foreground">
            {value.length} / {max}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {value.map((url, idx) => (
          <div key={`${url}-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={`gallery-${idx}`} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => move(idx, idx - 1)}
                  disabled={idx === 0}
                  className="px-2 py-1 rounded bg-white/90 text-foreground text-xs disabled:opacity-40"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => move(idx, idx + 1)}
                  disabled={idx === value.length - 1}
                  className="px-2 py-1 rounded bg-white/90 text-foreground text-xs disabled:opacity-40"
                >
                  →
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeAt(idx)}
                className="px-2 py-1 rounded bg-red-500 text-white text-xs inline-flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> মুছুন
              </button>
            </div>
            <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px]">
              {idx + 1}
            </span>
          </div>
        ))}

        {value.length < max && (
          <div
            onDragOver={e => {
              e.preventDefault()
              if (!disabled) setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => !disabled && !isLoading && inputRef.current?.click()}
            className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1.5 text-muted-foreground transition-colors ${
              dragOver ? 'border-primary bg-primary/5' : 'border-border bg-muted/30 hover:bg-muted/50'
            } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <ImagePlus className="w-6 h-6" />
            )}
            <p className="text-xs font-medium text-center px-2">
              {isLoading ? 'আপলোড হচ্ছে…' : 'ছবি যোগ করুন'}
            </p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onFileInput}
        className="hidden"
        disabled={disabled || isLoading}
      />

      <p className="text-xs text-muted-foreground">
        <UploadCloud className="w-3 h-3 inline-block mr-1" />
        একাধিক ছবি নির্বাচন করুন · PNG · JPG · WebP · প্রতি ফাইল সর্বোচ্চ ৫ MB
      </p>
    </div>
  )
}
