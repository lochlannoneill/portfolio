// Experience.tsx
import vodafoneLogo from "../../assets/logos/vodafone.png";
import bostonLogo from "../../assets/logos/boston.jpg";
import FadeInSection from "../../FadeInSection";
import { useState, useRef } from "react";

type ExperienceItem = {
  title: string;
  company: string;
  dates: string;
  tags: string[];
  bullets: string[];
  logo: string;
  defaultOpen?: boolean;
};

const EXPERIENCES: ExperienceItem[] = [
  {
    title: "Graduate Software Engineer",
    company: "Vodafone",
    dates: "May 2025 - Present",
    logo: vodafoneLogo,
    defaultOpen: true,
    tags: ["Java", "Quarkus", "Kubernetes", "Docker", "MongoDB", "Git", "Agile"],
    bullets: [
      "Contributed to Java microservices development with Quarkus and Kubernetes, gaining experience in scalable and containerized applications.",
      "Maintained >80% unit test coverage, ensuring code quality and reliability.",
      "Collaborated in an Agile team, participating in daily stand-ups, planning, refinements, and retrospectives to deliver high-quality software.",
      "Utilized CI/CD pipelines for automated testing and deployment, enhancing development efficiency.",
      "Engaged in code reviews and pair programming, fostering a culture of continuous learning and improvement.",
    ],
  },
  {
    title: "Graduate Network Infrastructure Management & Deployment",
    company: "Vodafone",
    dates: "August 2024 - May 2025",
    logo: vodafoneLogo,
    tags: ["Sunbird DCIM", "Asset Management", "Excel", "Cloud Migration", "Selenium", "HTML", "CSS", "JavaScript"],
    bullets: [
      "Audited 100% of datacenter assets on-site, ensuring precise asset tracking and laying the foundation for a successful cloud migration.",
      "Migrated 70% of datacenter assets to Sunbird DCIM, enabling real-time analytics that improved operational efficiency, reduced downtime and power costs, enhanced scalability, and supported data-driven decision-making for stakeholders.",
      "Collaborated with cross-functional teams to communicate daily device planning and decommissioning updates to system owners to ensure alignment and operational transparency.",
      "Voluntary collaboration with the App Test Automation team to develop Selenium-based web test scripts, contributing towards application robustness.",
    ],
  },
  {
    title: "Intern Software Engineer",
    company: "Boston Scientific",
    dates: "March 2021 - August 2021",
    logo: bostonLogo,
    tags: ["C#", "Excel"],
    bullets: [
      "Participated in a rotational program, gaining exposure to multiple teams and learning different aspects of software development and operations.",
      "Helped migrate factory system data into SharePoint, improving accessibility and organization for the team.",
      "Assisted with code reviews of in-house software to check specification alignment and support component ID format updates."
    ],
  },
];

function Experience() {
  const [openIdx, setOpenIdx] = useState<number | null>(
    EXPERIENCES.findIndex(e => e.defaultOpen)
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
  <section id="experience" className="w-full p-4 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Experience</h2>
        </FadeInSection>

        <div className="space-y-3">
          {EXPERIENCES.map((exp, i) => {
            const isOpen = openIdx === i;
            return (
              <FadeInSection key={i}>
                <div
                  className={`scroll-mt-28 group rounded-lg ${isOpen ? "border-2" : "border"} border-gray-200 dark:border-gray-700 transition-colors duration-300 cursor-pointer
                    ${isOpen ? "bg-purple-100 border-purple-400 dark:bg-[#4b206b] dark:border-purple-500" : "bg-white dark:bg-gray-900"}
                    hover:bg-purple-200 dark:hover:bg-purple-800 hover:border-purple-500 focus:outline-none`}
                  ref={el => { cardRefs.current[i] = el; }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isOpen}
                  onClick={() => {
                    const wasClosed = openIdx !== i;
                    setOpenIdx(isOpen ? null : i);
                    if (wasClosed && window.innerWidth < 1024) {
                      setTimeout(() => {
                        cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 10);
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      const wasClosed = openIdx !== i;
                      setOpenIdx(isOpen ? null : i);
                      if (wasClosed && window.innerWidth < 1024) {
                        setTimeout(() => {
                          cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 10);
                      }
                    }
                  }}
                >
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center space-x-4">
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="h-10 w-10 object-contain rounded"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{exp.company}</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm font-medium transition-colors duration-300">{exp.dates}</p>
                      </div>
                    </div>
                    {/* chevron icon */}
                    <span className="flex-shrink-0 flex items-center justify-center w-7 h-7">
                      <svg
                        className={`h-5 w-5 transition-all duration-300 ${isOpen ? "rotate-180" : ""} fill-gray-400 dark:fill-gray-600 ${isOpen ? 'fill-purple-500 dark:fill-purple-300' : ''}`}
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
                    className={`transition-all duration-800 ease-in-out overflow-hidden px-4 md:px-6 ${isOpen ? 'opacity-100 pb-3 md:pb-4 space-y-3' : 'max-h-0 opacity-0 pb-0 space-y-0'}`}
                    style={{
                      transitionProperty: 'max-height, opacity, padding-bottom',
                    }}
                  >
                    {/* tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={
                            isOpen
                              ? "bg-purple-300 dark:bg-purple-950 text-purple-800 dark:text-purple-200 text-xs md:text-sm font-medium px-3 py-1 rounded-full hover:bg-purple-400 dark:hover:bg-purple-900 transition-colors duration-300"
                              : "bg-purple-300 dark:bg-purple-950 text-purple-800 dark:text-purple-200 text-xs md:text-sm font-medium px-3 py-1 rounded-full hover:bg-purple-400 dark:hover:bg-purple-900 transition-colors duration-300"
                          }
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* bullet list */}
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 transition-colors duration-300">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
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

export default Experience;
