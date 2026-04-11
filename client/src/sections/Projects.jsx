import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Projects.css'

// ─── Project data ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: 'Emergency Route Finder',
    desc: 'Flask-based app that optimises ambulance routing using Dijkstra\'s algorithm for shortest paths and Kruskal\'s algorithm to find hospitals within 1 km. Visualises routes with Folium maps showing traffic, ETA, and distance.',
    tech: ['Python', 'Flask', 'Folium', 'Graphs', 'Algorithms'],
    github: 'https://github.com/shreychechani/Emergency-Route-Finder',
    live: 'https://emergency-route-finder.onrender.com',
    color: '#ef4444',
  },
  {
    id: 2,
    title: 'MeetCut — AI Meeting Intelligence',
    desc: 'AI-powered meeting intelligence platform that transcribes, summarises, and extracts action items from meetings. MERN stack with OpenAI Whisper for transcription and Google Gemini 1.5 for smart summaries. JWT authentication.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'OpenAI', 'Gemini'],
    github: 'https://github.com/shreychechani/MeetCut',
    live: null,
    color: '#8b5cf6',
  },
  {
    id: 3,
    title: 'Land Registry Web3',
    desc: 'Blockchain-based land registry and real estate marketplace with fractional ownership via ERC-20 tokenization. Solidity smart contracts (LandRegistry.sol, Marketplace.sol, FractionalToken.sol), Hardhat testing, IPFS document storage.',
    tech: ['Solidity', 'React', 'IPFS', 'Hardhat', 'Ethereum', 'Web3'],
    github: 'https://github.com/Tusharparihar05/land-registry-web3',
    live: null,
    color: '#10b981',
  },
  {
    id: 4,
    title: 'Image Captioning System',
    desc: 'Deep learning-based image captioning system that generates natural language descriptions for images using CNN + LSTM architecture. Trained on image datasets to understand visual features and convert them into meaningful captions.',
    tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'LSTM', 'Deep Learning'],
    github: 'https://github.com/shreychechani/Image_Captioning_Project',
    live: null,
    color: '#f59e0b',
  },
]

// Filter tags shown above the grid
const FILTERS = ['All', 'Python', 'React', 'Node.js', 'Solidity', 'ML', 'Flask']

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

export default function Projects() {
  const ref = useReveal()
  const [activeFilter, setActiveFilter] = useState('All')

  // Filter projects — if 'All' show everything, else only projects with matching tech
  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p =>
        p.tech.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()))
      )

  return (
    // id="projects" — matches navbar
    <section id="projects" ref={ref}>
      <div className="container">

        <div className="reveal">
          <p className="section-label">Projects</p>
          <h2 className="section-title">Things I've <span>Built</span></h2>
          <p className="section-sub">
            A selection of real projects I've shipped across different domains.
          </p>
        </div>

        {/* ── Filter buttons ── */}
        <div className="filter-bar reveal delay-1">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? 'filter-active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Project cards grid ── */}
        {/* AnimatePresence handles exit animation when filter changes */}
        <div className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                className="proj-card"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                {/* Coloured top accent bar */}
                <div
                  className="proj-accent"
                  style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                />

                <div className="proj-body">
                  <span className="proj-emoji">{project.emoji}</span>
                  <h3 className="proj-title">{project.title}</h3>
                  <p className="proj-desc">{project.desc}</p>

                  {/* Tech stack tags */}
                  <div className="proj-tags">
                    {project.tech.map(t => (
                      <span key={t} className="proj-tag">{t}</span>
                    ))}
                  </div>

                  {/* GitHub + Live links */}
                  <div className="proj-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="proj-link"
                    >
                      {/* GitHub SVG icon */}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="proj-link proj-link-live"
                      >
                        {/* External link SVG icon */}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                          <polyline points="15,3 21,3 21,9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}