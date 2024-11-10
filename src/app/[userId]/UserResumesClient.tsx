'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, FileText, Trash2 } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import Image from 'next/image'

interface Resume {
  _id: string
  theme: string
  createdAt: string
  title: string
  lastModified: string
  previewImage: string
}

interface UserResumesClientProps {
  resumes: Resume[]
  userId: string
}

export default function UserResumesClient({ resumes: initialResumes }: UserResumesClientProps) {
  const [resumes, setResumes] = useState(initialResumes)
  const router = useRouter()

  const getThemeColor = (theme: string) => {
    const themeColors: { [key: string]: string } = {
      'modern': 'bg-blue-100 text-blue-800',
      'classic': 'bg-green-100 text-green-800',
      'creative': 'bg-purple-100 text-purple-800',
      'professional': 'bg-gray-100 text-gray-800',
      'elegant': 'bg-pink-100 text-pink-800',
    }
    return themeColors[theme.toLowerCase()] || 'bg-gray-100 text-gray-800'
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/resumes/delete/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setResumes(resumes.filter(resume => resume._id !== id))
      } else {
        console.error('Failed to delete resume')
      }
    } catch (error) {
      console.error('Error deleting resume:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Your Resumes</h1>
        <Button onClick={() => router.push('/builder')} className="bg-blue-500 hover:bg-blue-600">
          <FileText className="mr-2 h-4 w-4" /> Create New Resume
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resumes.map((resume) => (
          <Card key={resume._id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 bg-gray-200">
              {resume.previewImage ? (
                <Image
                  src={resume.previewImage}
                  alt={resume.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full object-top"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <FileText className="h-16 w-16 text-gray-400" />
                </div>
              )}
              <Badge className={`absolute top-2 right-2 ${getThemeColor(resume.theme)}`}>
                {resume.theme}
              </Badge>
            </div>

            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">{resume.title}</CardTitle>
              <CardDescription className="flex items-center text-sm text-gray-600">
                <Clock className="mr-1 h-4 w-4" />
                Created on {new Date(resume.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Last modified: {new Date(resume.lastModified).toLocaleString()}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between bg-gray-50">
              <Button variant="outline" onClick={() => router.push(`/resume/${resume._id}`)} className="flex-1 mr-2">
                <Eye className="mr-2 h-4 w-4" /> View
              </Button>
              <Button variant="outline" onClick={() => router.push(`/edit/${resume._id}`)} className="flex-1 mr-2">
                <FileText className="mr-2 h-4 w-4" /> Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="flex-1">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this resume?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your resume.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(resume._id)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
      {resumes.length === 0 && (
        <div className="text-center mt-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-xl font-semibold text-gray-800">No resumes yet</h3>
          <p className="mt-1 text-gray-600">Create your first resume to get started!</p>
          <Button onClick={() => router.push('/builder')} className="mt-4 bg-blue-500 hover:bg-blue-600">
            Create New Resume
          </Button>
        </div>
      )}
    </div>
  )
}
