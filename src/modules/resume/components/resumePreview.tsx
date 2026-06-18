import type { ResumeData } from "@/types/resume.types";

interface ResumePreviewProps {
  resume: ResumeData;
}

export const ResumePreview = ({ resume }: ResumePreviewProps) => {
  return (
    <div className="bg-white text-gray-800 p-8 shadow-md rounded-lg font-sans max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-300 pb-4 mb-4">
        <h1 className="text-3xl font-bold">{resume.name}</h1>
        <p className="text-lg text-gray-600">{resume.headline}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.location && <span>{resume.location}</span>}
          {resume.linkedin && <span>LinkedIn: {resume.linkedin}</span>}
          {resume.github && <span>GitHub: {resume.github}</span>}
          {resume.portfolio && <span>Portfolio: {resume.portfolio}</span>}
          {resume.npm && <span>npm: {resume.npm}</span>}
        </div>
      </div>

      {/* Targeting */}
      {(resume.targetCompany || resume.targetJobTitle || resume.targeting) && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Target</h2>
          <p>
            {resume.targetJobTitle} at {resume.targetCompany}
            {resume.targeting && ` – ${resume.targeting}`}
          </p>
        </div>
      )}

      {/* Summary */}
      {resume.summary && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p>{resume.summary}</p>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          {resume.skills.map((category, idx) => (
            <div key={idx} className="mb-2">
              <h3 className="font-medium">{category.category}</h3>
              <ul className="list-disc list-inside">
                {category.items.map((item, i) => (
                  <li key={i}>
                    {item.name} {item.highlight && "⭐"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Experience</h2>
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between">
                <span className="font-bold">{exp.title}</span>
                <span className="text-sm text-gray-600">
                  {exp.company}, {exp.location}
                </span>
              </div>
              <div className="text-sm text-gray-500">{exp.date}</div>
              <ul className="list-disc list-inside mt-1">
                {exp.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education && (
        <div>
          <h2 className="text-xl font-semibold">Education</h2>
          <p>{resume.education}</p>
        </div>
      )}

      {/* npm Packages */}
      {resume.npmPackages && resume.npmPackages.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">npm Packages</h2>
          <ul className="list-disc list-inside">
            {resume.npmPackages.map((pkg, i) => (
              <li key={i}>{pkg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
