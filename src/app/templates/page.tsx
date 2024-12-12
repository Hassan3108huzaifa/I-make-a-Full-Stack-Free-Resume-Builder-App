import type { Metadata } from 'next'
import TemplatePage from './TemplatesPage'

export const metadata: Metadata = {
  title: 'Resume Templates | Choose Your Perfect Design',
  description: 'Browse our collection of professional resume templates. Find the perfect design to showcase your skills and experience.',
  keywords: ['resume templates', 'CV designs', 'professional resume layouts', 'ATS-friendly templates'],
}

const page = () => {
  return (
    <div><TemplatePage/></div>
  )
}

export default page

