// server/index.js — FIXED FOR PRODUCTION
import express   from 'express'
import cors      from 'cors'
import dotenv    from 'dotenv'
import mongoose  from 'mongoose'
import path      from 'path'
import { fileURLToPath } from 'url'
import contactRoutes  from './routes/contact.js'
import downloadRoutes from './routes/download.js'

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const allowedOrigins = [
  'https://portfolio-lyart-chi-39.vercel.app', 
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000',
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    // Log the blocked origin so you can add it if needed
    console.log('CORS blocked origin:', origin)
    return callback(new Error(`CORS: Origin ${origin} not allowed`))
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.options('*', cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/contact',  contactRoutes)
app.use('/api/download', downloadRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status:  'ok',
    message: 'Shrey Portfolio API is running!',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    env:     process.env.NODE_ENV || 'development',
    time:    new Date().toISOString(),
  })
})

app.get('/', (req, res) => {
  res.json({ message: 'Shrey Portfolio API', status: 'running' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` })
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Atlas connected')
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })