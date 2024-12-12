import { ResumeData } from '../../../types/resume'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBehance, FaDribbble } from 'react-icons/fa'
import Image from 'next/image'
export default function DesignerResume({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans bg-white text-gray-800 p-8 max-w-4xl mx-auto">
      <header className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 transform -skew-y-6 z-0"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 text-white">
          <div>
            <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
            <p className="text-xl">{data.experience[0]?.position || 'Creative Designer'}</p>
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
        </div>
      </header>

      <main className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="md:col-span-1 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-purple-600">Contact</h2>
            <ul className="space-y-2">
              <li className="flex items-center"><FaEnvelope className="mr-2 text-pink-500" />{data.email}</li>
              <li className="flex items-center"><FaPhone className="mr-2 text-pink-500" />{data.phone}</li>
              <li className="flex items-center"><FaMapMarkerAlt className="mr-2 text-pink-500" />{data.address}</li>
              <li className="flex items-center"><FaBehance className="mr-2 text-pink-500" />behance.net/{data.name.toLowerCase().replace(' ', '')}</li>
              <li className="flex items-center"><FaDribbble className="mr-2 text-pink-500" />dribbble.com/{data.name.toLowerCase().replace(' ', '')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-purple-600">Skills</h2>
            <ul className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <li key={index} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">{skill}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-purple-600">Languages</h2>
            <ul className="list-disc list-inside text-gray-700">
              {data.languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </section>
        </aside>

        <div className="md:col-span-2 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-purple-600">About Me</h2>
            <p className="text-gray-700">{data.summary}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-purple-600">Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                <p className="text-gray-600 italic">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                <p className="text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-purple-600">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{edu.degree} in {edu.fieldOfStudy}</h3>
                <p className="text-gray-600 italic">{edu.institution} | {edu.graduationDate}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}