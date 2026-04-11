import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Certifications from './sections/Certifications'
import Contact from './sections/Contact'
import './App.css'

function HomePage() {
  return (
    <>
      <Hero />            {/* id="home" */}
      <About />           {/* id="about" */}
      <Skills />          {/* id="skills" */}
      <Projects />        {/* id="projects" */}
      <Experience />      {/* id="timeline" */}
      <Certifications />  {/* id="certifications" */}
      <Contact />         {/* id="contact" */}
    </>
  )
}

function App() {
  const { theme } = useTheme()

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, offset: 100 })
  }, [])

  useEffect(() => {
    AOS.refresh()
  }, [theme])

  return (
    <Router>
      <div className={`app-wrapper ${theme === 'dark' ? 'app-dark' : 'app-light'}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <HomePage />
            </main>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App