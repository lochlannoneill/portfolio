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

      <main className="container mx-auto pt-0 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6">
          {/* Left: sticky profile (becomes top on mobile) */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Profile />
            </div>
          </aside>

          {/* Right: content */}
          <section className="lg:col-span-8">
            <Experience />
            <Education />
            <Certifications />
          </section>

          <section className="lg:col-span-12">
            <Projects />
          </section>

        </div>
      </main>
    </div>
  )
}

export default App
