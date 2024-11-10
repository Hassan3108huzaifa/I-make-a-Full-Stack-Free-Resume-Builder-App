import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import clientPromise from '@/lib/mongodb'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    // Ensure params are awaited before accessing userId
    const userId = params.userId // Await params here
  // Await params here

    // Fetch the session info
    const session = await getServerSession(authOptions)

    // Check if the session is valid and the user is authorized
    if (!session || session.user.id !== userId) {
      console.log('Unauthorized access attempt:', session?.user?.id, userId)
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("resumeforge")
    const resumes = db.collection("resumes")

    // Fetch resumes associated with the user
    const userResumes = await resumes.find({ userId }).toArray()

    return NextResponse.json({ success: true, resumes: userResumes })
  } catch (e) {
    console.error('Error in GET /api/resumes/[userId]:', e)
    return NextResponse.json({ success: false, error: 'Failed to fetch resumes' }, { status: 500 })
  }
}
