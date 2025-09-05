// Education.tsx
import "./Education.css";
import mtuLogo from "../../assets/logos/mtu.png";
import ctiLogo from "../../assets/logos/cti.jpg";
import FadeInSection from "../../FadeInSection";

type EducationItem = {
  title: string;
  institution: string;
  dates: string;
  logo: string;
  tags: string[];
  bullets?: string[];
  defaultOpen?: boolean;
};

const EDUCATION: EducationItem[] = [
  {
    title: "BSc (Honours) Software Development",
    institution: "Munster Technological University",
    dates: "September 2018 - May 2023",
    logo: mtuLogo,
    defaultOpen: true,
    tags: ["Computer Science", "Software Development"],
    bullets: [
      "Graduated with First Class Honours.",
      "Focused on backend development, web development, database management, distributed systems, cybersecurity, data analytics and cloud computing.",
      "Completed a final-year project on Unity game development.",
      "Societies: Airsoft, Athletics, Gaming, Programming, Skateboarding, Weightlifting",
    ],
  },
  {
    title: "PLC Software Development",
    institution: "CTI Clonmel",
    dates: "September 2017 - May 2018",
    logo: ctiLogo,
    tags: ["Computer Science", "Software Development"],
    bullets: [
      "Graduated with First Class Honours.",
      "Focused on the core concepts of computer science and the fundamentals of backend/web development.",
    ],
  }
];

function Education() {
  return (
    <section id="education" className="bg-white rounded-lg w-full py-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
        </FadeInSection>

        <div className="space-y-3">
          {EDUCATION.map((edu, i) => (
            <FadeInSection>
              <details
                key={i}
                className="group rounded-lg border border-gray-200 open:border-gray-300 open:bg-gray-50"
                {...(edu.defaultOpen ? { open: true } : {})}
              >
                <summary className="flex items-center justify-between cursor-pointer select-none px-4 py-3">
                  <div className="flex items-center space-x-4">
                    <img
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      className="h-10 w-10 object-contain rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{edu.title}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-gray-500 text-sm">{edu.dates}</p>
                    </div>
                  </div>

                  {/* chevron */}
                  <svg
                    className="h-5 w-5 transition-transform duration-200 group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>

                <div className="px-6 pb-4 space-y-3">
                  <div className="flex flex-wrap gap-2 mt-3">
                    {edu.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-amber-300 transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {edu.bullets && (
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {edu.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  )}

                </div>
              </details>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
