import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Logo */}
        <div className="footer-logo">
          Portfolio<span>.</span>
        </div>

        {/* Links */}
        <div className="footer-links">
          <a href="https://github.com/shreychechani" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/shrey-chechani-56a28a205/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="mailto:shreychechani@gmail.com">
            Email
          </a>
        </div>

      </div>
    </footer>
  )
}