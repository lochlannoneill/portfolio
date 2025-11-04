// Education.tsx
import mtuLogo from "../../assets/logos/mtu.png";
import ctiLogo from "../../assets/logos/cti.jpg";
import FadeInSection from "../../FadeInSection";
import { useState, useRef } from "react";

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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section id="education" className="w-full p-4 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Education</h2>
        </FadeInSection>

        <div className="space-y-3">
          {EDUCATION.map((edu, i) => {
            const isOpen = openIdx === i;
            const isComingSoon = edu.dates.includes("Coming Soon");
            return (
              <FadeInSection key={i}>
                <div
                  className={`scroll-mt-28 group rounded-lg border transition-colors duration-300 cursor-pointer relative
                    ${isComingSoon ? "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 opacity-60 hover:bg-gray-200 dark:hover:bg-gray-700" :
                    isOpen ? "border-green-400 dark:border-green-500 bg-green-100 dark:bg-[#064e3b]" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"}
                    ${!isComingSoon ? "hover:bg-green-200 dark:hover:bg-green-800 hover:border-green-500" : ""} focus:outline-none`}
                  style={isComingSoon ? {
                    backgroundImage: `repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 10px,
                      rgba(107, 114, 128, 0.3) 10px,
                      rgba(107, 114, 128, 0.3) 12px
                    )`
                  } : {}}
                  ref={el => { cardRefs.current[i] = el; }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isOpen}
                  onClick={() => {
                    setOpenIdx(isOpen ? null : i);
                    // Removed scroll-into-view logic
                  }}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      setOpenIdx(isOpen ? null : i);
                      // Removed scroll-into-view logic
                    }
                  }}
                >
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center space-x-4">
                      <img
                        src={edu.logo}
                        alt={`${edu.institution} logo`}
                        className={`h-10 w-10 object-contain rounded ${isComingSoon ? "grayscale opacity-50" : ""}`}
                      />
                      <div>
                        <h3 className="text-base lg:text-xl font-bold text-gray-800 dark:text-white transition-colors duration-300">{edu.title}</h3>
                        <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">{edu.institution}</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm font-medium transition-colors duration-300">{edu.dates}</p>
                      </div>
                    </div>
                    {/* chevron */}
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10">
                      <svg
                        className={`h-6 w-6 lg:h-8 lg:w-8 transition-all duration-300 ${isOpen ? "rotate-180" : ""} ${isComingSoon ? "fill-gray-400 dark:fill-gray-600" : isOpen ? "fill-green-500 dark:fill-green-300" : "fill-gray-400 dark:fill-gray-600"}`}
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
                    </span>
                  </div>
                  <div
                    className={`transition-all duration-800 ease-in-out overflow-hidden px-4 md:px-6 ${isOpen ? 'max-h-96 overflow-y-auto opacity-100 pb-3 md:pb-4 space-y-3' : 'max-h-0 opacity-0 pb-0 space-y-0'}`}
                    style={{
                      transitionProperty: 'max-height, opacity, padding-bottom',
                    }}
                  >
                    {/* tags */}
                    <div className="flex flex-wrap gap-2 py-3 m-0">
                      {edu.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={
                            isComingSoon
                              ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs md:text-sm font-medium px-3 py-1 rounded-full transition-colors duration-300"
                              : isOpen
                              ? "bg-green-300 dark:bg-green-950 text-green-900 dark:text-green-200 text-xs md:text-sm font-medium px-3 py-1 rounded-full hover:bg-green-400 dark:hover:bg-green-900 transition-colors duration-300"
                              : "bg-green-300 dark:bg-green-950 text-green-900 dark:text-green-200 text-xs md:text-sm font-medium px-3 py-1 rounded-full hover:bg-green-400 dark:hover:bg-green-900 transition-colors duration-300"
                          }
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* bullet list */}
                    {edu.bullets && (
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 transition-colors duration-300">
                        {edu.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
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
