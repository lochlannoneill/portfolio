import React from "react";

interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, setDarkMode }) => (
  <button
    type="button"
    aria-label="Toggle dark mode"
    onClick={() => setDarkMode(!darkMode)}
    className={`relative w-16 h-8 flex items-center rounded-full p-1 transition-colors mx-2 cursor-pointer
      ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
    title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    {/* Track */}
    <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none select-none">
      {/* Sun icon left (unselected in dark mode) */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" fill="currentColor" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 4.95l-1.41-1.41M6.34 6.34l-1.41-1.41m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
      </svg>
      {/* Moon icon right (unselected in light mode) */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="currentColor" />
      </svg>
    </div>
    {/* Slider circle */}
    <span
      className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-md flex items-center justify-center transition-colors duration-300 transform transition-transform duration-300
        ${darkMode ? 'bg-blue-500 translate-x-8 rotate-[360deg]' : 'bg-yellow-400 translate-x-0 rotate-0'}`}
    >
      {darkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" />
          <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 4.95l-1.41-1.41M6.34 6.34l-1.41-1.41m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
        </svg>
      )}
    </span>
  </button>
);

export default DarkModeToggle;
