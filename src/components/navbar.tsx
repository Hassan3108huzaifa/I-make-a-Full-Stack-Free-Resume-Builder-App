'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import AuthButton from './AuthButton'

export function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsOpen(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Templates', href: '/templates' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  }

  const handleNavigation = (href: string) => {
    closeMenu()
    router.push(href)
  }

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`py-4 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'} transition-all duration-300`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-2 text-2xl md:text-3xl font-bold text-gray-800 cursor-pointer"
              onClick={() => handleNavigation('/')}
            >
              <FileText className="h-8 w-8 text-sky-500" />
              <span>ResumeBuilder</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <motion.div key={item.name} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-sky-600 transition-colors font-medium"
                    prefetch
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation(item.href)
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants}>
                <AuthButton />
              </motion.div>
            </div>

            <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={closeMenu}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-xl z-50 overflow-y-auto flex flex-col"
              >
                <div className="flex flex-col p-6 space-y-4 flex-grow">
                  <button
                    onClick={closeMenu}
                    className="self-end focus:outline-none"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                      prefetch
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavigation(item.href)
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-auto p-4 w-full">
                  <AuthButton isMobile={true} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
