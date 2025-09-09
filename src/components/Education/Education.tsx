// Education.tsx
import "./Education.css";
import mtuLogo from "../../assets/logos/mtu.png";
import ctiLogo from "../../assets/logos/cti.jpg";
import FadeInSection from "../../FadeInSection";
import React, { useState } from "react";

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
    tags: ["Software Development", "Computer Science"],
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
    tags: ["Software Development", "Computer Science"],
    bullets: [
      "Graduated with First Class Honours.",
      "Focused on the core concepts of computer science and the fundamentals of backend/web development.",
    ],
  }
];

function Education() {
  const [openIdx, setOpenIdx] = useState<number | null>(
    EDUCATION.findIndex(e => e.defaultOpen)
  );

  return (
    <section id="education" className="bg-white rounded-lg w-full p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
        </FadeInSection>

        <div className="space-y-3">
          {EDUCATION.map((edu, i) => {
            const isOpen = openIdx === i;
            return (
              <FadeInSection key={i}>
                <div
                  tabIndex={0}
                  role="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") setOpenIdx(isOpen ? null : i);
                  }}
                  className={`group rounded-lg border border-gray-200 transition-colors duration-200 cursor-pointer
                    ${isOpen ? "bg-green-50" : ""}
                    hover:bg-green-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300`}
                >
                  <div className="flex items-center justify-between px-4 py-3">
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
                      className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
                  </div>
                  {isOpen && (
                    <div className="px-6 pb-4 space-y-3">
                      <div className="flex flex-wrap gap-2 mt-3">
                        {edu.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-green-100 text-green-700 text-xs md:text-sm font-medium px-3 py-1 rounded-full hover:bg-green-300 transition"
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
                  )}
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Education;
