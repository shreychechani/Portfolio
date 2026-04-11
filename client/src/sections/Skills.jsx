import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Skills.css'

const SKILLS = {
  Languages: [
    { name: 'Python',  level: 88, color: '#fbbf24' },
    { name: 'C++',     level: 80, color: '#60a5fa' },
    { name: 'C',       level: 72, color: '#a78bfa' },
  ],
  Frontend: [
    { name: 'React.js',   level: 85, color: '#38bdf8' },
    { name: 'HTML / CSS', level: 80, color: '#f97316' },
    { name: 'Tailwind',   level: 70, color: '#06b6d4' },
  ],
  'ML / AI': [
    { name: 'PyTorch',     level: 70, color: '#ef4444' },
    { name: 'Scikit-learn',level: 80, color: '#fbbf24' },
    { name: 'YOLOv5',     level: 90, color: '#10b981' },
  ],
  'Backend & Tools': [
    { name: 'Node.js',    level: 72, color: '#4ade80' },
    { name: 'MongoDB',    level: 68, color: '#34d399' },
    { name: 'Express.js', level: 70, color: '#94a3b8' },
    { name: 'Git',        level: 88, color: '#f97316' },
  ],
}

function SkillBar({ name, level, color, delay }) {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            bar.style.width = level + '%'
          }, delay)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(bar.closest('.sk-card') || bar)
    return () => obs.disconnect()
  }, [level, delay])

  return (
    <div className="sk-item">
      <div className="sk-info">
        <span className="sk-name">{name}</span>
        <span className="sk-pct" style={{ color }}>{level}%</span>
      </div>
      <div className="sk-bg">
        {/*
          ref={barRef} — we directly set style.width via JS to animate
          transition is set inline so it only triggers once (not on mount)
        */}
        <div
          ref={barRef}
          className="sk-fill"
          style={{
            width: 0,
            background: `linear-gradient(90deg, ${color}60, ${color})`,
            transition: `width 1s ease ${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}

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

export default function Skills() {
  const ref = useReveal()

  return (
    // id="skills" 
    <section id="skills" ref={ref}>
      <div className="container">

        <div className="reveal">
          <p className="section-label">Skills</p>
          <h2 className="section-title">Tools & <span>Technologies</span></h2>
          <p className="section-sub">
            Languages, frameworks, and tools I'm currently adaptable across.
          </p>
        </div>

        <div className="skills-grid">
          {Object.entries(SKILLS).map(([category, skills], ci) => (
            <motion.div
              key={category}
              className={`sk-card reveal delay-${ci + 1}`}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="sk-head">{category}</div>
              {skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  delay={si * 150} 
                />
              ))}
            </motion.div>
          ))}
        </div>

        <div className="tech-pills-row reveal delay-5">
          <p className="pills-label">Also familiar with</p>
          <div className="tech-pills">
            {['Solidity','OpenCV',
              'NumPy','Pandas','Linux'].map(t => (
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}