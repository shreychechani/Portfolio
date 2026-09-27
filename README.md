# Shrey Chechani — Personal Portfolio

A personal portfolio website built with React and Vite.

---

## Project Description

A personal portfolio website built from scratch with React. It serves as a living CV — showcasing my experience, skills, projects, research, blockchain work, and certifications, with ways to reach me by email, LinkedIn, or GitHub. The CV is available as a PDF download. The UI features a typewriter effect, smooth scroll animations via AOS, Framer Motion navbar animations, a dark/light mode toggle, and is fully responsive across all devices.

---

## Features

- React.js frontend (Vite)
- Typewriter effect in Hero section (react-type-animation)
- Scroll animations with AOS
- Framer Motion navbar with animated active indicator
- Fully responsive (mobile, tablet, desktop)
- Dark / Light mode toggle (persisted in localStorage)
- CV download as PDF
- Skills categorised: Languages / Frontend / ML–AI / Backend & Tools
- Animated vertical Experience & Education timeline
- Certifications & Achievements section
- Contact section with email, LinkedIn, GitHub, and location
- Custom cursor
- Batman logo toggle for dark mode 🦇

---

## Live Site

https://portfolio-client-red.vercel.app/

---

## Project Structure

```
Portfolio/
└── client/                      # React.js (Vite)
    ├── public/
    │   └── Shrey_Chechani_CV.pdf  # resume served for download
    ├── src/
    │   ├── assets/              # profile photo, Batman logo
    │   ├── components/
    │   │   ├── Navbar.jsx       # floating pill navbar, Framer Motion
    │   │   └── Footer.jsx
    │   ├── sections/
    │   │   ├── Hero.jsx         # typewriter + photo + resume download
    │   │   ├── About.jsx        # bento grid
    │   │   ├── Skills.jsx       # animated skill bars
    │   │   ├── Projects.jsx     # filter by tech + GitHub/live links
    │   │   ├── Experience.jsx   # vertical timeline
    │   │   ├── Certifications.jsx
    │   │   └── Contact.jsx      # contact details cards
    │   ├── context/
    │   │   ├── ThemeContext.jsx # ThemeProvider (dark/light)
    │   │   └── useTheme.js      # theme context + useTheme hook
    │   ├── App.jsx
    │   └── index.css
    └── package.json
```

---

## Local Setup

### Prerequisites

- Node.js v18+
- npm v9+

### Run it

```bash
git clone https://github.com/shreychechani/Portfolio.git
cd Portfolio/client
npm install
npm run dev
# Site runs at → http://localhost:5173
```

### Other scripts

```bash
npm run build     # production build into client/dist
npm run preview   # serve the production build locally
npm run lint      # ESLint
```

---

## Updating Content

| What | Where |
|---|---|
| Experience & education | `client/src/sections/Experience.jsx` (`WORK`, `EDUCATION`) |
| Projects | `client/src/sections/Projects.jsx` (`PROJECTS`) |
| Skills | `client/src/sections/Skills.jsx` (`SKILLS`) |
| Contact details | `client/src/sections/Contact.jsx` (`CONTACTS`) |
| Resume | Replace `client/public/Shrey_Chechani_CV.pdf` |

---

## Deployment

**Vercel**

1. Push to GitHub
2. Import the repo on vercel.com
3. Root directory: `client`
4. Framework: Vite

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Framer Motion, AOS, react-type-animation |
| Deployment | Vercel |

---

Made with ☕ by **Shrey Chechani**  
B.Tech Computer Science — JK Lakshmipat University, Jaipur  
[shreychechani@gmail.com](mailto:shreychechani@gmail.com) · [GitHub](https://github.com/shreychechani) · [LinkedIn](https://linkedin.com/in/shrey-chechani-56a28a205)
