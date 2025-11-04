// Certifications.tsx
import microsoftLogo from "../../assets/logos/microsoft.png";
import solasLogo from "../../assets/logos/solas.png";
import FadeInSection from "../../FadeInSection";
import { useState, useRef } from "react";

type CertificationItem = {
  title: string;
  institution: string;
  dates: string;
  logo: string;
  tags: string[];
  bullets?: string[];
  defaultOpen?: boolean;
};

const CERTIFICATION: CertificationItem[] = [
  {
    title: "AZ-204: Developing Solutions for Microsoft Azure",
    institution: "Microsoft",
    dates: "Coming Soon",
    logo: microsoftLogo,
    tags: ["Cloud Computing", "Azure", "Cloud Native"],
    bullets: [
      "Developed and deployed cloud applications using Azure services.",
      "Implemented secure cloud solutions following best practices.",
      "Integrated Azure services with on-premises systems.",
    ],
  },
  {
    title: "AZ-900: Microsoft Azure Fundamentals",
    institution: "Microsoft",
    dates: "October 2025",
    logo: microsoftLogo,
    tags: ["Cloud Computing", "Azure"],
    defaultOpen: true,
    bullets: [
      "Demonstrated foundational knowledge of cloud computing concepts, including high availability, scalability, and cost management.",
      "Gained understanding of core Azure services such as compute, networking, storage, and databases.",
      "Developed awareness of Azure governance, security, compliance, and privacy features.",
      "Explored Azure pricing, support plans, and service-level agreements (SLAs)."
    ],
  },
  {
    title: "Safe Pass",
    institution: "SOLAS",
    dates: "January 2025",
    logo: solasLogo,
    tags: ["Health & Safety", "Datacenter Access"],
    bullets: [
      "Mandatory training for safe working practices on construction sites and datacenters.",
    ],
  }
];

function Certifications() {
  const [openIdx, setOpenIdx] = useState<number | null>(
    CERTIFICATION.findIndex(c => c.defaultOpen)
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section id="certifications" className="w-full p-4 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Certifications</h2>
        </FadeInSection>
        <div className="space-y-3">
          {CERTIFICATION.map((cert, i) => {
            const isOpen = openIdx === i;
            const isComingSoon = cert.dates.includes("Coming Soon");
            return (
              <FadeInSection key={i}>
                <div
                  className={`scroll-mt-28 group rounded-lg border transition-colors duration-300 cursor-pointer relative
                    ${isComingSoon ? "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 opacity-60" :
                    isOpen ? "border-purple-400 dark:border-purple-500 bg-purple-100 dark:bg-purple-900" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"}
                    ${!isComingSoon ? "hover:bg-purple-200 dark:hover:bg-purple-800 hover:border-purple-500" : ""} focus:outline-none`}
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
                        src={cert.logo}
                        alt={`${cert.institution} logo`}
                        className={`h-10 w-10 object-contain rounded ${isComingSoon ? "grayscale opacity-50" : ""}`}
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-300">{cert.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{cert.institution}</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm font-medium transition-colors duration-300">{cert.dates}</p>
                      </div>
                    </div>
                    {/* chevron */}
                    <span className="flex-shrink-0 flex items-center justify-center w-7 h-7">
                        <svg
                          className={`h-5 w-5 transition-all duration-300 ${isOpen ? "rotate-180" : ""} ${isOpen ? "fill-purple-500 dark:fill-purple-300" : "fill-gray-400 dark:fill-gray-600"}`}
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
                      {cert.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={
                            isComingSoon
                              ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs md:text-sm font-medium px-3 py-1 rounded-full transition-colors duration-300"
                              : isOpen
                              ? "bg-purple-300 dark:bg-purple-950 text-purple-800 dark:text-purple-200 text-xs md:text-sm font-medium px-3 py-1 rounded-full hover:bg-purple-400 dark:hover:bg-purple-900 transition-colors duration-300"
                              : "bg-purple-300 dark:bg-purple-950 text-purple-800 dark:text-purple-200 text-xs md:text-sm font-medium px-3 py-1 rounded-full hover:bg-purple-400 dark:hover:bg-purple-900 transition-colors duration-300"
                          }
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* bullet list */}
                    {cert.bullets && (
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 transition-colors duration-300">
                        {cert.bullets.map((b, idx) => (
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

export default Certifications;
