// Certifications.tsx
import "./Certifications.css";
import microsoftLogo from "../../assets/logos/microsoft.png";
import solasLogo from "../../assets/logos/solas.png";
import FadeInSection from "../../FadeInSection";
import React, { useState } from "react";

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
    defaultOpen: true,
    tags: ["Cloud Computing", "Azure", "Development", "Cloud Native"],
    bullets: [
      "Developed and deployed cloud applications using Azure services.",
      "Implemented secure cloud solutions following best practices.",
      "Integrated Azure services with on-premises systems.",
    ],
  },
  {
    title: "AZ-900: Microsoft Azure Fundamentals",
    institution: "Microsoft",
    dates: "Coming Soon",
    logo: microsoftLogo,
    tags: ["Cloud Computing", "Azure"],
    bullets: [
      "Fundamental knowledge of cloud concepts and core Azure services.",
      "Understanding of security, privacy, compliance, and trust in Azure.",
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

  return (
    <section id="certifications" className="bg-white rounded-lg w-full p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Certifications</h2>
        </FadeInSection>
        
        <div className="space-y-3">
          {CERTIFICATION.map((cert, i) => {
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
                    ${isOpen ? "bg-amber-50" : ""}
                    hover:bg-amber-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300`}
                >
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center space-x-4">
                      <img
                        src={cert.logo}
                        alt={`${cert.institution} logo`}
                        className="h-10 w-10 object-contain rounded"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{cert.title}</h3>
                        <p className="text-gray-600">{cert.institution}</p>
                        <p className="text-gray-500 text-sm">{cert.dates}</p>
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
                        {cert.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-amber-100 text-amber-700 text-xs md:text-sm font-medium px-3 py-1 rounded-full hover:bg-amber-300 transition"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {cert.bullets && (
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {cert.bullets.map((b, idx) => (
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

export default Certifications;
