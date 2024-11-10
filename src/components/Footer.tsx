'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, FileText, Github } from 'lucide-react'

export function Footer() {
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
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-900 text-white py-12 mt-auto"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-8 w-8 text-blue-400" />
              <h5 className="text-2xl font-bold">ResumeBuilder</h5>
            </div>
            <p className="text-gray-400">Creating professional resumes for free, for everyone.</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h6 className="text-lg font-semibold mb-4">Quick Links</h6>
            <ul className="space-y-2">
              <li><Link href="/templates" className="text-gray-400 hover:text-white transition-colors">Templates</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h6 className="text-lg font-semibold mb-4">Follow Us</h6>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100067756576220" target='_blank' className="text-gray-400 hover:text-white transition-colors"><Facebook /></a>
              <a href="https://github.com/hassan3108huzaifa" target='_blank' className="text-gray-400 hover:text-white transition-colors"><Github/></a>
              <a href="https://www.instagram.com/mr.hassanbhai/" target='_blank' className="text-gray-400 hover:text-white transition-colors"><Instagram /></a>
              <a href="https://www.linkedin.com/in/hassan-rj-148220295/" target='_blank' className="text-gray-400 hover:text-white transition-colors"><Linkedin /></a>
            </div>
          </motion.div>
        </div>
        <motion.div
          variants={itemVariants}
          className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400"
        >
          © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  )
}