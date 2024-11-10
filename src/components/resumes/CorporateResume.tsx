import { ResumeData } from '../../../types/resume'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import Image from 'next/image'

export default function CorporateProfessionalResume({ data }: { data: ResumeData }) {
  return (
    <div className="font-serif bg-gray-100 text-gray-800 p-8 max-w-4xl mx-auto shadow-xl">
      <header className="bg-blue-900 text-white p-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">{data.name}</h1>
          <div className="mt-2 flex flex-wrap gap-4 text-sm">
            <span className="flex items-center"><FaEnvelope className="mr-2" />{data.email}</span>
            <span className="flex items-center"><FaPhone className="mr-2" />{data.phone}</span>
            <span className="flex items-center"><FaMapMarkerAlt className="mr-2" />{data.address}</span>
          </div>
        </div>
        {data.picture && (
          <Image
            src={data.picture}
            alt={data.name}
            width={120}
            height={120}
            className="rounded-full object-cover border-4 border-white"
          />
        )}
      </header>

      <main className="bg-white p-6 shadow-md">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-900 border-b-2 border-blue-900 pb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-900 border-b-2 border-blue-900 pb-2">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
              <p className="text-blue-700 font-medium">{exp.company} | {exp.startDate} - {exp.endDate}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-900 border-b-2 border-blue-900 pb-2">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
              <p className="text-blue-700">{edu.institution} | {edu.graduationDate}</p>
            </div>
          ))}
        </section>

        <div className="flex flex-wrap justify-between">
          <section className="w-full md:w-1/2 pr-4 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900 border-b-2 border-blue-900 pb-2">Skills</h2>
            <ul className="list-disc list-inside text-gray-700 columns-2">
              {data.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>

          <section className="w-full md:w-1/2 pl-4 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900 border-b-2 border-blue-900 pb-2">Languages</h2>
            <ul className="list-disc list-inside text-gray-700">
              {data.languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}