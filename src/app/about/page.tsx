import type { Metadata } from 'next'
import { Suspense } from 'react'
import AboutPage from './aboutPage'
import Loader from '@/components/Loader'

export const metadata: Metadata = {
  title: 'About Us | Free Resume Builder',
  description: 'Learn about our mission to help job seekers create professional resumes. Discover why our free resume builder is trusted by thousands.',
  keywords: ['about us', 'resume builder story', 'career tools', 'job search assistance'],
}

export default function AboutPageWrapper() {
    return (
        <Suspense fallback={<div className="mt-auto h-screen flex items-center justify-center bg-white bg-opacity-80 z-50">
            <Loader />
        </div>}>
            <AboutPage />
        </Suspense>
    )
}

