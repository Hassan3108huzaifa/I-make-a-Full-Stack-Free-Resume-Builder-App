import type { Metadata } from 'next'
import ContactPage from './ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us | Free Resume Builder Support',
  description: "Get in touch with our support team. We're here to help you create the perfect resume for your job search.",
  keywords: ['contact support', 'resume help', 'customer service', 'resume builder assistance'],
}

const page = () => {
  return (
    <div><ContactPage/></div>
  )
}

export default page

