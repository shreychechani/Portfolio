import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Certifications.css'

const CERTS = [
  {
    title: 'Add Your Certificate',
    issuer: 'e.g. NPTEL / Coursera / LinkedIn Learning',
    date: '2024',
    color: '#f97316',
    link: '#',
    placeholder: true,
  },
  {
    title: 'Add Your Certificate',
    issuer: 'e.g. Udemy / HackerRank',
    date: '2024',
    color: '#38bdf8',
    link: '#',
    placeholder: true,
  },
  {
    title: 'Add Your Certificate',
    issuer: 'e.g. Google / AWS',
    date: '2024',
    color: '#10b981',
    link: '#',
    placeholder: true,
  },
]

const ACHIEVEMENTS = [
  {
    title: '75% Academic Scholarship',
    desc: 'Awarded by JK Lakshmipat University for outstanding academic entrance performance.',
    color: '#f59e0b',
  },
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal').forEach(r => r.classList.add('visible'))
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

export default function Certifications() {
  const ref = useReveal()

  return (
    <section id="certifications" ref={ref}>
      <div className="container">

        <div className="reveal">
          <p className="section-label">Certifications & Achievements</p>
          <h2 className="section-title">Recognition & <span>Credentials</span></h2>
          <p className="section-sub">
            Certifications and notable achievements from my journey.
          </p>
        </div>

        <p className="cert-group-label reveal">Certificates</p>
        <div className="certs-grid">
          {CERTS.map((cert, i) => (
            <motion.div
              key={i}
              className={`cert-card reveal delay-${i + 1} ${cert.placeholder ? 'cert-placeholder' : ''}`}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div
                className="cert-top"
                style={{ borderBottomColor: cert.color + '30' }}
              >
                <span className="cert-emoji">{cert.emoji}</span>
                {cert.placeholder && (
                  <span className="cert-add-tag">Add yours</span>
                )}
              </div>
              <div className="cert-body">
                <h4
                  className="cert-title"
                  style={{ color: cert.placeholder ? 'var(--text-3)' : 'var(--text)' }}
                >
                  {cert.title}
                </h4>
                <p className="cert-issuer" style={{ color: cert.color }}>
                  {cert.issuer}
                </p>
                <div className="cert-footer">
                  <span className="cert-date">{cert.date}</span>
                  {!cert.placeholder && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="cert-verify"
                      style={{ color: cert.color }}
                    >
                      Verify ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="cert-group-label reveal" style={{ marginTop: 48 }}>Achievements</p>
        <div className="achievements-list">
          {ACHIEVEMENTS.map((ach, i) => (
            <motion.div
              key={i}
              className={`ach-card reveal delay-${i + 1}`}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div
                className="ach-icon-wrap"
                style={{
                  background: ach.color + '18',
                  border: `1px solid ${ach.color}30`,
                }}
              >
                <span className="ach-icon">{ach.emoji}</span>
              </div>
              <div>
                <h4 className="ach-title">{ach.title}</h4>
                <p className="ach-desc">{ach.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}