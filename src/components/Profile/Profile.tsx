import { faDownload } from "@fortawesome/free-solid-svg-icons";
import resumePdf from '../../assets/lochlann_oneill_resume.pdf';
import coverPdf from '../../assets/lochlann_oneill_cover.pdf';
import profileImg from '../../assets/profile.jpeg';
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
  <section id="profile" className="relative md:rounded-3xl md:shadow-lg md:dark:shadow-[0_8px_40px_8px_rgba(0,0,0,0.45)] md:max-w-lg lg:max-w-xl mx-auto overflow-hidden transition-all duration-300 bg-transparent md:bg-white md:dark:bg-slate-900">
        {/* top background image with black overlay */}
  <div className="relative h-36 overflow-hidden bg-black">
          <img
            src={backgroundImg}
            alt="Background"
            className="w-full h-full object-cover [filter:blur(2px)] md:[filter:blur(1.5px)]"
          />
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>

  <div className="relative flex flex-col p-4 xl:p-6 -mt-28 md:-mt-32">
        {/* profile image + name/email side by side */}
        <div className="flex items-center space-x-4">
          <a
            href="https://www.linkedin.com/in/lochlannoneill/"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-32 md:w-36 h-32 md:h-36 rounded-full border-5 border-gray-100 dark:border-gray-900 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 hover:scale-95"
          >
            <img
              src={profileImg}
              alt="Profile"
              className="w-full h-full rounded-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-90"
            />
          </a>
          <div className="flex flex-col -mt-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
              <span className="hidden lg:inline xl:hidden">Lochlann</span>
              <span className="inline lg:hidden xl:inline">Lochlann O Neill</span>
            </h2>
            <p className="text-sm md:text-base lg:text-sm xl:text-base text-gray-300 font-semibold">lochlannjoneill@gmail.com</p>
          </div>
        </div>

        {/* skills section */}
        <Skills />

        {/* bio section */}
        <p className="text-gray-700 dark:text-gray-300 text-center text-lg md:text-xl mt-4 transition-colors duration-300">
          Hi! I'm a passionate software developer who loves to learn new technologies!
        </p>

        {/* links section */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://github.com/lochlannoneill" target="_blank" rel="noopener noreferrer" className="group rounded-full p-2 transition-all duration-300 hover:scale-105 shadow-[inset_0_2px_12px_rgba(0,0,0,0.25)] dark:shadow-[inset_0_4px_24px_4px_rgba(0,0,0,0.65)] bg-white dark:bg-purple-700 dark:hover:bg-purple-900">
            <FontAwesomeIcon icon={faGithub} className="text-2xl text-purple-700 group-hover:text-white dark:text-white dark:group-hover:text-white transition-all duration-300" />
          </a>
          <a href="https://linkedin.com/in/lochlannoneill" target="_blank" rel="noopener noreferrer" className="group rounded-full p-2 transition-all duration-300 hover:scale-105 shadow-[inset_0_2px_12px_rgba(0,0,0,0.25)] dark:shadow-[inset_0_4px_24px_4px_rgba(0,0,0,0.65)] bg-white dark:bg-blue-700 dark:hover:bg-blue-900">
            <FontAwesomeIcon icon={faLinkedin} className="text-2xl text-blue-700 group-hover:text-white dark:text-white dark:group-hover:text-white transition-all duration-300" />
          </a>
          <a href="https://www.youtube.com/channel/UCfh3sXBVlA8N5Da3ms8n1Sg" target="_blank" rel="noopener noreferrer" className="group rounded-full p-2 transition-all duration-300 hover:scale-105 shadow-[inset_0_2px_12px_rgba(0,0,0,0.25)] dark:shadow-[inset_0_4px_24px_4px_rgba(0,0,0,0.65)] bg-white dark:bg-red-600 dark:hover:bg-red-800">
            <FontAwesomeIcon icon={faYoutube} className="text-2xl text-red-600 group-hover:text-white dark:text-white dark:group-hover:text-white transition-all duration-300" />
          </a>
          <a href="https://leetcode.com/u/lochlannoneill/" target="_blank" rel="noopener noreferrer" className="group rounded-full p-2 transition-all duration-300 hover:scale-105 shadow-[inset_0_2px_12px_rgba(0,0,0,0.25)] dark:shadow-[inset_0_4px_24px_4px_rgba(0,0,0,0.65)] bg-white dark:bg-amber-400 dark:hover:bg-amber-500">
            <FontAwesomeIcon icon={faCode} className="text-2xl text-amber-400 group-hover:text-white dark:text-white dark:group-hover:text-white transition-all duration-300" />
          </a>
          <a href="mailto:lochlannjoneill@gmail.com" target="_blank" rel="noopener noreferrer" className="group rounded-full p-2 transition-all duration-300 hover:scale-105 shadow-[inset_0_2px_12px_rgba(0,0,0,0.25)] dark:shadow-[inset_0_4px_24px_4px_rgba(0,0,0,0.65)] bg-white dark:bg-green-600 dark:hover:bg-green-700">
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-green-600 group-hover:text-white dark:text-white dark:group-hover:text-white transition-all duration-300" />
          </a>
        </div>
        
        {/* Resume and cover letter download buttons side-by-side */}
        <div className="flex justify-center gap-4 mt-6">
          <a
            href={resumePdf}
            download
            className="flex items-center gap-2 bg-blue-700 dark:bg-blue-800 hover:bg-blue-800 dark:hover:bg-blue-900 text-white font-semibold px-8 py-3 text-lg sm:px-6 sm:py-2 sm:text-base rounded-md shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faDownload} className="text-xl sm:text-lg" />
            Resume
          </a>
          <a
            href={coverPdf}
            download
            className="flex items-center gap-2 bg-green-700 dark:bg-green-800 hover:bg-green-800 dark:hover:bg-green-900 text-white font-semibold px-8 py-3 text-lg sm:px-6 sm:py-2 sm:text-base rounded-md shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faDownload} className="text-xl sm:text-lg" />
            <span className="sm:hidden">Cover</span>
            <span className="hidden sm:inline">Cover Letter</span>
          </a>
        </div>

      </div>

      </section>
    </FadeInSection>
  );
}

export default Profile;