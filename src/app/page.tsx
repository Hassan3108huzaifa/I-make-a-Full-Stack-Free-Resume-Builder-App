import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Testimonials } from '@/components/Testimonials'
import { HowItWorks } from '@/components/HowItWorks'

export const metadata: Metadata = {
  title: 'Create Your Professional Resume for Free | Free Resume Builder',
  description: 'Craft a standout resume with our free, easy-to-use resume builder. Perfect for job seekers of all experience levels.',
  keywords: ['free resume builder', 'professional resume', 'online CV maker', 'job application tool'],
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Testimonials />
      <HowItWorks />
    </div>
  )
}

