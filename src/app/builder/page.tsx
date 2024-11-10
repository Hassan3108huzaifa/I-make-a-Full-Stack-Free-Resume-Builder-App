import { Suspense } from 'react'
import ResumeBuilder from './ResumeBuilder'
import Loader from '@/components/Loader'

export default function BuilderPage() {
    return (
        <Suspense fallback={<div className="mt-auto h-screen flex items-center justify-center bg-white bg-opacity-80 z-50">
            <Loader />
        </div>}>
            <ResumeBuilder />
        </Suspense>
    )
}