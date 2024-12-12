'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import html2canvas from 'html2canvas'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ResumeData, Theme } from '../../../types/resume'
import ClassicResume from '@/components/resumes/ClassicResume'
import ModernResume from '@/components/resumes/ModernResume'
import CreativeResume from '@/components/resumes/CreativeResume'
import ExecutiveResume from '@/components/resumes/ExecutiveResume'
import MinimalistResume from '@/components/resumes/MinimalistsResume'
import TechResume from '@/components/resumes/TechResume'
import DesignerResume from '@/components/resumes/DesignerResume'
import CorporateProfessionalResume from '@/components/resumes/CorporateResume'
import AcademicCV from '@/components/resumes/AcadmicResume'
import BoldModernResume from '@/components/resumes/BlodModern'
import CreativeProfessionalResume from '@/components/resumes/CreativeProfessionalResume'

import { Label } from '@/components/ui/label'
import { FaTrash } from 'react-icons/fa'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const themes: Theme[] = [
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'creative', name: 'Creative' },
    { id: 'creativepro', name: 'Creative Pro' },
    { id: 'executive', name: 'Executive' },
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'tech', name: 'Tech-focused' },
    { id: 'designer', name: 'Creative Designer' },
    { id: 'academic', name: 'Academic CV' },
    { id: 'blod', name: 'Bold Modern' },
    { id: 'corporate', name: 'Corporate' },
]

