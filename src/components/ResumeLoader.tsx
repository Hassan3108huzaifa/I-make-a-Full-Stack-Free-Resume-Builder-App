import { Loader2 } from 'lucide-react'

export default function ResumeLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      <p className="mt-4 text-lg font-medium text-gray-700">Loading your resumes...</p>
    </div>
  )
}

