import { useState } from 'react'
import { Link } from 'react-router-dom'
import PawIcon from './PawIcon'
import Modal from './Modal'
import { scrollToBezier } from '../lib/scroll'
import './Navbar.css'

const links = ['Work', 'Process', 'About']

export default function Navbar() {
  // which modal is open: 'process' | 'about' | null
  const [openModal, setOpenModal] = useState(null)
  const triggers = { Process: 'process', About: 'about' }
  const close = () => setOpenModal(null)

  const handleNav = (link) => {
    if (link === 'Work') {
      const el = document.getElementById('reels')
      if (!el) return
      const nav = document.querySelector('.navbar')
      const offset = nav ? nav.offsetHeight : 0
      scrollToBezier(el.getBoundingClientRect().top + window.scrollY - offset)
    } else if (triggers[link]) {
      setOpenModal(triggers[link])
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">
            <PawIcon />
          </span>{' '}
          NIX.
        </Link>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link} onClick={() => handleNav(link)}>
              {link}
            </li>
          ))}
        </ul>
        <a
          className="hire-btn"
          href="https://ytjobs.co/talent/profile/588939?r=618"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hire Me
        </a>
      </div>

      <Modal open={openModal === 'about'} onClose={close}>
        <p>
          I started editing videos years ago just for fun, not really knowing
          how important of a skill that was. Nowadays, I'm beginning to look at
          editing as a very viable job opportunity.
        </p>
        <p>
          Aiming to grow and build great work relationships, and even
          friendships. My priorities are quality, consistency, communication and
          growth.
        </p>
      </Modal>

      <Modal open={openModal === 'process'} onClose={close}>
        <p>
          My process starts with audio corrections, color grading and image
          enhancement, if needed.
        </p>
        <p>
          Followed by cuts to make your content get the point across with
          minimal time wasted.
        </p>
        <p>
          Then, I apply graphics to better demonstrate what's being explained in
          your reels, followed by nice animations to catch the eye of the
          viewer.
        </p>
        <p>
          As a very important step, I add text and subtitles as requested by the
          client, highlighting key aspects of your speech.
        </p>
        <p>
          Last but not least, I add fitting music and sound effects that make
          your viewers want to stay for the whole thing.
        </p>
      </Modal>
    </nav>
  )
}