export default function ResumeBuilder() {
    const route = useRouter()
    const { data: session, status } = useSession()
    const searchParams = useSearchParams()
    const [selectedTheme, setSelectedTheme] = useState<string>(searchParams.get('template') || themes[0].id)
    const [resumeData, setResumeData] = useState<ResumeData>({
        name: 'HassanRJ',
        email: 'hassanrj@example.com',
        phone: '123-456-7890',
        address: 'Governor House, Karachi, Pakistan',
        summary: 'A passionate Full Stack Website Developer with expertise in building responsive and user-friendly web applications. Currently enrolled in IT classes to further enhance my skills.',
        experience: [
            {
                company: 'Freelance',
                position: 'Full Stack Developer',
                startDate: 'June 2023',
                endDate: 'Present',
                description: 'Developed and deployed dynamic websites using modern frameworks. Improved client satisfaction by delivering scalable solutions.'
            },
            {
                company: 'TechnoHub',
                position: 'Frontend Developer Intern',
                startDate: 'January 2023',
                endDate: 'May 2023',
                description: 'Worked on interactive user interfaces using React.js and optimized website performance.'
            }
        ],
        education: [
            {
                institution: 'Karachi Institute of Technology',
                degree: 'Diploma',
                fieldOfStudy: 'Full Stack Web Development',
                graduationDate: 'August 2024'
            },
            {
                institution: 'Beaconhouse College',
                degree: 'Intermediate',
                fieldOfStudy: 'Pre-Engineering',
                graduationDate: 'July 2022'
            }
        ],
        skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'MongoDB', 'Git'],
        languages: ['English', 'Urdu'],
        picture: ''
    })
    const [isComplete, setIsComplete] = useState<boolean>(false)
    const [shareLink, setShareLink] = useState<string>('')
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [showPublishConfirmation, setShowPublishConfirmation] = useState<boolean>(false)
    const [showSignInAlert, setShowSignInAlert] = useState<boolean>(false)
    const [showRedirectMessage, setShowRedirectMessage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const resumeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const requiredFields = ['name', 'email', 'phone', 'summary']
        const isDataComplete = requiredFields.every(field => resumeData[field as keyof ResumeData] !== '')
            && resumeData.experience.length > 0
            && resumeData.education.length > 0
            && resumeData.skills.length > 0
        setIsComplete(isDataComplete)
    }, [resumeData])

    const handleInputChange = (field: keyof ResumeData, value: string) => {
        setResumeData(prev => ({ ...prev, [field]: value }))
    }

    const handleArrayInputChange = (field: keyof ResumeData, index: number, value: string) => {
        setResumeData(prev => ({
            ...prev,
            [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
        }))
    }

    const handleObjectInputChange = (field: 'experience' | 'education', index: number, subfield: string, value: string) => {
        setResumeData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? { ...item, [subfield]: value } : item)
        }))
    }

    const addArrayItem = (field: 'experience' | 'education' | 'skills' | 'languages') => {
        setResumeData(prev => ({
            ...prev,
            [field]: [...prev[field], field === 'experience' ? { company: '', position: '', startDate: '', endDate: '', description: '' } :
                field === 'education' ? { institution: '', degree: '', fieldOfStudy: '', graduationDate: '' } : '']
        }))
    }

    const removeArrayItem = (field: 'experience' | 'education' | 'skills' | 'languages', index: number) => {
        if (field === 'experience' && resumeData.experience.length === 1) {
            setShowAlert(true)
            return
        }
        setResumeData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }))
    }

    useEffect(() => {
        if (status === 'unauthenticated' && typeof window !== 'undefined') {
          setShowSignInAlert(true)
        } else if (status === 'authenticated') {
          setShowSignInAlert(false)
        }
    }, [status])

    const handlePublish = async () => {
        if (!session) {
            setShowSignInAlert(true)
            return
        }

        if (!isComplete) {
            alert("Please fill in all required fields before publishing.")
            return
        }

        setShowPublishConfirmation(true)
    }

    const handleConfirmPublish = async () => {
        setShowPublishConfirmation(false);
        setIsLoading(true);

        try {
            // Generate image of the resume
            if (resumeRef.current) {
                const canvas = await html2canvas(resumeRef.current);
                const imageDataUrl = canvas.toDataURL('image/png');

                const response = await fetch('/api/save-resume', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        theme: selectedTheme,
                        data: resumeData,
                        previewImage: imageDataUrl
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    const resumeUrl = `${window.location.origin}/resume/${data.id}`;
                    setShareLink(resumeUrl);

                    // Attempt to open in a new tab
                    const newWindow = window.open(resumeUrl, '_blank');
                    
                    // If the new window is null (blocked by popup blocker), redirect in the same tab
                    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                        // Fallback: redirect in the same tab
                        window.location.href = resumeUrl;
                    } else {
                        // If the new tab opened successfully, show a message to the user
                        setShowRedirectMessage(true);
                    }
                } else {
                    alert("Failed to publish resume. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error publishing resume:", error);
            alert("An error occurred while publishing. Please check your internet connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setResumeData(prev => ({ ...prev, picture: reader.result as string }))
            }
            reader.readAsDataURL(file)
        }
    }

    const ResumePreview = {
        'classic': ClassicResume,
        'modern': ModernResume,
        'creative': CreativeResume,
        'executive': ExecutiveResume,
        'minimalist': MinimalistResume,
        'tech': TechResume,
        'designer': DesignerResume,
        'academic': AcademicCV,
        'blod': BoldModernResume,
        'corporate': CorporateProfessionalResume,
        'creativepro': CreativeProfessionalResume,
    }[selectedTheme] || ClassicResume

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-xl font-semibold">Publishing your resume...</p>
                    <p className="text-gray-600 mt-2">Please wait while we process your information.</p>
                </div>
            </div>
        )
    }

    return (
        <Suspense>
            <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
                    <h1 className="text-3xl font-bold mb-6">Build Your Resume</h1>

                    <div className="mb-6">
                        <Label htmlFor="theme-select">Select Theme</Label>
                        <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                            <SelectTrigger id="theme-select" className="w-full">
                                <SelectValue placeholder="Select a theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {themes.map((theme) => (
                                    <SelectItem key={theme.id} value={theme.id}>
                                        {theme.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="picture-upload">Profile Picture</Label>
                            <Input
                                id="picture-upload"
                                type="file"
                                accept="image/*"
                                onChange={handlePictureUpload}
                            />
                        </div>
                        <Input
                            placeholder="Name"
                            value={resumeData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={resumeData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                        <Input
                            placeholder="Phone"
                            value={resumeData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                        <Input
                            placeholder="Address"
                            value={resumeData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                        <Textarea
                            placeholder="Summary"
                            value={resumeData.summary}
                            onChange={(e) => handleInputChange('summary', e.target.value)}
                        />

                        <h2 className="text-xl font-semibold mt-6 mb-2">Experience</h2>
                        {resumeData.experience.map((exp, index) => (
                            <div key={index} className="space-y-2">
                                <Input
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={(e) => handleObjectInputChange('experience', index, 'company', e.target.value)}
                                />
                                <Input
                                    placeholder="Position"
                                    value={exp.position}
                                    onChange={(e) => handleObjectInputChange('experience', index, 'position', e.target.value)}
                                />
                                <Input
                                    placeholder="Start Date"
                                    value={exp.startDate}
                                    onChange={(e) => handleObjectInputChange('experience', index, 'startDate', e.target.value)}
                                />
                                <Input
                                    placeholder="End Date"
                                    value={exp.endDate}
                                    onChange={(e) => handleObjectInputChange('experience', index, 'endDate', e.target.value)}
                                />
                                <Textarea
                                    placeholder="Description"
                                    value={exp.description}
                                    onChange={(e) => handleObjectInputChange('experience', index, 'description', e.target.value)}
                                />
                                {resumeData.experience.length > 1 && (
                                    <Button variant="outline" size="icon" onClick={() => removeArrayItem('experience', index)}>
                                        <FaTrash className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button onClick={() => addArrayItem('experience')}>Add Experience</Button>

                        <h2 className="text-xl font-semibold mt-6 mb-2">Education</h2>
                        {resumeData.education.map((edu, index) => (
                            <div key={index} className="space-y-2">
                                <Input
                                    placeholder="Institution"
                                    value={edu.institution}
                                    onChange={(e) => handleObjectInputChange('education', index, 'institution', e.target.value)}
                                />
                                <Input
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) => handleObjectInputChange('education', index, 'degree', e.target.value)}
                                />
                                <Input
                                    placeholder="Field of Study"
                                    value={edu.fieldOfStudy}
                                    onChange={(e) => handleObjectInputChange('education', index, 'fieldOfStudy', e.target.value)}
                                />
                                <Input
                                    placeholder="Graduation Date"
                                    value={edu.graduationDate}
                                    onChange={(e) => handleObjectInputChange('education', index, 'graduationDate', e.target.value)}
                                />
                                <Button variant="outline" size="icon" onClick={() => removeArrayItem('education', index)}>
                                    <FaTrash className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button onClick={() => addArrayItem('education')}>Add Education</Button>

                        <h2 className="text-xl font-semibold mt-6 mb-2">Skills</h2>
                        {resumeData.skills.map((skill, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Input
                                    placeholder="Skill"
                                    value={skill}
                                    onChange={(e) => handleArrayInputChange('skills', index, e.target.value)}
                                />
                                <Button variant="outline" size="icon" onClick={() => removeArrayItem('skills', index)}>
                                    <FaTrash className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button onClick={() => addArrayItem('skills')}>Add Skill</Button>

                        <h2 className="text-xl font-semibold mt-6 mb-2">Languages</h2>
                        {resumeData.languages.map((language, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Input
                                    placeholder="Language"
                                    value={language}
                                    onChange={(e) => handleArrayInputChange('languages', index, e.target.value)}
                                />
                                <Button variant="outline" size="icon" onClick={() => removeArrayItem('languages', index)}>
                                    <FaTrash className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button onClick={() => addArrayItem('languages')}>Add Language</Button>
                    </div>

                    <div className="mt-8 space-y-4">
                        <Button onClick={handlePublish}>
                            Publish Resume
                        </Button>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 lg:pl-8 overflow-x-auto">
                    <h2 className="text-2xl font-bold mb-4">Resume Preview</h2>
                    <div className="min-w-[800px]">
                        <div id="resume-to-download" ref={resumeRef}
                            className="border p-4 rounded-lg resume-preview">
                            <ResumePreview data={resumeData} />
                        </div>
                    </div>
                </div>

                {showAlert && (
                    <Alert className="fixed bottom-4 right-4">
                        <AlertTitle>Cannot Delete</AlertTitle>
                        <AlertDescription>
                            You must have at least one experience entry.
                        </AlertDescription>
                        <Button onClick={() => setShowAlert(false)}>OK</Button>
                    </Alert>
                )}

                <AlertDialog open={showSignInAlert} onOpenChange={setShowSignInAlert}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>You have to sign in First</AlertDialogTitle>
                            <AlertDialogDescription>
                                You need to sign in to publish your resume. Please note: after signing in, you&apos;ll need to recreate your resume as input fields will reset.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => route.push('/signin')}>Sign In</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <AlertDialog open={showPublishConfirmation} onOpenChange={setShowPublishConfirmation}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Publish</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to publish your resume? Please make sure you have filled in all the details correctly.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleConfirmPublish}>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                {showRedirectMessage && (
                    <Alert className="fixed bottom-4 right-4">
                        <AlertTitle>Resume Published</AlertTitle>
                        <AlertDescription>
                            Your resume has been published and opened in a new tab. If you don't see it, please check your popup blocker settings.
                        </AlertDescription>
                        <Button onClick={() => setShowRedirectMessage(false)}>OK</Button>
                    </Alert>
                )}
            </div>
        </Suspense>
    )
}

