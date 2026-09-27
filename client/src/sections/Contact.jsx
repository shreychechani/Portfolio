import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const CONTACTS = [
  {
    label: 'Email',
    value: 'shreychechani@gmail.com',
    href: 'mailto:shreychechani@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'Shrey Chechani',
    href: 'https://www.linkedin.com/in/shrey-chechani-56a28a205/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: '@shreychechani',
    href: 'https://github.com/shreychechani',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .3a12 12 0 00-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 011.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0012 .3" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Jaipur, Rajasthan, India',
    href: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
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

export default function Contact() {
  const ref = useReveal()

  return (
    <section id="contact" ref={ref}>
      <div className="container">

        <div className="reveal">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's <span>Connect</span></h2>
          <p className="section-sub">
            Open to internships, collaborations, and interesting problems. Reach out anytime.
          </p>
        </div>

        <div className="contact-cards">
          {CONTACTS.map((c, i) => {
            const external = c.href?.startsWith('http')
            return (
              <motion.a
                key={c.label}
                href={c.href || undefined}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className={`contact-card reveal delay-${i + 1} ${c.href ? '' : 'contact-card-static'}`}
                whileHover={c.href ? { y: -4 } : {}}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="contact-icon">{c.icon}</span>
                <span className="contact-text">
                  <span className="contact-label">{c.label}</span>
                  <span className="contact-value">{c.value}</span>
                </span>
              </motion.a>
            )
          })}
        </div>

      </div>
    </section>
  )
}
