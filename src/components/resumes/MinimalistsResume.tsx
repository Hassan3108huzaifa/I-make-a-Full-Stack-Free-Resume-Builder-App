import { ResumeData } from '../../../types/resume'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import Image from 'next/image'

export default function ModernMinimalistResume({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans bg-white text-gray-800 p-8 max-w-4xl mx-auto shadow-md">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-5xl font-light text-gray-900 mb-2">{data.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center"><FaEnvelope className="mr-2" />{data.email}</span>
            <span className="flex items-center"><FaPhone className="mr-2" />{data.phone}</span>
            <span className="flex items-center"><FaMapMarkerAlt className="mr-2" />{data.address}</span>
          </div>
        </div>
        {data.picture && (
           <div className="w-28 h-28 rounded-full overflow-hidden">
           <Image
             src={data.picture}
             alt={data.name}
             width={128}
             height={128}
             className="object-cover w-full h-full"
           />
         </div>
        )}
      </header>

      <main className="space-y-8">
        <section>
          <h2 className="text-2xl font-light mb-4 text-gray-800 uppercase tracking-wider">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>

        <section>
          <h2 className="text-2xl font-light mb-4 text-gray-800 uppercase tracking-wider">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
              <p className="text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-light mb-4 text-gray-800 uppercase tracking-wider">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-medium text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
              <p className="text-gray-600">{edu.institution} | {edu.graduationDate}</p>
            </div>
          ))}
        </section>

        <div className="flex flex-wrap justify-between">
          <section className="w-full md:w-1/2 pr-4">
            <h2 className="text-2xl font-light mb-4 text-gray-800 uppercase tracking-wider">Skills</h2>
            <ul className="list-none text-gray-700 space-y-2">
              {data.skills.map((skill, index) => (
                <li key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{skill}</li>
              ))}
            </ul>
          </section>

          <section className="w-full md:w-1/2 pl-4">
            <h2 className="text-2xl font-light mb-4 text-gray-800 uppercase tracking-wider">Languages</h2>
            <ul className="list-none text-gray-700 space-y-2">
              {data.languages.map((language, index) => (
                <li key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{language}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}