import type { ResumeData } from "@/types/resume.types";
import "../styles/resumeStyles.css";
import type { JSX } from "react/jsx-runtime";

interface TemplateProps {
  resume: ResumeData;
}

export const StandardTemplate = ({ resume }: TemplateProps) => {
  const {
    name,
    location,
    phone,
    email,
    linkedin,
    portfolio,
    github,
    npm,
    targeting,
    headline,
    summary,
    skills,
    experience,
    npmPackages,
    education,
  } = resume;

  // Helper to render skill items with highlight support
  const renderSkillItems = (items: { name: string; highlight: boolean }[]) => {
    return items.map((item, index) => {
      if (item.highlight) {
        return <strong key={index}>{item.name}</strong>;
      }
      return <span key={index}>{item.name}</span>;
    });
  };

  // Parse npm package format: "name - description"
  const parseNpmPackage = (pkg: string) => {
    const parts = pkg.split(" - ");
    return {
      name: parts[0] || pkg,
      description: parts.slice(1).join(" - ") || "",
    };
  };

  // Helper to join skill items with commas
  const joinSkillItems = (items: { name: string; highlight: boolean }[]) => {
    const rendered = renderSkillItems(items);
    return rendered.reduce(
      (acc, curr, idx) => {
        if (idx > 0) {
          return [...acc, ", ", curr];
        }
        return [curr];
      },
      [] as (string | JSX.Element)[],
    );
  };

  return (
    <div className="backend-template">
      {/* ===== REUSABLE HEADER ===== */}
      <div className="header">
        <h1>{name.toUpperCase()}</h1>

        <div className="contact-line">
          {location} | {phone} | {email}
        </div>

        <div className="contact-links">
          {linkedin && (
            <>
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn Profile
              </a>
              {portfolio || github || npm ? " | " : ""}
            </>
          )}
          {portfolio && (
            <>
              <a href={portfolio} target="_blank" rel="noopener noreferrer">
                Portfolio Website
              </a>
              {github || npm ? " | " : ""}
            </>
          )}
          {github && (
            <>
              <a href={github} target="_blank" rel="noopener noreferrer">
                Github Profile
              </a>
              {npm ? " | " : ""}
            </>
          )}
          {npm && (
            <a href={npm} target="_blank" rel="noopener noreferrer">
              NPM Profile
            </a>
          )}
        </div>

        {targeting && <div className="targeting">{targeting}</div>}
      </div>

      {/* ===== RESUME BODY ===== */}
      {headline && (
        <div className="headline">
          <strong>{headline}</strong>
        </div>
      )}

      {summary && <div className="summary">{summary}</div>}

      {skills && skills.length > 0 && (
        <>
          <h2>Technical Skills</h2>
          {skills.map((cat, index) => (
            <div key={index} className="skill-row">
              <strong>{cat.category}: </strong>
              {joinSkillItems(cat.items)}
            </div>
          ))}
        </>
      )}

      {experience && experience.length > 0 && (
        <>
          <h2>Work Experience</h2>
          {experience.map((job, index) => (
            <div key={index} className="job">
              <div className="job-main">
                {job.title} {job.company} — {job.location}
              </div>
              <div className="job-date">{job.date}</div>
              <ul>
                {job.bullets.map((bullet, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: bullet }} />
                ))}
              </ul>
            </div>
          ))}
        </>
      )}

      {/* {npmPackages && npmPackages.length > 0 && (
        <>
          <h2>Open Source</h2>
          <ul className="open-source-list">
            {npmPackages.map((pkg, index) => {
              const { name: pkgName, description } = parseNpmPackage(pkg);
              return (
                <li key={index}>
                  <strong>{pkgName}</strong> : {description}
                </li>
              );
            })}
          </ul>
        </>
      )} */}

      {/* ===== EDUCATION (UPDATED) ===== */}
      {education && education.length > 0 && (
        <>
          <h2>Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="edu-main">
                <strong>{edu.degree}</strong> in {edu.fieldOfStudy}
                {edu.institution && ` — ${edu.institution}`}
              </div>
              {edu.startDate && (
                <div className="edu-date">
                  {edu.startDate}
                  {edu.endDate && ` - ${edu.endDate}`}
                </div>
              )}
              {edu.gpa && <div className="edu-gpa">GPA: {edu.gpa}</div>}
              {edu.honors && edu.honors.length > 0 && (
                <div className="edu-honors">
                  <strong>Honors:</strong> {edu.honors.join(", ")}
                </div>
              )}
              {edu.courses && edu.courses.length > 0 && (
                <div className="edu-courses">
                  <strong>Relevant Courses:</strong> {edu.courses.join(", ")}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
