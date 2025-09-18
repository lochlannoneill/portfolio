import './App.css'
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Certifications from './components/Certifications/Certifications';
import Projects from './components/Projects/Projects';

function App() {
  return (
    <div id="home" className="text-sm bg-white dark:bg-gray-900 md:text-lg lg:text-xl transition-colors duration-300">
      <Navbar />

      <main className="pt-0 md:pt-16">
          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row 4xl:gap-6 justify-center">
              {/* Left: sticky profile (becomes top on mobile) */}
              <aside className="px-0 md:px-6">
                <div className="lg:sticky lg:top-24">
                  <Profile />
                </div>
              </aside>

              {/* Right: content */}
              <section className="">
                <Experience />
                <Education />
                <Certifications />
              </section>
            </div>
            <section className="w-full mt-6">
              <Projects />
            </section>
          </div>
      </main>
    </div>
  )
}

export default App
