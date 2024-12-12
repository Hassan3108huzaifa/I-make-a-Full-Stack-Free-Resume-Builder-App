import React from 'react'
import SignInPage from './SignInPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign In | Access Your Resume Builder Account',
    description: 'Sign in to your Free Resume Builder account to create, edit, and manage your professional resumes.',
    keywords: ['sign in', 'login', 'resume account', 'user access'],
  }

const page = () => {
  return (
    <div><SignInPage/></div>
  )
}

export default page