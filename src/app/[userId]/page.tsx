import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import UserResumesClient from './UserResumesClient'
import { cookies } from 'next/headers'
import Loader from '@/components/Loader'

// Function to fetch resumes
async function getResumes(userId: string) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.id !== userId) {
    console.warn('Session not found or user ID does not match')
    return null
  }

  const cookieStore = await cookies() // Await cookies()
  const sessionToken = cookieStore.get('next-auth.session-token')?.value

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/resumes/${userId}`, {
      headers: {
        'Cookie': `next-auth.session-token=${sessionToken}`,
      },
      cache: 'no-store', // No caching for real-time data
    })

    if (!response.ok) {
      console.error('Failed to fetch resumes from API:', response.statusText)
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching resumes:', error)
    return null
  }
}

export default async function UserResumesPage({ params }: { params: { userId: string } }) {
  // Await params to avoid async errors in accessing `params.userId`
  const { userId } = params // Wait for params to resolve correctly

  const session = await getServerSession(authOptions)

  if (!session) {
    console.warn('No session found')
    notFound()
  }

  if (session.user.id !== userId) {
    console.warn('Session user ID does not match params user ID')
    notFound()
  }

  // Fetch resumes data
  const resumesData = await getResumes(userId)

  if (!resumesData) {
    console.warn('Resumes data not found or user not authorized')
    notFound()
  }

  return (
    <Suspense fallback={<div className="mt-auto h-screen flex items-center justify-center bg-white bg-opacity-80 z-50">
      <Loader />
    </div>}>
      <UserResumesClient resumes={resumesData.resumes} userId={userId} />
    </Suspense>
  )
}