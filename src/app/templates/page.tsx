'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { motion } from 'framer-motion'

const templates = [
  { id: 'classic', name: 'Classic', image: '/resumes/classic.png' },
  { id: 'modern', name: 'Modern', image: '/resumes/modern.png' },
  { id: 'creative', name: 'Creative', image: '/resumes/creative.png' },
  { id: 'executive', name: 'Executive', image: '/resumes/executive.png' },
  { id: 'minimalist', name: 'Minimalist', image: '/resumes/minimalist.png' },
  { id: 'tech', name: 'Tech-focused', image: '/resumes/tech.png' },
  { id: 'designer', name: 'Creative Designer', image: '/resumes/designer.png' },
  { id: 'corporate', name: 'Corporate', image: '/resumes/corporate.png' },
  { id: 'academic', name: 'Academic CV', image: '/resumes/acadmic.png' },
  { id: 'creativepro', name: 'Creative Pro', image: '/resumes/creativepro.png' },
  { id: 'blod', name: 'Bold Modern', image: '/resumes/blodmoderen.png' },
]

export default function TemplateSelection() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({})
  const router = useRouter()

  useEffect(() => {
    const loadImage = (imageUrl: string) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image()
        img.onload = () => resolve(imageUrl)
        img.onerror = reject
        img.src = imageUrl
      })
    }

    Promise.all(templates.map(template => loadImage(template.image)))
      .then(() => {
        setImagesLoaded(templates.reduce((acc, template) => ({
          ...acc,
          [template.id]: true
        }), {}))
      })
      .catch(error => console.error('Error preloading images:', error))
  }, [])

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handleContinue = () => {
    if (selectedTemplate) {
      router.push(`/builder?template=${selectedTemplate}`)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-center text-gray-800"
      >
        Choose Your Resume Template
      </motion.h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {templates.map((template) => (
          <motion.div key={template.id} variants={itemVariants}>
            <Card
              className={`cursor-pointer transition-all ${selectedTemplate === template.id
                  ? 'ring-2 ring-blue-500 shadow-lg'
                  : 'hover:shadow-md'
                } rounded-lg overflow-hidden bg-white`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardHeader className="p-4 bg-gray-50">
                <CardTitle className="text-lg font-semibold text-gray-700">{template.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-48 bg-gray-200 rounded-b-md overflow-hidden relative">
                  {imagesLoaded[template.id] ? (
                    <Image
                      src={template.image}
                      alt={`${template.name} Template`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-300 ease-in-out transform hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full animate-pulse bg-gray-300 flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <Button
          onClick={handleContinue}
          disabled={!selectedTemplate}
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue with Selected Template
        </Button>
      </motion.div>
    </div>
  )
}