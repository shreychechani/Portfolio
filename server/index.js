import express from 'express'      
import cors from 'cors'           
import dotenv from 'dotenv'         
import mongoose from 'mongoose'     
import contactRoutes from './routes/contact.js'
import downloadRoutes from './routes/download.js'

dotenv.config()

const app = express()               
const PORT = process.env.PORT || 5000


app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/contact', contactRoutes)   // Handles /api/contact POST
app.use('/api/download', downloadRoutes)  // Handles /api/download GET

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running ✅' })
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully')
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1) 
  })