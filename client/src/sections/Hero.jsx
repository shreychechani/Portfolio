import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import About from "./sections/About"
import Skills from "./sections/Skills"
import Projects from "./sections/Projects"
import Timeline from "./sections/Experience" // 👈 important
import Certifications from "./sections/Certifications"
import Contact from "./sections/Contact"

import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from "react"

const App = () => {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, offset: 100 });
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={darkMode
      ? 'bg-gradient-to-br from-gray-900 via-[#0d182e] to-gray-900 min-h-screen'
      : 'bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen'}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero darkMode={darkMode} />
      <About darkMode={darkMode} />
      <Skills darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <Timeline darkMode={darkMode} />
      <Certifications darkMode={darkMode} />
      <Contact darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  )
}

export default App