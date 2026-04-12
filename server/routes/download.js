import express from 'express'
import path    from 'path'
import fs      from 'fs'
import { fileURLToPath } from 'url'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const FILES_DIR = path.join(__dirname, '..', 'files')

// GET /api/download/cv-pdf
router.get('/cv-pdf', (req, res) => {
  const filePath = path.join(FILES_DIR, 'ShreyChechani_CV.pdf')

  // Check if file actually exists before trying to send it
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      error: 'CV PDF not found. Place ShreyChechani_CV.pdf in server/files/',
    })
  }

  res.setHeader('Content-Disposition', 'attachment; filename="ShreyChechani_CV.pdf"')
  res.setHeader('Content-Type', 'application/pdf')

  res.sendFile(filePath)
})

// GET /api/download/cv-docx
router.get('/cv-docx', (req, res) => {
  const filePath = path.join(FILES_DIR, 'ShreyChechani_CV.docx')

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      error: 'CV DOCX not found. Place ShreyChechani_CV.docx in server/files/',
    })
  }

  res.setHeader('Content-Disposition', 'attachment; filename="ShreyChechani_CV.docx"')
  res.setHeader('Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document')

  res.sendFile(filePath)
})

export default router