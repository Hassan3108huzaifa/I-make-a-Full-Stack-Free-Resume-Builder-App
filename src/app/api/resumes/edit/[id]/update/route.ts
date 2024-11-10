import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { authOptions } from '../../../../auth/[...nextauth]/route'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const id = params.id
    const { theme, data, previewImage } = await request.json()

    const client = await clientPromise
    const db = client.db("resumeforge")
    const resumes = db.collection("resumes")

    const existingResume = await resumes.findOne({ _id: new ObjectId(id) })

    if (!existingResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    if (existingResume.userId !== session.user.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const result = await resumes.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          theme, 
          data, 
          previewImage,
          lastModified: new Date()
        } 
      }
    )

    if (result.modifiedCount === 1) {
      return NextResponse.json({ success: true, message: 'Resume updated successfully' })
    } else {
      return NextResponse.json({ success: false, error: 'Failed to update resume' }, { status: 500 })
    }
  } catch (e) {
    console.error(e)
    return NextResponse.json({ success: false, error: 'Failed to update resume' }, { status: 500 })
  }
}