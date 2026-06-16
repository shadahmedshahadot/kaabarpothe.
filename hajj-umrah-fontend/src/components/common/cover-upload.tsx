'use client'

import { useRef, useState } from 'react'
import { ImagePlus, Loader2, Trash2, UploadCloud } from 'lucide-react'
import { toast } from 'sonner'

import { useUploadSingleMutation } from '@/redux/fetchres/upload/uploadApi'

export interface CoverUploadProps {
  value: string
  onChange: (url: string) => void
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
  aspect?: 'square' | 'video' | 'wide'
  disabled?: boolean
}

const aspectClass = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[21/9]',
} as const

export function CoverUpload({
  value,
  onChange,
  folder = 'misc',
  label = 'কভার ছবি',
  aspect = 'video',
  disabled,
}: CoverUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [uploadSingle, { isLoading }] = useUploadSingleMutation()

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('শুধুমাত্র ছবি আপলোড করা যাবে')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('৫ MB এর বেশি বড় ফাইল গ্রহণযোগ্য নয়')
      return
    }
    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', folder)
    try {
      const res = await uploadSingle(fd).unwrap()
      const url = res?.data?.url
      if (!url) throw new Error('No URL returned')
      onChange(url)
      toast.success('আপলোড সফল হয়েছে')
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || 'আপলোড ব্যর্থ হয়েছে')
    }
  }

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const remove = () => onChange('')

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}

      <div
        onDragOver={e => {
          e.preventDefault()
          if (!disabled) setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`relative ${aspectClass[aspect]} w-full rounded-xl border-2 border-dashed transition-colors ${
          dragOver
            ? 'border-primary bg-primary/5'
            : 'border-border bg-muted/30 hover:bg-muted/50'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} overflow-hidden`}
        onClick={() => !disabled && !isLoading && inputRef.current?.click()}
      >
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="cover" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation()
                    inputRef.current?.click()
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white text-foreground text-xs font-medium inline-flex items-center gap-1.5 shadow"
                >
                  <UploadCloud className="w-3.5 h-3.5" /> পরিবর্তন
                </button>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation()
                    remove()
                  }}
                  className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium inline-flex items-center gap-1.5 shadow"
                >
                  <Trash2 className="w-3.5 h-3.5" /> মুছুন
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2">
            {isLoading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <ImagePlus className="w-8 h-8" />
            )}
            <p className="text-sm font-medium">
              {isLoading ? 'আপলোড হচ্ছে…' : 'ছবি টেনে আনুন বা ক্লিক করুন'}
            </p>
            <p className="text-xs">PNG · JPG · WebP · সর্বোচ্চ ৫ MB</p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onFileInput}
          className="hidden"
          disabled={disabled || isLoading}
        />
      </div>
    </div>
  )
}
