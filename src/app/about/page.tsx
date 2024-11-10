import { Suspense } from 'react'
import AboutPage from './aboutPage'
import Loader from '@/components/Loader'

export default function BuilderPage() {
    return (
        <Suspense fallback={<div className="mt-auto h-screen flex items-center justify-center bg-white bg-opacity-80 z-50">
            <Loader />
        </div>}>
            <AboutPage />
        </Suspense>
    )
}