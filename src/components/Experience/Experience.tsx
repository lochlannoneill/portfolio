// Experience.tsx
import "./Experience.css";
import vodafoneLogo from "../../assets/logos/vodafone.png";
import bostonLogo from "../../assets/logos/boston.jpg";
import FadeInSection from "../../FadeInSection";

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
      "Assisted with code reviews of in-house software to check specification alignment and support component ID format updates.",
      "Collaborated with external developers to ensure in-house software met specifications and worked smoothly with vendor systems.",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="bg-white rounded-lg w-full py-4 md:p-6 md:pt-0">
      <div className="max-w-5xl mx-auto">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Experience</h2>
        </FadeInSection>

        <div className="space-y-3">
          {EXPERIENCES.map((exp, i) => (
            <FadeInSection>
              <details
                key={i}
                className="group rounded-lg border border-gray-200 open:border-gray-300 open:bg-gray-50"
                {...(exp.defaultOpen ? { open: true } : {})}
              >
                <summary className="flex items-center justify-between cursor-pointer select-none px-4 py-3">
                  <div className="flex items-center space-x-4">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="h-10 w-10 object-contain rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {exp.title}
                      </h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-gray-500 text-sm">{exp.dates}</p>
                    </div>
                  </div>

                  {/* chevron icon */}
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
                  {/* tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-green-300 transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* bullet list */}
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>

                </div>

              </details>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
