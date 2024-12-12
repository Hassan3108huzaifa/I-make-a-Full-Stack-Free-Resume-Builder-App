import React from 'react'
import SignUpPage from './SignUpPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign Out | Free Resume Builder',
    description: 'Securely sign out of your Free Resume Builder account. Your information remains safe and private.',
    keywords: ['sign out', 'logout', 'account security'],
}


const page = () => {
    return (
        <div><SignUpPage /></div>
    )
}

export default page