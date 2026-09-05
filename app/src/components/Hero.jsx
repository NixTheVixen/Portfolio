import { useEffect, useRef, useState } from 'react'
import './Hero.css'
import profilePhoto from '../assets/profile.png'
import VideoIcon from './VideoIcon'

const PHRASES = ['Good Vibes.', 'Reliable Edits.']

export default function Hero() {
  const [display, setDisplay] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(PHRASES[0])
      return undefined
    }

    const typeSpeed = 110
    const deleteSpeed = 55
    const pauseMs = 1500
    const phrase = PHRASES[phraseIdx]

    const tick = () => {
      if (!isDeleting) {
        if (display.length < phrase.length) {
          setDisplay(phrase.slice(0, display.length + 1))
          timeoutRef.current = setTimeout(tick, typeSpeed)
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseMs)
        }
      } else {
        if (display.length > 0) {
          setDisplay(phrase.slice(0, display.length - 1))
          timeoutRef.current = setTimeout(tick, deleteSpeed)
        } else {
          setIsDeleting(false)
          setPhraseIdx((i) => (i + 1) % PHRASES.length)
        }
      }
    }

    timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed)
    return () => clearTimeout(timeoutRef.current)
  }, [display, isDeleting, phraseIdx])

  // keep display in sync when phraseIdx changes after delete
  useEffect(() => {
    // no-op, handled above
  }, [phraseIdx])

  return (
    <section className="hero">
      <div className="hero-left">
        <span className="tag-pill">✦ Your Trusted Video Editor</span>
        <h1 className="hero-typing" aria-live="polite" aria-atomic="true">
          <span className="hero-typing-text">
            {display.split('').map((ch, i) => (
              <span key={`${phraseIdx}-${i}-${ch}`} className="hero-char" style={{ animationDelay: `${i * 0.02}s` }}>
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </span>
          <span className="hero-cursor" aria-hidden="true" />
        </h1>
        <p>
          Hi, I'm Nix! Video editor and 3D artist. I specialize in turning
          your videos and ideas into high-retention reels and 3D visuals,
          focusing on quality and communication. Let's grow your channel
          together!
        </p>
        <div className="hero-actions">
          <a
            className="view-work-btn"
            href="https://ytjobs.co/talent/vitrine/588939"
            target="_blank"
            rel="noopener noreferrer"
          >
            <VideoIcon />
            View My Work
          </a>
        </div>
      </div>
      <div className="hero-right">
        <span className="fox-emoji">🦊</span>
        <span className="snow-emoji">❄️</span>
        <div className="hero-card">
          <span className="flower-emoji">🌸</span>
          <div className="hero-card-inner">
            <div
              className="profile-photo"
              style={{ '--pfp': `url(${profilePhoto})` }}
              role="img"
              aria-label="Nix's Minecraft avatar"
            />
            <div className="handle-tag">@NixTheVixen</div>
          </div>
        </div>
      </div>
    </section>
  )
}
