import { Metadata } from 'next'
import { Suspense } from 'react'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import EditResumeBuilder from './EditResumeBuilder'
import Loader from '@/components/Loader'
import { redirect } from 'next/navigation'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { ResumeData } from '../../../../types/resume'

export async function generateMetadata({ params }: { params: { resumeId: string } }): Promise<Metadata> {
  const resumeData = await getResumeData(params.resumeId);

  if (!resumeData) {
    return {
      title: 'Error | Resume Editor',
      description: 'Resume not found.',
    };
  }


  const { resumeData: { name} } = resumeData;

  return {
    title: `${name} | Resume Editor`,
    description: `Editing resume: ${name}. Customize your resume and make it perfect!`,
    metadataBase: new URL('https://freeresumebuilder-hassanrj.vercel.app'),
  };
}

// Function to check if ObjectId is valid
function isValidObjectId(id: string): boolean {
  return ObjectId.isValid(id);
}

// Fetches resume data based on the provided ID
async function getResumeData(id: string) {
  if (!isValidObjectId(id)) {
    return null;
  }

  try {
    const client = await clientPromise;
    const db = client.db("resumeforge");
    const resume = await db.collection("resumes").findOne({ _id: new ObjectId(id) });

    if (!resume) {
      return null;
    }

    return {
      resumeData: resume.data as ResumeData,
      theme: resume.theme as string
    };
  } catch (error) {
    console.error('Error fetching resume data:', error);
    return null;
  }
}

export default async function EditResumePage({ params }: { params: { resumeId: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin')
  }

  const resumeData = await getResumeData(params.resumeId)

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <p className="text-red-500">Error: Failed to load resume data. Please try again later.</p>
      </div>
    )
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen w-full">
        <Loader />
      </div>
    }>
      <EditResumeBuilder resumeId={params.resumeId} session={session} initialData={resumeData} />
    </Suspense>
  )
}
