import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Experience.css'

// ─── Timeline data ────────────────────────────────────────────────────────────
// Work experience first, then education
const WORK = [
  {
    emoji: '🔬',
    role: 'Research Intern',
    org: 'LNMIIT Jaipur',
    date: 'May 2025 – July 2025',
    color: '#38bdf8',
    points: [
      'Researched robust object detection in challenging environments — low visibility and cluttered backgrounds — using computer vision.',
      'Trained and evaluated YOLOv5 on FLIR multispectral datasets containing RGB and Thermal images.',
      'Developed custom PyTorch data preprocessing and training scripts enabling future RGB–thermal fusion.',
    ],
    tags: ['Python', 'PyTorch', 'YOLOv5', 'Computer Vision'],
  },
]

const EDUCATION = [
  {
    emoji: '🎓',
    role: 'B.Tech — Computer Science',
    org: 'JK Lakshmipat University, Jaipur',
    date: 'Aug 2023 – Present',
    color: '#f97316',
    points: [
      'Relevant coursework: Data Structures & Algorithms, Database Management Systems, Computer Networks, Operating Systems, Blockchain Technology.',
      'Active projects: MeetCut (AI meeting platform), Land Registry Web3.',
    ],
    tags: ['DSA', 'DBMS', 'Blockchain', 'Networks'],
  },
  {
    emoji: '📚',
    role: 'Class XII — CBSE',
    org: 'Seedling Modern High School, Jaipur',
    date: '2023 · 79%',
    color: '#10b981',
    points: [
      'Completed CBSE Class XII with 79% aggregate.',
      'Strong foundation in Mathematics, Physics, and Computer Science.',
    ],
    tags: ['CBSE', 'Mathematics', 'Physics', 'Computer Science',],
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

// ─── TimelineItem component ───────────────────────────────────────────────────
function TimelineItem({ item, index }) {
  return (
    <motion.div
      className={`tl-item reveal delay-${index + 1}`}
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Coloured dot on the vertical line */}
      <div
        className="tl-dot"
        style={{
          background: item.color,
          boxShadow: `0 0 14px ${item.color}60`,
        }}
      >
        {item.emoji}
      </div>

      {/* Card */}
      <div className="tl-card">
        <div className="tl-header">
          <div>
            <h3 className="tl-role">{item.role}</h3>
            <p className="tl-org" style={{ color: item.color }}>{item.org}</p>
          </div>
          <span className="tl-date">{item.date}</span>
        </div>

        <ul className="tl-points">
          {item.points.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>

        <div className="tl-tags">
          {item.tags.map(t => (
            <span key={t} className="tl-tag">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useReveal()

  return (
    // IMPORTANT: id="timeline" — matches "Timeline" in the navbar
    <section id="timeline" ref={ref}>
      <div className="container">

        <div className="reveal">
          <p className="section-label">Experience & Education</p>
          <h2 className="section-title">My <span>Journey</span></h2>
          <p className="section-sub">
            How I've grown professionally and academically.
          </p>
        </div>

        {/* Work experience */}
        <p className="tl-section-label reveal">💼 Work Experience</p>
        <div className="timeline">
          <div className="tl-line" />
          {WORK.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* Education */}
        <p className="tl-section-label reveal" style={{ marginTop: 48 }}>🎓 Education</p>
        <div className="timeline">
          <div className="tl-line" />
          {EDUCATION.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}