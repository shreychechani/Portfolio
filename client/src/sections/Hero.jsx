import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'
import './Hero.css'
import profileImg from '../assets/Profile_Photo.jpeg'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function Hero() {
  return (
    <section id="home" className="hero-section">

      <div className="hero-glow-right" />
      <div className="hero-glow-left" />

      <div className="hero-container">
        <div className="hero-inner">

          {/* LEFT */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* GitHub + LinkedIn icon buttons */}
            <div className="hero-socials">
              <a
                href="https://github.com/shreychechani"
                target="_blank" rel="noreferrer"
                className="social-icon-btn"
                title="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
              <a
                href="https://www.linkedin.com/in/shrey-chechani-56a28a205/"
                target="_blank" rel="noreferrer"
                className="social-icon-btn social-li"
                title="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            <h1 className="hero-heading">
              Hi, I'm<br />
              <span className="hero-name">Shrey Chechani</span>
            </h1>
            
            <div className="hero-role">
              <TypeAnimation
                sequence={[
                  'Full-Stack Developer', 2000,
                  'ML Engineer',          2000,
                  'Blockchain Developer', 2000,
                ]}
                wrapper="span"
                speed={50}
                deletionSpeed={70}
                repeat={Infinity}
                className="role-typed"
              />
            </div>

            <p className="hero-bio">
              Computer Science student at JK Lakshmipat University, Jaipur —
              building scalable full-stack web apps, Machine Learning Enthusiast, and exploring
              Blockchain Technology.
            </p>

            <div className="hero-cta">
              <motion.a
                href={`${API}/api/download/cv-pdf`}
                className="btn-orange"
                target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Resume (.pdf)
              </motion.a>

              <motion.a
                href={`${API}/api/download/cv-docx`}
                className="btn-outline-hero"
                target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Resume (.docx)
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT — Photo cutout */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="photo-frame">
              <div className="photo-glow" />
              <img
                src={profileImg}
                alt="Shrey Chechani"
                className="hero-photo"
                onError={e => {
                  if (!e.target.src.includes('jpeg')) {
                    e.target.src = '/assets/profile.jpeg'
                  } else {
                    e.target.src = 'https://ui-avatars.com/api/?name=Shrey+Chechani&background=f97316&color=fff&size=500&bold=true'
                  }
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}