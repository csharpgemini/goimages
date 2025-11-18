'use client'

import { Trash2, Eye } from 'lucide-react'

interface ImageCardProps {
  image: string
  id: string
  onDelete: (id: string) => void
  onClick: () => void
}

export default function ImageCard({ image, id, onDelete, onClick }: ImageCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-slate-700/50">
      <div className="aspect-square overflow-hidden bg-slate-800">
        <img src={image || "/placeholder.svg"} alt={`Gallery item ${id}`} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Action buttons */}
      <div className="absolute inset-0 flex items-end justify-between gap-2 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button
          onClick={onClick}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-500/90 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          aria-label="View image"
        >
          <Eye className="h-4 w-4" />
          <span className="hidden sm:inline">View</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(id)
          }}
          className="rounded-lg bg-red-500/90 p-2 text-white transition-colors hover:bg-red-600"
          aria-label="Delete image"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
