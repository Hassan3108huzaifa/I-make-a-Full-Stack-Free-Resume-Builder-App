import { ResumeData } from '../../../types/resume'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import Image from 'next/image'

export default function BoldModernResume({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans bg-gray-100 text-gray-800 p-8 max-w-4xl mx-auto shadow-2xl">
      <header className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-8 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-2">{data.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center"><FaEnvelope className="mr-2" />{data.email}</span>
              <span className="flex items-center"><FaPhone className="mr-2" />{data.phone}</span>
              <span className="flex items-center"><FaMapMarkerAlt className="mr-2" />{data.address}</span>
            </div>
          </div>
          {data.picture && (
            <Image
              src={data.picture}
              alt={data.name}
              width={150}
              height={150}
              className="rounded-full object-cover border-4 border-white shadow-lg"
            />
          )}
        </div>
      </header>

      <main className="bg-white p-8 rounded-b-lg">
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4 text-red-600">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-red-600">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-8 border-l-4 border-pink-500 pl-4">
              <h3 className="text-2xl font-semibold text-gray-900">{exp.position}</h3>
              <p className="text-xl text-pink-600 font-medium">{exp.company} | {exp.startDate} - {exp.endDate}</p>
              <p className="text-gray-700 mt-2 text-lg">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-red-600">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-2xl font-semibold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
              <p className="text-xl text-pink-600">{edu.institution} | {edu.graduationDate}</p>
            </div>
          ))}
        </section>

        <div className="flex flex-wrap justify-between">
          <section className="w-full md:w-1/2 pr-4 mb-10">
            <h2 className="text-3xl font-bold mb-6 text-red-600">Skills</h2>
            <ul className="list-none text-gray-700 space-y-2">
              {data.skills.map((skill, index) => (
                <li key={index} className="inline-block bg-red-100 rounded-full px-4 py-2 text-lg font-semibold text-red-600 mr-2 mb-2">{skill}</li>
              ))}
            </ul>
          </section>

          <section className="w-full md:w-1/2 pl-4 mb-10">
            <h2 className="text-3xl font-bold mb-6 text-red-600">Languages</h2>
            <ul className="list-none text-gray-700 space-y-2">
              {data.languages.map((language, index) => (
                <li key={index} className="inline-block bg-pink-100 rounded-full px-4 py-2 text-lg font-semibold text-pink-600 mr-2 mb-2">{language}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}