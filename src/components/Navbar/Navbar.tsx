import { useEffect, useState, useRef } from "react";
import DarkModeToggle from "./DarkModeToggle";
import profileImg from "../../assets/profile.png";

function Navbar() {
  // Light/Dark mode toggle
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check for explicit class first (for SSR hydration), else use system preference
      if (document.documentElement.classList.contains('dark')) return true;
      if (document.documentElement.classList.contains('light')) return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  const [atTop, setAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(true); // default true for mobile
  const [navCentered, setNavCentered] = useState(true); // navlinks centered by default
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const handleVisibility = () => {
      if (window.innerWidth < 768) {
        setShowProfile(true);
        setNavCentered(true);
        if (observer) {
          observer.disconnect();
          observer = null;
        }
        return;
      }
      const section = document.getElementById('projects');
      if (!section) return;
      if (observer) observer.disconnect();
      observer = new window.IntersectionObserver(
        (entries) => {
          const inView = entries[0].isIntersecting;
          setShowProfile(inView);
          setNavCentered(!inView);
        },
        { threshold: 0.1 }
      );
      observer.observe(section);
    };
    handleVisibility();
    window.addEventListener('resize', handleVisibility);
    return () => {
      window.removeEventListener('resize', handleVisibility);
      if (observer) observer.disconnect();
    };
  }, []);

  // Change: Use a percent-based threshold for the hamburger color
  useEffect(() => {
    const handleScroll = () => {
      // 5% of the viewport height
      const threshold = window.innerHeight * 0.1;
      setAtTop(window.scrollY <= threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  const navLinks = (
    <>
      <a
        href="#home"
        className="block md:inline text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 p-8 font-medium md:border-0 border-t border-gray-200 dark:border-gray-800 first:border-t-0 drop-shadow-[0_1px_2px_white] dark:drop-shadow-[0_1px_2px_black] transition-colors duration-300"
      >
        Home
      </a>
      <a
        href="#experience"
        className="block md:inline text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 p-8 font-medium md:border-0 border-t border-gray-200 dark:border-gray-800 drop-shadow-[0_1px_2px_white] dark:drop-shadow-[0_1px_2px_black] transition-colors duration-300"
      >
        Experience
      </a>
      <a
        href="#education"
        className="block md:inline text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 p-8 font-medium md:border-0 border-t border-gray-200 dark:border-gray-800 drop-shadow-[0_1px_2px_white] dark:drop-shadow-[0_1px_2px_black] transition-colors duration-300"
      >
        Education
      </a>
      <a
        href="#certifications"
        className="block md:inline text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 p-8 font-medium md:border-0 border-t border-gray-200 dark:border-gray-800 drop-shadow-[0_1px_2px_white] dark:drop-shadow-[0_1px_2px_black] transition-colors duration-300"
      >
        Certifications
      </a>
      <a
        href="#projects"
        className="block md:inline text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 p-8 font-medium md:border-0 border-t border-gray-200 dark:border-gray-800 drop-shadow-[0_1px_2px_white] dark:drop-shadow-[0_1px_2px_black] transition-colors duration-300"
      >
        Projects
      </a>
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 [transition:backdrop-filter_0.4s,background-color_0.4s] bg-transparent ${atTop ? '' : 'backdrop-blur-md'} md:backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between lg:justify-center h-18">
          {/* Grouped: profile/name, navlinks, dark mode toggle */}
          <div className={`flex items-center gap-2 md:gap-8 flex-1 transition-colors duration-500
            md:justify-center md:translate-x-0
            ${!navCentered ? 'md:justify-end md:translate-x-10' : ''}
          `.replace('flex-1', '')} style={{ transitionProperty: 'all' }}>
            {/* Profile + name */}
            <div
              className={`flex items-center transition-opacity duration-300 ${
                atTop ? "opacity-0" : "opacity-100"
              } ${!showProfile ? 'md:opacity-0 md:pointer-events-none' : ''}`}
            >
              {showProfile && (
                <>
                  <img
                    src={profileImg}
                    alt="Profile Picture"
                    className="h-10 w-10 mr-2 rounded-full"
                  />
                  <a href="#home" className="text-xl font-bold text-gray-800 dark:text-white drop-shadow-[0_1px_2px_white] dark:drop-shadow-[0_1px_2px_black] transition-colors duration-300">
                    <span className="lg:hidden">Lochlann</span>
                    <span className="hidden lg:inline">Lochlann O Neill</span>
                  </a>
                </>
              )}
            </div>
            {/* Navlinks */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {navLinks}
              </div>
            </div>
            {/* Dark mode toggle: desktop only */}
            <span className="hidden lg:inline">
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </span>
          </div>
          {/* Right: mobile hamburger and dark mode toggle group */}
          <div className="max-lg:flex lg:hidden items-center gap-2">
            {/* Dark mode toggle: mobile and md only */}
            <span className="inline lg:hidden">
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </span>
            <button
              ref={btnRef}
              type="button"
              aria-label="Open menu"
              aria-haspopup="menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(v => !v)}
              className={`inline-flex items-center justify-center rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-opacity
                ${mobileOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              {/* Only one icon is mounted at a time */}
              {!mobileOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-9 w-9 transition-colors duration-300 ${atTop ? "text-white" : "text-gray-500"} drop-shadow-[0_1px_4px_white] dark:text-white`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : null}
            </button>
          </div>
        </div>
      </div>
  {/* Mobile overlay + slide-down panel (show for screens < lg) */}
  <div className={`lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Backdrop below navbar */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`fixed inset-x-0 bottom-0 top-16 bg-black/30 dark:bg-black/60 transition-opacity duration-200 z-40 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Menu panel starts below navbar and has its own close button */}
        <div
          id="mobile-menu"
          role="menu"
          aria-label="Mobile navigation"
          className={`fixed right-4 left-4 top-4 rounded-2xl bg-gray-100 dark:bg-gray-900 shadow-xl ring-1 ring-black/5 dark:ring-white/10 transition-transform transition-opacity duration-300 px-4 pt-4 z-[60]
              ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>
          <div className="space-y-1" onClick={() => setMobileOpen(false)}>
            <div className="flex flex-col space-y-1 text-lg font-semibold">{navLinks}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
