import './App.css'
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import SectionNavigation from './components/Profile/SectionNavigation';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Certifications from './components/Certifications/Certifications';
import Projects from './components/Projects/Projects';

function App() {
  return (
    <div id="home" className="text-sm bg-white dark:bg-gray-900 md:text-lg lg:text-xl transition-colors duration-300">
      <Navbar />

      <main className="pt-0 md:pt-16">
          <div className="flex flex-col lg:gap-12 lg:pb-12">
            <div className="flex flex-col lg:flex-row 4xl:gap-6 justify-center">
              {/* Left: sticky profile (becomes top on mobile) */}
              <aside className="px-0 md:p-4">
                <div className="lg:sticky lg:top-24">
                  <Profile />
                  <div className="hidden md:block">
                    <SectionNavigation />
                  </div>
                </div>
              </aside>

              {/* Right: content */}
              <section>
                <Experience />
                <Education />
                <Certifications />
              </section>
            </div>
            <section>
              <Projects />
            </section>
          </div>
      </main>
    </div>
  )
}

export default App
