import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isPinkHover, setIsPinkHover] = useState(false)
  const [isOverYouTube, setIsOverYouTube] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const rafRef = useRef(0)

  useEffect(() => {
    // Hide on touch / coarse pointer
    if (window.matchMedia('(pointer: coarse)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // still show but without smoothing
    }

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    const onEnter = () => setIsHovering(true)
    const onLeave = () => setIsHovering(false)
    const onPinkEnter = () => {
      setIsHovering(true)
      setIsPinkHover(true)
    }
    const onPinkLeave = () => {
      setIsPinkHover(false)
      setIsHovering(false)
    }
    const onYouTubeEnter = () => setIsOverYouTube(true)
    const onYouTubeLeave = () => setIsOverYouTube(false)

    const attachHover = () => {
      const selectors = 'a, button, [role="button"], .view-work-btn, .btn-primary, .reel-thumb, .reel-card, .logo'
      const pinkSelectors = '.hire-btn, .btn-outline, .nav-links li, .footer-links a'
      const youTubeSelectors = '.reel-thumb--video, .reel-video'
      document.querySelectorAll(selectors).forEach((el) => {
        if (el.matches(pinkSelectors) || el.matches(youTubeSelectors)) return
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
      document.querySelectorAll(pinkSelectors).forEach((el) => {
        el.addEventListener('mouseenter', onPinkEnter)
        el.addEventListener('mouseleave', onPinkLeave)
      })
      document.querySelectorAll(youTubeSelectors).forEach((el) => {
        el.addEventListener('mouseenter', onYouTubeEnter)
        el.addEventListener('mouseleave', onYouTubeLeave)
      })
      return () => {
        document.querySelectorAll(selectors).forEach((el) => {
          el.removeEventListener('mouseenter', onEnter)
          el.removeEventListener('mouseleave', onLeave)
        })
        document.querySelectorAll(pinkSelectors).forEach((el) => {
          el.removeEventListener('mouseenter', onPinkEnter)
          el.removeEventListener('mouseleave', onPinkLeave)
        })
        document.querySelectorAll(youTubeSelectors).forEach((el) => {
          el.removeEventListener('mouseenter', onYouTubeEnter)
          el.removeEventListener('mouseleave', onYouTubeLeave)
        })
      }
    }

    let detach = attachHover()
    // re-attach when DOM changes (SPA navigation)
    const observer = new MutationObserver(() => {
      detach()
      detach = attachHover()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    const animate = () => {
      // no smoothing — snap directly to mouse
      pos.current.x = target.current.x
      pos.current.y = target.current.y
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.35 : 1})`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.classList.add('has-custom-cursor')

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.classList.remove('has-custom-cursor')
      document.documentElement.classList.remove('is-over-youtube')
      observer.disconnect()
      detach()
    }
  }, [isHovering, isOverYouTube])

  useEffect(() => {
    if (isOverYouTube) document.documentElement.classList.add('is-over-youtube')
    else document.documentElement.classList.remove('is-over-youtube')
  }, [isOverYouTube])

  const cls = [
    'custom-cursor',
    isHovering ? 'custom-cursor--hover' : '',
    isPinkHover ? 'custom-cursor--pink' : '',
    isOverYouTube ? 'custom-cursor--hidden' : '',
  ]
    .filter(Boolean)
    .join(' ')
  return <div ref={dotRef} className={cls} aria-hidden="true" />
}
