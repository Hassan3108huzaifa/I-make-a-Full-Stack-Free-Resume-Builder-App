'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Send, CheckCircle } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';
import { useSession } from 'next-auth/react';

const faqs = [
    {
        question: 'How does this resume builder work?',
        answer: 'Our resume builder guides you through creating a professional resume step-by-step. You fill in your details, and we format them into a polished resume.',
    },
    {
        question: 'Can I edit my resume after creating it?',
        answer: 'Yes, you can always come back and edit your resume. Just log in to update your details at any time.',
    },
    {
        question: 'Is this resume builder free?',
        answer: 'Yes, our resume builder is completely free—no hidden charges, no premium plans, just 100% free.',
    },
    {
        question: 'Is my personal information safe?',
        answer: 'Absolutely! We prioritize your privacy and security. Your account and personal information are protected, and we do not share your data with third parties.',
    },
    {
        question: 'Can I download my resume in PDF format?',
        answer: 'Yes, once your resume is complete, you can easily download it in PDF format for printing or sharing.',
    },
    {
        question: 'Is the service reliable and always available?',
        answer: 'Yes, our service is designed to be reliable and available 24/7, ensuring you can access your resume anytime without interruption.',
    }
];



const FAQ = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleAnswer = (index: any) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
        >
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={false}
                        animate={{ backgroundColor: expandedIndex === index ? 'rgba(59, 130, 246, 0.1)' : 'transparent' }}
                        transition={{ duration: 0.3 }}
                        className="border rounded-lg overflow-hidden"
                    >
                        <button
                            className="flex justify-between items-center w-full p-4 text-left"
                            onClick={() => toggleAnswer(index)}
                        >
                            <span className="font-medium">{faq.question}</span>
                            <motion.div
                                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                            </motion.div>
                        </button>
                        <AnimatePresence>
                            {expandedIndex === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="p-4 bg-gray-50">
                                        <p>{faq.answer}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default function ContactPage() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPublishConfirmation, setShowPublishConfirmation] = useState(false);
    const { toast } = useToast();
    const { data: session, status } = useSession();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!session) {
            setShowPublishConfirmation(true);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email: session.user?.email,
                    message,
                }),
            });

            if (response.ok) {
                toast({
                    title: 'Message sent!',
                    description: 'We\'ll get back to you as soon as possible.',
                });
                setName('');
                setMessage('');
                setIsSubmitted(true);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Failed to send message. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (status === 'unauthenticated') {
            toast({
                title: 'You are not logged in!',
                description: 'Please log in to contact us.',
                variant: 'destructive',
            });
        }
    }, [status, toast]);

    const handleConfirmPublish = () => {
        setShowPublishConfirmation(false);
        toast({
            title: 'Please log in',
            description: 'You need to log in to send a message.',
            variant: 'destructive',
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">Contact Free Resume Builder</h1>
                <p className="text-center text-lg mb-12 text-gray-600">
                    Have questions or feedback? We&apos;d love to hear from you!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Get in Touch</CardTitle>
                            <CardDescription>Fill out the form and we&apos;ll get back to you as soon as possible.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <Textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        className="mt-1"
                                        rows={4}
                                    />
                                </div>
                                <Button type="submit" disabled={isSubmitting || isSubmitted} className="w-full bg-blue-500 hover:bg-blue-600">
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : isSubmitted ? (
                                        <>
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Sent!
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>Here are other ways to reach us.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-gray-600">huzaifa3108hassan@gmail.com</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Phone</h3>
                                <p className="text-gray-600">+92 3161097202</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Address</h3>
                                <p className="text-gray-600">
                                    Block Sector 9C<br />
                                    Baldia Town, Saeedabad, 75760<br />
                                    Pakistan
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Social Media</h3>
                                <div className="flex space-x-4 mt-2">
                                    <a href="https://github.com/hassan3108huzaifa" target='_blank' className="text-blue-600 hover:text-blue-800 transition-colors">Github</a>
                                    <a href="https://www.linkedin.com/in/hassan-rj-148220295/" target='_blank' className="text-blue-600 hover:text-blue-800 transition-colors">LinkedIn</a>
                                    <a href="https://www.facebook.com/profile.php?id=100067756576220" target='_blank' className="text-blue-600 hover:text-blue-800 transition-colors">Facebook</a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>

            <FAQ />

            <AlertDialog open={showPublishConfirmation} onOpenChange={setShowPublishConfirmation}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Login Required</AlertDialogTitle>
                        <AlertDialogDescription>
                            You need to log in before submitting your message. Would you like to log in now?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowPublishConfirmation(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmPublish}>Log In</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}