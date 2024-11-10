import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import clientPromise from '@/lib/mongodb'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId

    console.log('Fetching resumes for user:', userId)

    const session = await getServerSession(authOptions)
    console.log('Session:', JSON.stringify(session, null, 2))

    if (!session || !session.user || session.user.id !== userId) {
      console.warn('Unauthorized access attempt:', { sessionUserId: session?.user?.id, requestedUserId: userId })
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("resumeforge")
    const resumes = db.collection("resumes")

    const userResumes = await resumes.find({ userId }).toArray()
    console.log(`Found ${userResumes.length} resumes for user ${userId}`)

    return NextResponse.json({ success: true, resumes: userResumes })
  } catch (error) {
    console.error('Error in GET /api/resumes/[userId]:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resumes', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId
    const session = await getServerSession(authOptions)

    if (!session || !session.user || session.user.id !== userId) {
      console.warn('Unauthorized access attempt:', { sessionUserId: session?.user?.id, requestedUserId: userId })
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    console.log('Received resume data:', JSON.stringify(data, null, 2))

    const client = await clientPromise
    const db = client.db("resumeforge")
    const resumes = db.collection("resumes")

    const result = await resumes.insertOne({ ...data, userId })
    console.log(`Inserted new resume with ID: ${result.insertedId}`)

    return NextResponse.json({ success: true, resumeId: result.insertedId })
  } catch (error) {
    console.error('Error in POST /api/resumes/[userId]:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create resume', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}