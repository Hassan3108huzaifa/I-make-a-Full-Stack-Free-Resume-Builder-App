import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClassicResume from '@/components/resumes/ClassicResume';
import ModernResume from '@/components/resumes/ModernResume';
import CreativeResume from '@/components/resumes/CreativeResume';
import ExecutiveResume from '@/components/resumes/ExecutiveResume';
import MinimalistResume from '@/components/resumes/MinimalistsResume';
import TechResume from '@/components/resumes/TechResume';
import DesignerResume from '@/components/resumes/DesignerResume';
import CorporateProfessionalResume from '@/components/resumes/CorporateResume'
import AcademicCV from '@/components/resumes/AcadmicResume'
import BoldModernResume from '@/components/resumes/BlodModern'
import CreativeProfessionalResume from '@/components/resumes/CreativeProfessionalResume'
import { ResumeData } from '../../../../types/resume';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import DownloadButtons from '@/components/DownloadButtons';

// Function to check if ObjectId is valid
function isValidObjectId(id: string): boolean {
  return ObjectId.isValid(id);
}

// Fetches resume data based on the provided ID
async function getResumeData(id: string) {
  // Check if ID is valid
  if (!isValidObjectId(id)) {
    return null;
  }

  try {
    const client = await clientPromise;
    const db = client.db("resumeforge");
    const resume = await db.collection("resumes").findOne({ _id: new ObjectId(id) });

    if (!resume) {
      return null;
    }

    return {
      resumeData: resume.data as ResumeData,
      theme: resume.theme as string
    };
  } catch (error) {
    console.error('Error fetching resume data:', error);
    return null;
  }
}

// Dynamically set metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  const resumeData = await getResumeData(id);

  if (!resumeData) {
    return {
      title: 'Resume Not Found',
      description: 'The requested resume does not exist.',
    };
  }

  const pageTitle = `${resumeData.resumeData.name} - ${resumeData.theme.charAt(0).toUpperCase() + resumeData.theme.slice(1)} Resume | FreeResumeBuilder`;
  const pageDescription = `Explore a professional ${resumeData.theme} resume created with freeresumebuilder. Customize your CV to stand out and showcase your skills.`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [`${resumeData.theme} resume`, 'professional resume', 'CV', 'freeresumebuilder'],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://freeresumebuilder-h.vercel.app/resume/${id}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
    },
  };
}

// The main ResumePage component
export default async function ResumePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const resumeData = await getResumeData(id);

  if (!resumeData) {
    notFound();
  }

  // Mapping resume theme to the corresponding component
  const ResumeComponent = {
    'classic': ClassicResume,
    'modern': ModernResume,
    'creative': CreativeResume,
    'minimalist': MinimalistResume,
    'executive': ExecutiveResume,
    'tech': TechResume,
    'designer': DesignerResume,
    'academic': AcademicCV,
    'blod': BoldModernResume,
    'corporate': CorporateProfessionalResume,
    'creativepro': CreativeProfessionalResume,
  }[resumeData.theme.toLowerCase()] || ClassicResume;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">{resumeData.resumeData.name}&apos;s Resume</h1>
        <DownloadButtons resumeData={resumeData} />
      </div>
      <div className="overflow-x-auto">
        <div className="border p-4 rounded-lg min-w-[800px]" id="resume-content">
          <ResumeComponent data={resumeData.resumeData} />
        </div>
      </div>
    </div>
  );
}