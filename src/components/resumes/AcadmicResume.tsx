import { ResumeData } from '../../../types/resume'

export default function AcademicCV({ data }: { data: ResumeData }) {
  return (
    <div className="font-serif bg-ivory text-gray-800 p-8 max-w-4xl mx-auto">
      <header className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
        <p className="text-xl">{data.experience[0]?.position || 'Academic Researcher'}</p>
        <div className="mt-2">
          <p>{data.email} | {data.phone}</p>
          <p>{data.address}</p>
        </div>
      </header>
      
      <main className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Research Interests</h2>
          <p className="text-gray-600">{data.summary}</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-xl font-semibold">{edu.degree} in {edu.fieldOfStudy}</h3>
              <p>{edu.institution}, {edu.graduationDate}</p>
            </div>
          ))}
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Academic Positions</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold">{exp.position}</h3>
              <p className="italic">{exp.company}, {exp.startDate} - {exp.endDate}</p>
              <p className="mt-1">{exp.description}</p>
            </div>
          ))}
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Publications</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Author, A., & Co-author, B. (Year). Title of the paper. Journal Name, Volume(Issue), pages.</li>
            <li>Author, A., & Co-author, B. (Year). Title of the paper. Journal Name, Volume(Issue), pages.</li>
            {/* Add more publications as needed */}
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Research Skills</h2>
          <ul className="list-disc list-inside text-gray-600">
            {data.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Languages</h2>
          <ul className="list-disc list-inside text-gray-600">
            {data.languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Professional Memberships</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Member, Professional Association Name</li>
            <li>Fellow, Academic Society Name</li>
            {/* Add more memberships as needed */}
          </ul>
        </section>
      </main>
    </div>
  )
}