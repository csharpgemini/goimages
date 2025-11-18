import { MongoClient } from 'mongodb'

let cachedClient: MongoClient | null = null

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient
  }

  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not defined')
  }

  const client = new MongoClient(mongoUri)
  await client.connect()

  cachedClient = client
  return client
}

export async function getDatabase() {
  const client = await connectToDatabase()
  return client.db(process.env.MONGODB_DATABASE || 'image-gallery')
}
