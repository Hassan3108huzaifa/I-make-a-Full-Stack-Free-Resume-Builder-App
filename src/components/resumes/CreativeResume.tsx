import { ResumeData } from '../../../types/resume'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaTools, FaLanguage } from 'react-icons/fa'
import Image from 'next/image'
export default function CreativeResume({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white p-8 max-w-4xl mx-auto shadow-lg rounded-lg">
      <header className="text-center mb-8">
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
        <h1 className="text-5xl font-bold mb-2">{data.name}</h1>
        <div className="flex justify-center space-x-4">
          <span className="flex items-center"><FaEnvelope className="mr-2" />{data.email}</span>
          <span className="flex items-center"><FaPhone className="mr-2" />{data.phone}</span>
          <span className="flex items-center"><FaMapMarkerAlt className="mr-2" />{data.address}</span>
        </div>
      </header>
      
      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-inner">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-purple-600 flex items-center">
            <FaBriefcase className="mr-2" /> Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-purple-600 flex items-center">
              <FaBriefcase className="mr-2" /> Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4 bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-700">{exp.position}</h3>
                <p className="text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                <p className="text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-purple-600 flex items-center">
              <FaGraduationCap className="mr-2" /> Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4 bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-700">{edu.degree} in {edu.fieldOfStudy}</h3>
                <p className="text-gray-600">{edu.institution} | {edu.graduationDate}</p>
              </div>
            ))}
            
            <h2 className="text-2xl font-semibold mt-6 mb-2 text-purple-600 flex items-center">
              <FaTools className="mr-2" /> Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
            
            <h2 className="text-2xl font-semibold mt-6 mb-2 text-purple-600 flex items-center">
              <FaLanguage className="mr-2" /> Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((language, index) => (
                <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  {language}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}