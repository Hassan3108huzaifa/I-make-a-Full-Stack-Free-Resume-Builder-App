
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Testimonials } from '@/components/Testimonials'
import { HowItWorks } from '@/components/HowItWorks'


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