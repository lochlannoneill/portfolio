import React, { useState, useEffect } from 'react';

interface SectionNavigationProps {}

const SectionNavigation: React.FC<SectionNavigationProps> = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const sections = [
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'projects', label: 'Projects' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      // Calculate scroll progress through the sections (excluding projects from progress calculation)
      const progressSections = sections.filter(section => section.id !== 'projects');
      const firstSection = document.getElementById(progressSections[0].id);
      const lastSection = document.getElementById(progressSections[progressSections.length - 1].id);
      
      if (firstSection && lastSection) {
        const firstSectionTop = firstSection.offsetTop;
        const lastSectionBottom = lastSection.offsetTop + lastSection.offsetHeight;
        const totalSectionHeight = lastSectionBottom - firstSectionTop;
        const currentScrollInSections = Math.max(0, window.scrollY - firstSectionTop);
        const progress = Math.min(100, Math.max(0, (currentScrollInSections / totalSectionHeight) * 100));
        setScrollProgress(progress);
      }

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;

          if (scrollPosition >= elementTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = element.offsetTop - navbarHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="mt-6 p-4 rounded-lg transition-colors duration-300 flex items-start justify-end">
      <ul className="space-y-2 text-right">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-right px-3 py-2 rounded-md font-medium transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                  isActive
                    ? 'text-gray-700 dark:text-gray-300 text-3xl'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 text-2xl'
                }`}
              >
                <div className="flex items-center justify-end">
                  {/* {isActive && (
                    <span className="mr-2 font-bold text-5xl">→</span>
                  )} */}
                  {section.label}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      
      {/* Progress bar */}
      <div className="ml-4 w-1 h-24 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden transition-colors duration-300">
        <div 
          className="absolute top-0 left-0 w-full rounded-full transition-all duration-300 ease-out"
          style={{ height: `${scrollProgress}%`, backgroundColor: '#007AFF' }}
        />
      </div>
    </nav>
  );
};

export default SectionNavigation;