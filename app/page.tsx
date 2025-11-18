'use client'

import { useState, useEffect } from 'react'
import ImageUploader from '@/components/image-uploader'
import ImageGallery from '@/components/image-gallery'
import Header from '@/components/header'

interface Image {
  _id: string
  imageData: string
}

export default function Home() {
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/images')
      if (response.ok) {
        const data = await response.json()
        setImages(data)
      }
    } catch (error) {
      console.error('Failed to fetch images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (newImages: string[]) => {
    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: newImages }),
      })
      if (response.ok) {
        const uploadedImages = await response.json()
        setImages((prev) => [...uploadedImages, ...prev])
      }
    } catch (error) {
      console.error('Failed to upload images:', error)
    }
  }

  const handleDeleteImage = async (id: string) => {
    try {
      const response = await fetch(`/api/images/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setImages((prev) => prev.filter((img) => img._id !== id))
      }
    } catch (error) {
      console.error('Failed to delete image:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ImageUploader onUpload={handleImageUpload} />
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-blue-400"></div>
          </div>
        ) : (
          <ImageGallery images={images} onDelete={handleDeleteImage} />
        )}
      </div>
    </main>
  )
}
