import './App.css'
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Certifications from './components/Certifications/Certifications';
import Projects from './components/Projects/Projects';

function App() {
  return (
    <div id="home" className="text-sm md:text-lg lg:text-xl">
      <Navbar />

      <main className="container mx-auto px-4 pt-0 pb-6 md:pt-10 md:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6">
          {/* Left: sticky profile (becomes top on mobile) */}
          <aside className="lg:col-span-4">
            {/* If your Navbar is fixed, adjust `top-*` to its height (e.g., top-20/top-24) */}
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
