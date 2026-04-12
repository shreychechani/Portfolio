# Shrey Chechani — Personal Portfolio

A full-stack personal portfolio built with the MERN Stack (MongoDB, Express.js, React.js, Node.js).

---

## Project Description

A full-stack personal portfolio website built from scratch using the MERN Stack. It serves as a living CV — showcasing my skills, projects, research experience, blockchain work, and certifications, with a fully functional contact form that stores messages in MongoDB and sends email notifications via Nodemailer. The CV is available for download in both PDF and DOCX formats served through a dedicated Express backend route. The UI features a typewriter effect, smooth scroll animations via AOS, Framer Motion navbar animations, dark/light mode toggle, and is fully responsive across all devices.

---

## Features

- React.js frontend (Vite + CSS Modules)
- Node.js + Express.js REST API backend
- MongoDB + Mongoose for contact form storage
- Typewriter effect in Hero section (react-type-animation)
- Scroll animations with AOS
- Framer Motion navbar with animated active indicator
- Fully responsive (mobile, tablet, desktop)
- Dark / Light mode toggle (persisted in localStorage)
- CV download in PDF and DOCX from Express backend route
- Contact form wired to backend — saves to MongoDB + sends email notification + auto-reply to sender
- Skills categorised: Languages / Frontend / ML–AI / Backend & Tools
- Animated vertical Education & Experience timeline
- Certifications & Achievements section
- Custom cursor
- Batman logo toggle for dark mode 🦇

---

## Deployment Links

| | URL |
|---|---|
| **Frontend (Vercel)** | https://portfolio-lyart-chi-39.vercel.app |
| **Backend (Render)** | https://shrey-portfolio-api.onrender.com |

---

## Project Structure

```
Portfolio/
├── client/                    # React.js (Vite)
│   ├── public/
│   │   └── assets/
│   │       └── profile.png    # bg-removed photo
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # floating pill navbar, Framer Motion
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx       # typewriter + photo cutout
│   │   │   ├── About.jsx      # bento grid
│   │   │   ├── Skills.jsx     # animated skill bars
│   │   │   ├── Projects.jsx   # filter by tech + GitHub/live links
│   │   │   ├── Experience.jsx # vertical timeline (id="timeline")
│   │   │   ├── Certifications.jsx
│   │   │   └── Contact.jsx    # form → Express → MongoDB + email
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── vercel.json            # SPA routing fix
│   └── package.json
│
└── server/                    # Node.js + Express.js
    ├── index.js               # entry point
    ├── models/
    │   └── Contact.js         # Mongoose schema
    ├── routes/
    │   ├── contact.js         # POST /api/contact
    │   └── download.js        # GET /api/download/cv-pdf & cv-docx
    ├── middleware/
    │   └── emailService.js    # Nodemailer — sends 2 emails on form submit
    ├── files/                 # CV files (gitignored)
    │   ├── ShreyChechani_CV.pdf
    │   └── ShreyChechani_CV.docx
    ├── .env                   # NOT pushed to GitHub
    └── package.json
```

---

## Local Setup

### Prerequisites

- Node.js v18+
- npm v9+
- MongoDB Atlas account (free tier)
- Gmail account with **App Password** enabled

### 1. Clone the repo

```bash
git clone https://github.com/shreychechani/portfolio.git
cd portfolio
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create your `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Fill in your values:

```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
EMAIL_USER=your@gmail.com
EMAIL_APP_PASSWORD=your_16_char_app_password_no_spaces
EMAIL_TO=your@gmail.com
```

Place your CV files inside `server/files/`:

```
server/files/ShreyChechani_CV.pdf
server/files/ShreyChechani_CV.docx
```

Start the backend:

```bash
npm run dev
# Server runs at → http://localhost:3000
```

### 3. Setup the Frontend

Open a new terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Add your profile photo (background removed) at:

```
client/public/assets/profile.png
```

Start the frontend:

```bash
npm run dev
# Frontend runs at → http://localhost:5173
```

---

## Verify It's Working

| What | URL |
|---|---|
| Portfolio site | http://localhost:5173 |
| Backend health | http://localhost:3000/api/health |
| PDF download | http://localhost:3000/api/download/cv-pdf |
| DOCX download | http://localhost:3000/api/download/cv-docx |
| Contact form | Fill & submit → check MongoDB Atlas + Gmail inbox |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server health check |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | View all messages |
| GET | `/api/download/cv-pdf` | Download CV as PDF |
| GET | `/api/download/cv-docx` | Download CV as Word |

---

## Environment Variables

### server/.env

| Variable | Description |
|---|---|
| `PORT` | Server port (3000 locally, 10000 on Render) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `CLIENT_URL` | Frontend URL for CORS |
| `EMAIL_USER` | Your Gmail address |
| `EMAIL_APP_PASSWORD` | 16-char Gmail App Password (no spaces) |
| `EMAIL_TO` | Email to receive contact notifications |

### client/.env

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend URL (localhost:3000 or Render URL) |

---

## Deployment

**Frontend → Vercel**

1. Push to GitHub
2. Import repo on vercel.com
3. Root directory: `client`
4. Framework: Vite
5. Add env var: `VITE_API_URL=https://your-backend.onrender.com`

**Backend → Render**

1. New Web Service on render.com
2. Root directory: `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all env vars from `server/.env`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Framer Motion, AOS, react-type-animation, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Email | Nodemailer (Gmail SMTP) |
| Deployment | Vercel (frontend), Render (backend) |

---

Made with ☕ by **Shrey Chechani**  
B.Tech Computer Science — JK Lakshmipat University, Jaipur  
[shreychechani@gmail.com](mailto:shreychechani@gmail.com) · [GitHub](https://github.com/shreychechani) · [LinkedIn](https://linkedin.com/in/shrey-chechani-56a28a205)