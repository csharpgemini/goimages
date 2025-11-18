'use client'

import { useState } from 'react'
import ImageCard from './image-card'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface Image {
  _id: string
  imageData: string
}

interface ImageGalleryProps {
  images: Image[]
  onDelete: (id: string) => void
}

export default function ImageGallery({ images, onDelete }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const handlePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
    }
  }

  const handleNext = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1)
    }
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-600/30 bg-slate-700/20 py-20">
        <svg className="mb-4 h-16 w-16 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-lg font-medium text-slate-400">No images yet</p>
        <p className="text-sm text-slate-500">Start by uploading some images above</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Your Gallery</h2>
          <span className="rounded-full bg-slate-700/50 px-3 py-1 text-sm text-slate-300">
            {images.length} image{images.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid auto-rows-max gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image, index) => (
            <ImageCard
              key={image._id}
              image={image.imageData}
              id={image._id}
              onDelete={onDelete}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative flex w-full max-w-2xl items-center justify-center px-4">
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -right-4 -top-4 rounded-full bg-slate-800 p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white sm:-right-12 sm:-top-12"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Previous button */}
            {selectedImage > 0 && (
              <button
                onClick={handlePrevious}
                className="absolute left-0 rounded-full bg-slate-800/50 p-3 text-slate-300 transition-all hover:bg-slate-700 hover:text-white md:-left-20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Image */}
            <img
              src={images[selectedImage].imageData || "/placeholder.svg"}
              alt={`Gallery ${selectedImage}`}
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />

            {/* Next button */}
            {selectedImage < images.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-0 rounded-full bg-slate-800/50 p-3 text-slate-300 transition-all hover:bg-slate-700 hover:text-white md:-right-20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-800/50 px-4 py-2 text-sm text-slate-300">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
