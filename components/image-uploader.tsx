'use client'

import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'

interface ImageUploaderProps {
  onUpload: (images: string[]) => void
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList) => {
    const newPreviews: string[] = []

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            newPreviews.push(e.target.result as string)
            if (newPreviews.length === Array.from(files).filter((f) => f.type.startsWith('image/')).length) {
              setPreviews(newPreviews)
              onUpload(newPreviews)
            }
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  return (
    <div className="mb-12 space-y-6">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-2xl border-2 border-dashed px-8 py-16 text-center transition-all duration-300 ${
          isDragActive
            ? 'border-blue-400 bg-blue-500/10 scale-105'
            : 'border-slate-600/50 bg-slate-700/30 hover:border-slate-500/80 hover:bg-slate-700/50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <div className={`rounded-full p-4 ${isDragActive ? 'bg-blue-500/20' : 'bg-slate-600/30'}`}>
            <Upload className={`h-8 w-8 ${isDragActive ? 'text-blue-400' : 'text-slate-400'}`} />
          </div>
          <div>
            <p className="text-lg font-semibold text-white">
              {isDragActive ? 'Drop your images here' : 'Drag and drop your images'}
            </p>
            <p className="text-sm text-slate-400">or click to browse</p>
          </div>
        </div>

        <button
          onClick={() => inputRef.current?.click()}
          className="absolute inset-0 cursor-pointer"
          aria-label="Upload images"
        />
      </div>

      {previews.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {previews.map((preview, index) => (
            <div key={index} className="group relative h-20 w-20 overflow-hidden rounded-lg">
              <img src={preview || "/placeholder.svg"} alt={`Preview ${index}`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
              <button
                onClick={() => setPreviews((prev) => prev.filter((_, i) => i !== index))}
                className="absolute right-1 top-1 rounded-full bg-red-500/80 p-1 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
