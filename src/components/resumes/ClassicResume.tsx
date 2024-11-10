import { ResumeData } from '../../../types/resume'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import Image from 'next/image'

export default function ClassicResume({ data }: { data: ResumeData }) {
  return (
    <div className="font-serif bg-white text-gray-800 p-8 max-w-4xl mx-auto shadow-lg">
      <header className="border-b-2 border-gray-300 pb-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-2 flex flex-wrap gap-4">
              <span className="flex items-center"><FaEnvelope className="mr-2" />{data.email}</span>
              <span className="flex items-center"><FaPhone className="mr-2" />{data.phone}</span>
              <span className="flex items-center"><FaMapMarkerAlt className="mr-2" />{data.address}</span>
            </div>
          </div>
          {data.picture && (
            <Image
              src={data.picture}
              alt={data.name}
              width={128}  // width and height for the image
              height={128}
              className="rounded-full object-cover"
            />
            )}
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Professional Summary</h2>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
            <p className="text-gray-700">{exp.company} | {exp.startDate} - {exp.endDate}</p>
            <p className="text-gray-600 mt-2">{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
            <p className="text-gray-700">{edu.institution} | {edu.graduationDate}</p>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap justify-between">
        <section className="w-full md:w-1/2 pr-4 mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Skills</h2>
          <ul className="list-disc list-inside text-gray-700">
            {data.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="w-full md:w-1/2 pl-4 mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Languages</h2>
          <ul className="list-disc list-inside text-gray-700">
            {data.languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}