import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
  try {
    const db = await getDatabase()
    const collection = db.collection('images')

    const images = await collection
      .find({})
      .sort({ _id: -1 })
      .toArray()

    return NextResponse.json(images)
  } catch (error) {
    console.error('Failed to fetch images:', error)
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { images } = await request.json()

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 })
    }

    const db = await getDatabase()
    const collection = db.collection('images')

    const documents = images.map((imageData: string) => ({
      imageData,
      createdAt: new Date(),
    }))

    const result = await collection.insertMany(documents)

    const insertedImages = documents.map((doc, index) => ({
      _id: result.insertedIds[index],
      ...doc,
    }))

    return NextResponse.json(insertedImages, { status: 201 })
  } catch (error) {
    console.error('Failed to upload images:', error)
    return NextResponse.json({ error: 'Failed to upload images' }, { status: 500 })
  }
}
