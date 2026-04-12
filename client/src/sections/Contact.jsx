import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './Contact.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

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

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Enter a valid email address'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(err => ({ ...err, [e.target.name]: '' }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('loading')

    try {
      await axios.post(`${API}/api/contact`, {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        message: form.message.trim(),
      })

      setStatus('success')
      setForm({ name: '', email: '', message: '' })

    } catch (err) {
      console.error('Contact form error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={ref}>
      <div className="container">

        <div className="reveal">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's <span>Connect</span></h2>
          <p className="section-sub">Drop a message below.</p>
        </div>

        <div className="contact-grid">

          <div className="form-card reveal delay-1">
            <h3>Send a message</h3>

            {status === 'success' ? (
              <div className="form-success">
                <span className="success-icon"></span>
                <h4>Message sent!</h4>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  className="btn-primary"
                  onClick={() => setStatus(null)}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>

                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className={errors.name ? 'input-error' : ''}
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    placeholder="What's on your mind?"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={errors.message ? 'input-error' : ''}
                  />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>

                {status === 'error' && (
                  <div className="server-error">
                    Something went wrong. Please email me directly at
                    shreychechani@gmail.com
                  </div>
                )}

                <motion.button
                  type="submit"
                  className="btn-primary submit-btn"
                  disabled={status === 'loading'}
                  whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="spinner" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <span>→</span>
                      Send Message
                    </>
                  )}
                </motion.button>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}