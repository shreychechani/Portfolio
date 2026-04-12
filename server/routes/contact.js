import express              from 'express'
import Contact              from '../models/Contact.js'
import { sendContactEmail } from '../middleware/emailService.js'

const router = express.Router()

// POST /api/contact — called by React contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'All fields (name, email, message) are required.',
      })
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.',
      })
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Message must be at least 10 characters.',
      })
    }

    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0]
                   || req.socket.remoteAddress || ''

    // Save to MongoDB
    const saved = await Contact.create({
      name:      name.trim(),
      email:     email.trim().toLowerCase(),
      message:   message.trim(),
      ipAddress,
    })

    console.log(`New contact saved — ID: ${saved._id} from ${email}`)

    // ── Send emails
    try {
      await sendContactEmail({
        name:    name.trim(),
        email:   email.trim(),
        message: message.trim(),
      })
    } catch (emailErr) {
      console.error(`Email failed (message still saved): ${emailErr.message}`)
    }

    return res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon.",
    })

  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message)
      return res.status(400).json({ success: false, error: errors[0] })
    }
    console.error('Contact route error:', err.message)
    return res.status(500).json({
      success: false,
      error: 'Server error. Please email me at shreychechani@gmail.com',
    })
  }
})

// GET /api/contact — view all messages
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json({ success: true, count: contacts.length, data: contacts })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

export default router