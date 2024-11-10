'use client'

import { motion } from 'framer-motion'
import { User } from 'lucide-react'

const testimonials = [
  {
    name: "Sarah J.",
    role: "Software Engineer",
    content: "ResumeBuilder helped me land my dream job at a top tech company. The AI suggestions were spot-on!"
  },
  {
    name: "Michael T.",
    role: "Marketing Manager",
    content: "I've never received so many interview calls before. ResumeBuilder made my resume stand out from the crowd."
  },
  {
    name: "Emily R.",
    role: "Recent Graduate",
    content: "As a new grad, I was worried about my lack of experience. ResumeBuilder helped me highlight my potential effectively."
  }
]

export function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          What Our Users Say
        </motion.h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <User className="h-12 w-12 text-blue-500 bg-blue-100 rounded-full p-2" />
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">&quot;{testimonial.content}&quot;</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}