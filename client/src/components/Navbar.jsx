import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import './Navbar.css'

const navItems = [
  { name: 'Home',           link: '#home' },
  { name: 'About',          link: '#about' },
  { name: 'Skills',         link: '#skills' },
  { name: 'Projects',       link: '#projects' },
  { name: 'Timeline',       link: '#timeline' },
  { name: 'Certifications', link: '#certifications' },
  { name: 'Contact',        link: '#contact' },
]

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen]       = useState(false)
  const observerRef                        = useRef(null)
  const isDark = theme === 'dark'

  useEffect(() => {
    const sectionIds = navItems.map(item => item.link.substring(1))

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // trigger only when section is at viewport center
      threshold: 0,
    })

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current.observe(el)
    })

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [])

  const handleNavClick = (e, itemName, link) => {
    e.preventDefault()
    setActiveSection(itemName.toLowerCase())
    setIsMenuOpen(false)
    const target = document.querySelector(link)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="navbar-wrapper">

      <motion.nav
        className={`navbar-pill ${isDark ? 'nav-dark' : 'nav-light'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="nav-row">

          {/* LOGO — "Portfolio" */}
          <motion.a
            href="#home"
            className="nav-logo"
            onClick={e => handleNavClick(e, 'home', '#home')}
            whileHover={{ scale: 1.05 }}
          >
            Portfolio<span className="logo-dot">.</span>
          </motion.a>

          <div className="desktop-links">
            {navItems.map((item) => {
              const isActive = activeSection === item.name.toLowerCase()
              return (
                <a
                  key={item.name}
                  href={item.link}
                  className="nav-link-wrapper"
                  onClick={e => handleNavClick(e, item.name, item.link)}
                >
                  <motion.span
                    className={`nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.span>

                
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="nav-indicator"
                    />
                  )}
                </a>
              )
            })}
          </div>


          <div className="nav-actions">

            {/* SUN/MOON TOGGLE */}
            <motion.button
              className={`theme-btn ${isDark ? 'theme-btn-dark' : 'theme-btn-light'}`}
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>

            {/* CONTACT ME */}
            <motion.a
              href="#contact"
              className="hire-btn desktop-only"
              onClick={e => handleNavClick(e, 'contact', '#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>

            {/*mobile only */}
            <motion.button
              className={`hamburger-btn mobile-only ${isDark ? 'hamburger-dark' : 'hamburger-light'}`}
              onClick={() => setIsMenuOpen(o => !o)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <span className={`ham-line ${isMenuOpen ? 'ham-1-open' : ''}`} />
              <span className={`ham-line ${isMenuOpen ? 'ham-2-open' : ''}`} />
              <span className={`ham-line ${isMenuOpen ? 'ham-3-open' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={`mobile-menu ${isDark ? 'mobile-menu-dark' : 'mobile-menu-light'}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.name.toLowerCase()
                return (
                  <a
                    key={item.name}
                    href={item.link}
                    className="mobile-link-wrapper"
                    onClick={e => handleNavClick(e, item.name, item.link)}
                  >
                    <motion.div
                      className={`mobile-link-item ${isActive
                        ? isDark ? 'mobile-active-dark' : 'mobile-active-light'
                        : ''}`}
                      whileHover={{ x: 5 }}
                    >
                      <span className={isActive ? 'nav-link-active' : 'nav-link-inactive'}>
                        {item.name}
                      </span>
                    </motion.div>
                  </a>
                )
              })}

              {/* Contact Me in mobile menu */}
              <motion.a
                href="#contact"
                className="mobile-hire-btn"
                onClick={e => handleNavClick(e, 'contact', '#contact')}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  )
}