import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('resumeforge');
    const resumes = db.collection('resumes');

    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid resume ID' }, { status: 400 });
    }

    const result = await resumes.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true, message: 'Resume deleted successfully' });
    } else {
      return NextResponse.json({ success: false, error: 'Resume not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error in DELETE /api/resumes/delete/[id]:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete resume' }, { status: 500 });
  }
}
