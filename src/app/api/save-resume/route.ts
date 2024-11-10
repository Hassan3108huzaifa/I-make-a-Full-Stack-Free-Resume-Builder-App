import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import clientPromise from '@/lib/mongodb'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { theme, data, previewImage } = await request.json()

    const client = await clientPromise
    const db = client.db("resumeforge")
    const resumes = db.collection("resumes")

    const result = await resumes.insertOne({ 
      theme, 
      data, 
      previewImage,
      createdAt: new Date(),
      lastModified: new Date(),
      userId: session.user.id,
      title: data.name + "'s Resume" // You can customize this
    })

    return NextResponse.json({ success: true, id: result.insertedId.toString() })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ success: false, error: 'Failed to save resume' }, { status: 500 })
  }
}