import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import clientPromise from '@/lib/mongodb'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId
    console.log('Requested userId:', userId)

    const session = await getServerSession(authOptions)
    console.log('Session from getServerSession:', JSON.stringify(session, null, 2))

    // Log both possible cookie names
    const sessionToken = request.cookies.get('next-auth.session-token')?.value
    const secureSessionToken = request.cookies.get('__Secure-next-auth.session-token')?.value
    console.log('Session token:', sessionToken)
    console.log('Secure session token:', secureSessionToken)

    if (!session || !session.user || session.user.id !== userId) {
      console.warn('Unauthorized access attempt:', { 
        sessionExists: !!session,
        sessionUserId: session?.user?.id,
        requestedUserId: userId
      })
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