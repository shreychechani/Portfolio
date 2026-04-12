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

app.use(cors({
  origin: [
    'https://portfolio-lyart-chi-39.vercel.app',
    'http://localhost:5173',
    'http://localhost:4173',
  ],
  methods: ['GET', 'POST'],
  credentials: true,
}))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api/contact',  contactRoutes)
app.use('/api/download', downloadRoutes)

app.get('/api/health', (req, res) => {
  res.json({
    status:   'ok',
    message:  'Shrey Portfolio API is running!',
    mongodb:  mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time:     new Date().toISOString(),
  })
})

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` })
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Atlas connected successfully')

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
      console.log(`Contact API: http://localhost:${PORT}/api/contact`)
      console.log(`Download API: http://localhost:${PORT}/api/download/cv-pdf`)
      console.log(`Health check: http://localhost:${PORT}/api/health`)
    })
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })