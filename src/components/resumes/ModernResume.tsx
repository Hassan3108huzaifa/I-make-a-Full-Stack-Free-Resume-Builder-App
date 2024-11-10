import { ResumeData } from '../../../types/resume'

export default function ModernResume({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans">
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
        <p>{data.email} | {data.phone} | {data.address}</p>
      </div>
      
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">Summary</h2>
        <p>{data.summary}</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold">{exp.company}</h3>
            <p className="text-gray-600">{exp.position} | {exp.startDate} - {exp.endDate}</p>
            <p>{exp.description}</p>
          </div>
        ))}
        
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold">{edu.institution}</h3>
            <p>{edu.degree} in {edu.fieldOfStudy} | {edu.graduationDate}</p>
          </div>
        ))}
        
        <div className="flex mt-6">
          <div className="w-1/2 pr-4">
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">Skills</h2>
            <ul className="list-disc list-inside">
              {data.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="w-1/2 pl-4">
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">Languages</h2>
            <ul className="list-disc list-inside">
              {data.languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}