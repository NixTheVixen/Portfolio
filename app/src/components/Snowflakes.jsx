import { useMemo } from 'react'
import './Snowflakes.css'

const FLAKE_COUNT = 24
const MOBILE_FLAKE_COUNT = 10 // fewer on phones to stay smooth on older devices
const GLYPHS = ['❄', '❅', '❆']

export default function Snowflakes() {
  // Randomized once on mount so each flake drifts down its own path.
  const flakes = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    const count = isMobile ? MOBILE_FLAKE_COUNT : FLAKE_COUNT
    return Array.from({ length: count }, (_, id) => ({
      id,
        glyph: GLYPHS[id % GLYPHS.length],
        left: Math.random() * 100, // start position across the viewport (vw)
        size: 10 + Math.random() * 14, // px
        fall: 10 + Math.random() * 10, // descent duration (s)
        fallDelay: -Math.random() * 20, // negative → already mid-fall on load
        sway: 3.5 + Math.random() * 4, // horizontal sway period (s)
        swayDelay: -Math.random() * 8, // phase offset so flakes aren't in sync
        amplitude: 4 + Math.random() * 7, // sway distance to each side (vw)
        spin: 6 + Math.random() * 8, // rotation duration (s)
        opacity: 0.55 + Math.random() * 0.45,
    }))
  }, [])

  return (
    <div className="snow" aria-hidden="true">
      {flakes.map((f) => (
        <span
          key={f.id}
          className="snow__flake"
          style={{
            left: `${f.left}vw`,
            animationDuration: `${f.fall}s`,
            animationDelay: `${f.fallDelay}s`,
          }}
        >
          <span
            className="snow__sway"
            style={{
              '--amplitude': `${f.amplitude}vw`,
              animationDuration: `${f.sway}s`,
              animationDelay: `${f.swayDelay}s`,
            }}
          >
            <span
              className="snow__inner"
              style={{
                fontSize: `${f.size}px`,
                opacity: f.opacity,
                animationDuration: `${f.spin}s`,
              }}
            >
              {f.glyph}
            </span>
          </span>
        </span>
      ))}
    </div>
  )
}
