// Experience.tsx
import vodafoneLogo from "../../assets/logos/vodafone.png";
import bostonLogo from "../../assets/logos/boston.jpg";
import microsoftLogo from "../../assets/logos/microsoft.png";
import FadeInSection from "../../FadeInSection";
import { useState, useRef } from "react";

type ExperienceItem = {
  title: string;
  company: string;
  dates: string;
  tags: string[];
  bullets?: string[];
  logo: string;
  defaultOpen?: boolean;
};

const EXPERIENCES: ExperienceItem[] = [
    {
    title: "Software Engineer",
    company: "Microsoft",
    dates: "December 2025 - Present",
    logo: microsoftLogo,
    defaultOpen: true,
    tags: ["C#", "C++", ".NET", "Coyote", "Azure"],
    bullets: [
      "Contributing to the Azure Batch scheduler",
      "Participating in on-call rotation",
    ],
  },
  {
    title: "Graduate Software Engineer",
    company: "Vodafone",
    dates: "May 2025 - Present",
    logo: vodafoneLogo,
    tags: ["Java", "Quarkus", "Kubernetes", "Docker", "MongoDB"],
    bullets: [
      "Contributed to Java microservices development with Quarkus and Kubernetes, gaining experience in scalable and containerized applications.",
      "Maintained >80% unit test coverage, ensuring code quality and reliability.",
      "Collaborated in an Agile team, participating in daily stand-ups, planning, refinements, and retrospectives.",
      "Utilized CI/CD pipelines for automated testing and deployment, enhancing development efficiency.",
      "Engaged in code reviews and pair programming, fostering a culture of continuous learning and improvement.",
    ],
  },
  {
    title: "Graduate Network Infrastructure Management & Deployment",
    company: "Vodafone",
    dates: "August 2024 - May 2025",
    logo: vodafoneLogo,
    tags: ["Sunbird DCIM", "Excel"],
    bullets: [
      "Audited 100% of datacenter assets on-site, ensuring precise asset tracking and laying the foundation for a successful cloud migration.",
      "Migrated 70% of datacenter assets to Sunbird DCIM, enabling real-time analytics that improved operational efficiency, reduced downtime and power costs, enhanced scalability, and supported data-driven decision-making for stakeholders.",
      "Collaborated with cross-functional teams to communicate daily device planning and decommissioning updates to system owners to ensure alignment and operational transparency.",
      "Voluntary collaboration with the App Test Automation team to develop Selenium-based web test scripts, contributing towards application robustness.",
    ],
  },
  {
    title: "Co-Op Software Engineer",
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
          <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Experience</h2>
        </FadeInSection>

        <div className="space-y-3">
          {EXPERIENCES.map((exp, i) => {
            const isOpen = openIdx === i;
            const isComingSoon = exp.dates.includes("Coming Soon");
            return (
              <FadeInSection key={i}>
                <div
                  className={`scroll-mt-28 group rounded-lg border transition-all duration-300 cursor-pointer relative
                    ${isComingSoon ? "border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 opacity-60 hover:bg-gray-200 dark:hover:bg-gray-700" :
                    isOpen ? "border-blue-400 dark:border-blue-600 bg-blue-100 dark:bg-blue-800 shadow-lg" : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"}
                    ${!isComingSoon ? "hover:bg-blue-200 dark:hover:bg-blue-800 hover:border-blue-500" : ""} focus:outline-none`}
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
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className={`h-10 w-10 object-contain rounded ${isComingSoon ? "grayscale opacity-50" : ""}`}
                      />
                      <div>
                        <h3 className="text-base lg:text-xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">{exp.company}</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm font-medium transition-colors duration-300">{exp.dates}</p>
                      </div>
                    </div>
                    {/* chevron icon */}
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10">
                      <svg
                        className={`h-6 w-6 lg:h-8 lg:w-8 transition-all duration-300 ${isOpen ? "rotate-180" : ""} ${isComingSoon ? "fill-gray-400 dark:fill-gray-600" : isOpen ? "fill-blue-500 dark:fill-blue-300" : "fill-gray-400 dark:fill-gray-600"}`}
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
                    className={`transition-all duration-800 ease-in-out overflow-hidden px-4 md:px-6 ${isOpen ? 'max-h-96 overflow-y-auto opacity-100 pb-3 md:pb-4 space-y-3 custom-scrollbar-blue' : 'max-h-0 opacity-0 pb-0 space-y-0'}`}
                    style={{
                      transitionProperty: 'max-height, opacity, padding-bottom',
                    }}
                  >
                    {/* tags */}
                    <div className="flex flex-wrap gap-2 py-3 m-0">
                      {exp.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={
                            isComingSoon
                              ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs md:text-sm font-medium px-3 py-1 rounded-full transition-colors duration-300"
                              : isOpen
                              ? "bg-blue-200 dark:bg-blue-950 text-blue-800 dark:text-blue-200 text-xs md:text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-400 dark:hover:bg-blue-900 transition-colors duration-300"
                              : "bg-blue-200 dark:bg-blue-950 text-blue-800 dark:text-blue-200 text-xs md:text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-400 dark:hover:bg-blue-900 transition-colors duration-300"
                          }
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* bullet list */}
                    {exp.bullets && (
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 transition-colors duration-300">
                        {exp.bullets.map((b, idx) => (
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

export default Experience;
