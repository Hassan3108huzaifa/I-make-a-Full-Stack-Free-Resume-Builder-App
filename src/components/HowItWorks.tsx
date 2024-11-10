'use client'

import { motion } from 'framer-motion'
import { FileText, Edit, Download } from 'lucide-react'

const steps = [
  {
    icon: <FileText className="h-12 w-12 text-blue-500" />,
    title: "Choose a Template",
    description: "Select from our range of professional, ATS-friendly templates."
  },
  {
    icon: <Edit className="h-12 w-12 text-green-500" />,
    title: "Fill in Your Details",
    description: "Use our easy editor to input your information and get smart suggestions."
  },
  {
    icon: <Download className="h-12 w-12 text-purple-500" />,
    title: "Download and Share",
    description: "Get your polished resume in PDF format or share it with a unique link."
  }
]

export function HowItWorks() {
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          How ResumeBuilder Works
        </motion.h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h4>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}