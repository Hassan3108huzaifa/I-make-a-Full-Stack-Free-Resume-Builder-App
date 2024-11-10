import { ResumeData } from '../../../types/resume'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import Image from 'next/image'

export default function CreativeProfessionalResume({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans bg-gradient-to-br from-purple-100 to-pink-100 text-gray-800 p-8 max-w-4xl mx-auto shadow-lg">
      <header className="bg-white rounded-lg p-6 shadow-md mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-purple-600">{data.name}</h1>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center"><FaEnvelope className="mr-2 text-pink-500" />{data.email}</span>
              <span className="flex items-center"><FaPhone className="mr-2 text-pink-500" />{data.phone}</span>
              <span className="flex items-center"><FaMapMarkerAlt className="mr-2 text-pink-500" />{data.address}</span>
            </div>
          </div>
          {data.picture && (
            <Image
              src={data.picture}
              alt={data.name}
              width={100}
              height={100}
              className="rounded-full object-cover border-4 border-purple-200"
            />
          )}
        </div>
      </header>

      <main className="space-y-8">
        <section className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600 border-b-2 border-pink-200 pb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>

        <section className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600 border-b-2 border-pink-200 pb-2">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
              <p className="text-pink-600 font-medium">{exp.company} | {exp.startDate} - {exp.endDate}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600 border-b-2 border-pink-200 pb-2">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
              <p className="text-pink-600">{edu.institution} | {edu.graduationDate}</p>
            </div>
          ))}
        </section>

        <div className="flex flex-wrap justify-between">
          <section className="w-full md:w-1/2 pr-4 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-md h-full">
              <h2 className="text-2xl font-semibold mb-4 text-purple-600 border-b-2 border-pink-200 pb-2">Skills</h2>
              <ul className="list-none text-gray-700 space-y-2">
                {data.skills.map((skill, index) => (
                  <li key={index} className="inline-block bg-purple-100 rounded-full px-3 py-1 text-sm font-semibold text-purple-600 mr-2 mb-2">{skill}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="w-full md:w-1/2 pl-4 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-md h-full">
              <h2 className="text-2xl font-semibold mb-4 text-purple-600 border-b-2 border-pink-200 pb-2">Languages</h2>
              <ul className="list-none text-gray-700 space-y-2">
                {data.languages.map((language, index) => (
                  <li key={index} className="inline-block bg-pink-100 rounded-full px-3 py-1 text-sm font-semibold text-pink-600 mr-2 mb-2">{language}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}