import { faDownload } from "@fortawesome/free-solid-svg-icons";
import resumePdf from '../../assets/lochlann_oneill_resume.pdf';
import profileImg from '../../assets/profile.png';
import backgroundImg from '../../assets/background.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faYoutube} from "@fortawesome/free-brands-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Skills from '../Skills/Skills';
import FadeInSection from '../../FadeInSection';

function Profile() {
  return (
    <FadeInSection>
  <section id="profile" className="relative md:rounded-3xl md:shadow-lg md:dark:shadow-[0_8px_40px_8px_rgba(0,0,0,0.85)] md:max-w-lg lg:max-w-xl mx-auto overflow-hidden transition-colors duration-300">
        {/* top background image with black overlay */}
        <div className="relative h-36 w-screen left-1/2 right-1/2 -translate-x-1/2 md:w-full md:left-0 md:right-0 md:translate-x-0 overflow-hidden bg-black">
          <img
            src={backgroundImg}
            alt="Background"
            className="w-full h-full object-cover [filter:blur(2px)] md:[filter:blur(1.5px)]"
          />
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>

      <div className="relative flex flex-col p-3 sm:p-4 md:p-6 -mt-26 md:-mt-28">
        {/* profile image + name/email side by side */}
        <div className="flex items-center space-x-4 mb-4">
          <a
            href="https://www.linkedin.com/in/lochlannoneill/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <img
              src={profileImg}
              alt="Profile"
              className="w-30 h-30 rounded-full border-5 border-white dark:border-gray-900 transition-all duration-300 group-hover:scale-105 group-hover:brightness-90"
            />
          </a>
          <div className="flex flex-col -mt-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">Lochlann O Neill</h2>
            <p className="text-base text-gray-300 font-semibold">lochlannjoneill@gmail.com</p>
          </div>
        </div>

        {/* skills section */}
        <Skills />

        {/* bio section */}
        <p className="text-gray-700 dark:text-gray-300 text-center text-lg md:text-xl transition-colors duration-300">
          Hi! I'm a passionate software developer who loves to learn new technologies!
        </p>

        {/* links section */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://github.com/lochlannoneill" target="_blank" rel="noopener noreferrer" className="group rounded-full p-2 transition-colors duration-300 hover:scale-105 shadow-[inset_0_2px_12px_rgba(0,0,0,0.25)] dark:shadow-[inset_0_4px_24px_4px_rgba(0,0,0,0.65)] bg-white dark:bg-purple-700 dark:hover:bg-purple-900">
            <FontAwesomeIcon icon={faGithub} className="text-2xl text-purple-700 group-hover:text-purple-900 dark:text-white dark:group-hover:text-white transition-colors duration-300" />
          </a>
          <a href="https://linkedin.com/in/lochlannoneill" target="_blank" rel="noopener noreferrer" className="group rounded-full p-2 transition-colors duration-300 hover:scale-105 shadow-[inset_0_2px_12px_rgba(0,0,0,0.25)] dark:shadow-[inset_0_4px_24px_4px_rgba(0,0,0,0.65)] bg-white dark:bg-blue-700 dark:hover:bg-blue-900">
            <FontAwesomeIcon icon={faLinkedin} className="text-2xl text-blue-700 group-hover:text-blue-900 dark:text-white dark:group-hover:text-white transition-colors duration-300" />
          </a>
          <a href="https://www.youtube.com/channel/UCfh3sXBVlA8N5Da3ms8n1Sg" target="_blank" rel="noopener noreferrer" className="group rounded-full p-2 transition-colors duration-300 hover:scale-105 shadow-[inset_0_2px_12px_rgba(0,0,0,0.25)] dark:shadow-[inset_0_4px_24px_4px_rgba(0,0,0,0.65)] bg-white dark:bg-red-600 dark:hover:bg-red-800">
            <FontAwesomeIcon icon={faYoutube} className="text-2xl text-red-600 group-hover:text-red-800 dark:text-white dark:group-hover:text-white transition-colors duration-300" />
          </a>
          <a href="https://leetcode.com/u/lochlannoneill/" target="_blank" rel="noopener noreferrer" className="group rounded-full p-2 transition-colors duration-300 hover:scale-105 shadow-[inset_0_2px_12px_rgba(0,0,0,0.25)] dark:shadow-[inset_0_4px_24px_4px_rgba(0,0,0,0.65)] bg-white dark:bg-amber-400 dark:hover:bg-amber-500">
            <FontAwesomeIcon icon={faCode} className="text-2xl text-amber-400 group-hover:text-amber-500 dark:text-white dark:group-hover:text-white transition-colors duration-300" />
          </a>
          <a href="mailto:lochlannjoneill@gmail.com" target="_blank" rel="noopener noreferrer" className="group rounded-full p-2 transition-colors duration-300 hover:scale-105 shadow-[inset_0_2px_12px_rgba(0,0,0,0.25)] dark:shadow-[inset_0_4px_24px_4px_rgba(0,0,0,0.65)] bg-white dark:bg-green-600 dark:hover:bg-green-700">
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-green-600 group-hover:text-green-700 dark:text-white dark:group-hover:text-white transition-colors duration-300" />
          </a>
        </div>
        
        {/* Resume download button */}
        <div className="flex justify-center mt-6">
          <a
            href={resumePdf}
            download
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 text-lg sm:px-6 sm:py-2 sm:text-base rounded-md shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <FontAwesomeIcon icon={faDownload} className="text-xl sm:text-lg" />
            Resume
          </a>
        </div>

      </div>

      </section>
    </FadeInSection>
  );
}

export default Profile;