import { Link } from 'react-router-dom'
import './Navbar.css'

const links = ['Work', 'Process', 'About']

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-icon">🐾</span> NIX.
      </Link>
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link}>{link}</li>
        ))}
      </ul>
      <button className="hire-btn">Hire Me</button>
    </nav>
  )
}
