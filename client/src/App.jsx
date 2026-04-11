import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Certifications from './sections/Certifications'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import './App.css'

function HomePage() {
  return (
    <>
      <Hero />        {/* id="hero" */}
      <About />       {/* id="about" */}
      <Skills />      {/* id="skills" */}
      <Projects />    {/* id="projects" */}
      <Experience />  {/* id="timeline" */}
      <Certifications /> {/* id="certifications" */}
      <Contact />     {/* id="contact" */}
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">
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