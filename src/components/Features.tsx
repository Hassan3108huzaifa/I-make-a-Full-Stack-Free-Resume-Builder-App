'use client'

import { motion } from 'framer-motion'
import { Paintbrush, Wand2, Share2, LayoutTemplate, Cpu, Lock } from 'lucide-react'

const features = [
  {
    icon: <Paintbrush className="h-8 w-8 text-blue-500" />,
    title: "Intuitive Design Tools",
    description: "Effortlessly customize your resume with our user-friendly interface. No design skills required!"
  },
  {
    icon: <Wand2 className="h-8 w-8 text-purple-500" />,
    title: "AI-Powered Suggestions",
    description: "Our smart AI analyzes your input and suggests impactful phrases to make your resume stand out."
  },
  {
    icon: <Share2 className="h-8 w-8 text-green-500" />,
    title: "One-Click Sharing",
    description: "Share your resume instantly with a unique link or download in multiple formats."
  },
  {
    icon: <LayoutTemplate className="h-8 w-8 text-yellow-500" />,
    title: "Professional Templates",
    description: "Choose from a wide range of ATS-friendly templates designed by career experts."
  },
  {
    icon: <Cpu className="h-8 w-8 text-red-500" />,
    title: "Smart Formatting",
    description: "Our system automatically adjusts your content to fit perfectly within your chosen template."
  },
  {
    icon: <Lock className="h-8 w-8 text-indigo-500" />,
    title: "Privacy First",
    description: "Your data is encrypted and never shared. You're in control of your information."
  }
]

export function Features() {
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          Why ResumeBuilder Stands Out
        </motion.h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h4 className="text-xl font-semibold ml-2 text-gray-800">{feature.title}</h4>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}