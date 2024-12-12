import type { Metadata } from 'next'
import { Suspense } from 'react'
import ResumeBuilder from './ResumeBuilder'
import Loader from '@/components/Loader'

export const metadata: Metadata = {
  title: 'Build Your Resume | Free Online Resume Creator',
  description: 'Create a professional resume in minutes with our easy-to-use, free online resume builder. Stand out from the crowd and land your dream job.',
  keywords: ['resume builder', 'CV creator', 'online resume tool', 'professional resume maker'],
}

export default function BuilderPage() {
    return (
        <Suspense fallback={<div className="mt-auto h-screen flex items-center justify-center bg-white bg-opacity-80 z-50">
            <Loader />
        </div>}>
            <ResumeBuilder />
        </Suspense>
    )
}

