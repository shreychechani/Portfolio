import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Certifications.css'

const CERTS = [
  {
    title: 'Introduction to C++',
    issuer: 'Coding Ninjas',
    date: '2023',
    color: '#f97316',
    link: 'https://certificate.codingninjas.com/view/6d8d8f7161b76da7',
    placeholder: false,
  },
  {
    title: 'Python Programming',
    issuer: 'Coursera',
    date: '2023',
    color: '#38bdf8',
    link: 'https://coursera.org/share/38020fc3aa83863bcc4642aff94359e5',
    placeholder: false,
  },
  {
    title: 'Exploring C',
    issuer: 'Coursera',
    date: '2024',
    color: '#10b981',
    link: 'https://coursera.org/share/09a55ad998014b64fbfe983d8be6008e',
    placeholder: false,
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
              className="cert-card reveal"
              whileHover={{ y: -4 }}
            >
              <div
                className="cert-top"
                style={{ borderBottomColor: cert.color + '30' }}
              />

              <div className="cert-body">
                <h4 className="cert-title">{cert.title}</h4>

                <p className="cert-issuer" style={{ color: cert.color }}>
                  {cert.issuer}
                </p>

                <span className="cert-date">{cert.date}</span>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-btn"
                >
                  View Certificate →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="cert-group-label reveal" style={{ marginTop: 48 }}>
          Achievements
        </p>

        <div className="achievements-list">
          {ACHIEVEMENTS.map((ach, i) => (
            <motion.div
              key={i}
              className="ach-card reveal"
              whileHover={{ x: 4 }}
            >
              <div
                className="ach-icon-wrap"
                style={{
                  background: ach.color + '18',
                  border: `1px solid ${ach.color}30`,
                }}
              />

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