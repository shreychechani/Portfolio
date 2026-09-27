import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Experience.css'

// ─── Timeline data ────────────────────────────────────────────────────────────
// Work experience first, then education
const WORK = [
  {
    role: 'AI Engineering Intern',
    org: 'Veloce AI',
    date: 'Aug 2026 – Present',
    color: '#a78bfa',
    points: [
      'Building Reprompt, a self-evolving prompt optimizer that migrates multi-stage LLM pipelines to cheaper models via iterative critique-refine loops and three-signal composite scoring.',
      'Designed a DAG-based Pipeline → Stage data model (SQLAlchemy 2.0) with versioned Migration/Candidate tracking for reproducible optimization runs.',
      'Shipped a full-stack migration platform (FastAPI + React with TypeScript) with DAG-based pipeline visualization, BYOK multi-model support, and 600+ automated tests.',
    ],
    tags: ['FastAPI', 'React', 'TypeScript', 'SQLAlchemy', 'LLMs'],
  },
  {
    role: 'AI Engineering Intern – Tax Technology',
    org: 'EY (Ernst & Young)',
    date: 'June 2026 – Aug 2026',
    color: '#fbbf24',
    points: [
      'Built an LLM cost-optimization framework for Taxmann.AI, a RAG tax-research product running a three-stage chain.',
      'Engineered a multi-model evaluation harness (FastAPI + LiteLLM) routing across Gemini, Groq, OpenRouter, and NVIDIA NIM, with DSPy GEPA optimization and LLMLingua-2 context compression.',
      'Designed a three-tier evaluation pipeline — embedding similarity, cross-encoder reranking, and LLM-as-judge — validated against 25 production query traces.',
    ],
    tags: ['FastAPI', 'LiteLLM', 'DSPy', 'RAG', 'LLM Evaluation'],
  },
  {
    role: 'Research Intern',
    org: 'LNMIIT Jaipur',
    date: 'May 2025 – July 2025',
    color: '#38bdf8',
    points: [
      'Built a YOLOv5-based object detection pipeline on FLIR RGB-Thermal datasets for low-visibility environments, improving detection accuracy over single-modality baselines.',
      'Automated preprocessing and annotation alignment in PyTorch, reducing dataset preparation time by 60%.',
      'Designed an RGB-thermal fusion model for real-time multimodal inference in surveillance and autonomous driving applications.',
    ],
    tags: ['Python', 'PyTorch', 'YOLOv5', 'Computer Vision'],
  },
]

const EDUCATION = [
  {
    role: 'B.Tech in Computer Science',
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
      'Foundation in Mathematics, Physics, and Computer Science.',
    ],
    tags: ['CBSE', 'Mathematics', 'Physics','Chemistry', 'Computer Science',],
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

function TimelineItem({ item, index }) {
  return (
    <motion.div
      className={`tl-item reveal delay-${index + 1}`}
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div
        className="tl-dot"
        style={{
          background: item.color,
          boxShadow: `0 0 14px ${item.color}60`,
        }}
      >
        {item.emoji}
      </div>

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
    <section id="timeline" ref={ref}>
      <div className="container">

        <div className="reveal">
          <p className="section-label">Experience & Education</p>
          <h2 className="section-title">My <span>Journey</span></h2>
          <p className="section-sub">
            My Professional and Academic Journey.
          </p>
        </div>

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