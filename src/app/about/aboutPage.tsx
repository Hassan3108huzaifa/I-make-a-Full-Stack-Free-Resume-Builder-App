'use client'

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Target, Heart, Zap } from 'lucide-react'


export default function AboutPage() {




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
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <main className="container mx-auto px-4 py-8 md:py-16">
        <motion.section className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800">About Free Resume Builder</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Empowering careers through effortless, professional resume creation - at no cost
          </p>
        </motion.section>

        <motion.section className="mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-semibold mb-6 text-blue-700">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            At Free Resume Builder, we&apos;re committed to democratizing the job search process. We believe that creating a standout resume shouldn&apos;t be a luxury, but a right for every job seeker.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Our platform offers high-quality, professional resume-building tools completely free of charge, ensuring that financial constraints never stand in the way of career opportunities.
          </p>
          <p className="text-lg text-gray-700">
            By providing cutting-edge resume creation technology at no cost, we&apos;re leveling the playing field and empowering job seekers worldwide to put their best foot forward.
          </p>
        </motion.section>

        <motion.section className="mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-semibold mb-6 text-blue-700">Why Choose Free Resume Builder</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">100% Free, Always</h3>
              <p className="text-gray-700">
                We&apos;re committed to keeping our service completely free, ensuring that everyone has access to professional resume-building tools.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Target className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy-to-Use Interface</h3>
              <p className="text-gray-700">
                Our intuitive design makes creating a professional resume simple and straightforward, even for those with no prior experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Heart className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">ATS-Friendly Templates</h3>
              <p className="text-gray-700">
                All our templates are designed to pass Applicant Tracking Systems, increasing your chances of landing an interview.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Zap className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Suggestions</h3>
              <p className="text-gray-700">
                Benefit from intelligent content suggestions that help you highlight your skills and experiences effectively.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-semibold mb-6 text-blue-700">Our Commitment to Quality</h2>
          <p className="text-lg text-gray-700 mb-4">
            Free doesn&apos;t mean compromising on quality. Our platform leverages cutting-edge technology to provide a premium resume-building experience without the price tag.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            From AI-powered content suggestions to expert-designed templates, we&apos;re dedicated to helping you create a resume that truly stands out.
          </p>
          <p className="text-lg text-gray-700">
            Your privacy and data security are our top priorities. Rest assured that your information is encrypted and never shared.
          </p>
        </motion.section>

        <motion.section className="text-center" variants={itemVariants}>
          <h2 className="text-3xl font-semibold mb-6 text-blue-700">Start Building Your Professional Resume Today</h2>
          <p className="text-lg text-gray-700 mb-6">
            Whether you&apos;re a recent graduate, changing careers, or aiming for that promotion, Free Resume Builder is here to support your journey. Experience the power of professional resume building, absolutely free.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/builder">Create Your Free Resume Now</Link>
          </Button>
        </motion.section>
      </main>
    </motion.div>
  )
}