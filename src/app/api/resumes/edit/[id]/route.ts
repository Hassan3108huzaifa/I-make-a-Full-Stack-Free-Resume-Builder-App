import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { MongoClient, ObjectId } from 'mongodb'
import { authOptions } from '../../../auth/[...nextauth]/route'

const client = new MongoClient(process.env.MONGODB_URI!)

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = params.id

    await client.connect()
    const db = client.db("resumeforge")
    const resumes = db.collection("resumes")

    const resume = await resumes.findOne({ _id: new ObjectId(id) })

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    if (resume.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({ success: true, resume })
  } catch (e) {
    console.error('Error in API route:', e)
    return NextResponse.json({ success: false, error: 'Failed to fetch resume' }, { status: 500 })
  } finally {
    await client.close()
  }
}