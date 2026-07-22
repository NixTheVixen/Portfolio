import { useEffect, useRef } from 'react'
import heroBg from '../assets/hero-bg.png'
import './HeroBackdrop.css'

// Blurred editing-workspace image behind the hero, with scroll-driven zoom +
// parallax. Sits behind all content (z-index < 0) and fades out at the bottom.
export default function HeroBackdrop() {
  const imgRef = useRef(null)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight || 800
      const progress = Math.min(window.scrollY / vh, 1) // 0 → 1 over first screen
      const translate = progress * 60 // px of parallax drift
      const scale = 1.08 + progress * 0.14 // subtle zoom-in
      el.style.transform = `translate3d(0, ${translate}px, 0) scale(${scale})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div
        className="hero-backdrop-img"
        ref={imgRef}
        style={{ backgroundImage: `url(${heroBg})` }}
      />
    </div>
  )
}
