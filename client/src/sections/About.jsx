import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './About.css'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal').forEach(r => r.classList.add('visible'))
          obs.disconnect() // stop watching once revealed
        }
      },
      { threshold: 0.1 } 
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

export default function About() {
  const ref = useReveal()

  return (
    // id="about" must match the navbar link href="#about"
    <section id="about" ref={ref}>
      <div className="container">

        {/* ── Section heading ── */}
        <div className="reveal">
          <p className="section-label">About Me</p>
          <h2 className="section-title">Who I <span>Am</span></h2>
          <p className="section-sub">A developer who builds things that matter.</p>
        </div>

        <div className="about-grid">

          <motion.div
            className="about-card about-bio reveal delay-1"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >

            <h3>Know Me</h3>
            <p>
              I'm Shrey Chechani, a B.Tech Computer Science student at JK
              Lakshmipat University, Jaipur. My journey started with curiosity
              about how software systems work and has grown into a deep passion
              for full-stack development, machine learning, and blockchain
              technology.
            </p>
            <p style={{ marginTop: 12 }}>
              I thrive at the intersection of data and product — building
              things that actually solve real problems. Currently exploring
              AI-powered applications and decentralised systems.
            </p>
            <div className="interest-tags">
              {['Full-Stack Dev','Machine Learning','Blockchain',
                'Computer Vision','Research','Open Source'].map(tag => (
                <span key={tag} className="interest-tag">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* DETAILS CARD */}
          <motion.div
            className="about-card reveal delay-2"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3>Details</h3>
            <div className="detail-rows">
              {[
                { icon: '📍', label: 'Jaipur, Rajasthan, India' },
                { icon: '🎓', label: 'B.Tech CS — JKLU, 2023–2027' },
                { icon: '📧', label: 'shreychechani@gmail.com' },
              ].map(item => (
                <div key={item.label} className="detail-row">
                  <span className="detail-icon">{item.icon}</span>
                  <span className="detail-text">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}