import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import UserResumesClient from './UserResumesClient'
import { cookies } from 'next/headers'
import Loader from '@/components/Loader'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Resumes | Manage Your Created Resumes',
  description: "Access and manage all the resumes you've created with our free resume builder. Edit, download, or create new resumes easily.",
  keywords: ['user profile', 'manage resumes', 'resume dashboard', 'edit CV'],
}

async function getResumes(userId: string) {
  const session = await getServerSession(authOptions)
  console.log('Session:', JSON.stringify(session, null, 2))

  if (!session || session.user.id !== userId) {
    console.warn('Session not found or user ID does not match', { sessionUserId: session?.user?.id, paramsUserId: userId })
    return null
  }

  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('next-auth.session-token')?.value
  const secureSessionToken = cookieStore.get('__Secure-next-auth.session-token')?.value
  console.log('Session token:', sessionToken)
  console.log('Secure session token:', secureSessionToken)

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/resumes/${userId}`, {
      headers: {
        Cookie: `next-auth.session-token=${sessionToken || ''}; __Secure-next-auth.session-token=${secureSessionToken || ''}`
      },
      credentials: 'include',
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
  const { userId } = params

  const session = await getServerSession(authOptions)

  if (!session) {
    console.warn('No session found')
    notFound()
  }

  if (session.user.id !== userId) {
    console.warn('Session user ID does not match params user ID')
    notFound()
  }

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

