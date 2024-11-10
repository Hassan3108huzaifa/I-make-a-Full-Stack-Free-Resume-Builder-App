import { ResumeData } from '../../../types/resume';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

export default function TechResume({ data }: { data: ResumeData }) {
  return (
    <div className="font-mono bg-gray-900 text-green-400 p-8 max-w-4xl mx-auto">
      <header className="border-b-2 border-green-500 pb-4 mb-6">
        <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
        <p className="text-xl mb-4">{data.experience[0]?.position || 'Software Developer'}</p>
        <div className="flex flex-wrap gap-4">
          <a href={`mailto:${data.email}`} className="flex items-center">
            <FaEnvelope className="mr-2" />
            {data.email}
          </a>
          <a href={`tel:${data.phone}`} className="flex items-center">
            <FaPhone className="mr-2" />
            {data.phone}
          </a>
        </div>
      </header>

      <main className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-2 text-green-500">
            <span className="text-gray-500">{'>>'} Summary</span>
          </h2>
          <p>{data.summary}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2 text-green-500">
            <span className="text-gray-500">{'>>'} Technical Skills</span>
          </h2>
          <ul className="list-none flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <li key={index} className="bg-green-800 text-green-200 px-2 py-1 rounded">{skill}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2 text-green-500">
            <span className="text-gray-500">{'>>'} Professional Experience</span>
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-bold">{exp.position} @ {exp.company}</h3>
              <p className="text-green-300">{exp.startDate} - {exp.endDate}</p>
              <p className="mt-2">{exp.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2 text-green-500">
            <span className="text-gray-500">{'>>'} Education</span>
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-xl font-bold">{edu.degree} in {edu.fieldOfStudy}</h3>
              <p>{edu.institution} | {edu.graduationDate}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2 text-green-500">
            <span className="text-gray-500">{'>>'} Languages</span>
          </h2>
          <ul className="list-none flex flex-wrap gap-2">
            {data.languages.map((language, index) => (
              <li key={index} className="bg-green-800 text-green-200 px-2 py-1 rounded">{language}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2 text-green-500">
            <span className="text-gray-500">{'>>'} Personal Projects</span>
          </h2>
          <ul className="list-disc list-inside">
            <li>Developed a real-time chat application using WebSockets and React</li>
            <li>Created a machine learning model for predictive analysis of stock prices</li>
            <li>Contributed to various open-source projects, improving code quality and adding features</li>
          </ul>
        </section>
      </main>
    </div>
  );
}