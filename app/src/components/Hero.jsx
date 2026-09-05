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

  const sceneRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (window.matchMedia('(pointer: coarse)').matches) return undefined
    const scene = sceneRef.current
    const hero = document.querySelector('.hero')
    if (!scene || !hero) return undefined

    let raf = 0
    let targetX = 0
    let targetY = 0

    const update = () => {
      raf = 0
      // upper-right is (1, -1) in normalized space
      const rotateY = targetX * 7
      const rotateX = -targetY * 7
      const distToUpperRight = Math.hypot(targetX - 1, targetY + 1)
      // 0 at upper-right corner, ~2.8 at opposite corner → move back most at corner
      const back = Math.max(0, 1 - distToUpperRight / 2.6) * -22
      const tx = targetX * 8
      const ty = targetY * 8
      scene.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${tx}px, ${ty}px, ${back}px)`
    }

    let leaveTimer = 0

    const onMove = (e) => {
      if (leaveTimer) {
        clearTimeout(leaveTimer)
        leaveTimer = 0
      }
      scene.style.transition = 'transform 0.08s linear'
      const rect = hero.getBoundingClientRect()
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      if (!raf) raf = requestAnimationFrame(update)
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      scene.style.transition = 'transform 1.5s cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      if (!raf) raf = requestAnimationFrame(update)
      leaveTimer = window.setTimeout(() => {
        scene.style.transition = ''
      }, 1500)
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
      if (leaveTimer) clearTimeout(leaveTimer)
    }
  }, [])

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
        <div ref={sceneRef} className="pfp-scene">
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
      </div>
    </section>
  )
}
