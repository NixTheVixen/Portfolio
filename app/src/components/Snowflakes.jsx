import { useMemo } from 'react'
import './Snowflakes.css'

const FLAKE_COUNT = 24
const GLYPHS = ['❄', '❅', '❆']

export default function Snowflakes() {
  // Randomized once on mount so each flake drifts down its own path.
  const flakes = useMemo(
    () =>
      Array.from({ length: FLAKE_COUNT }, (_, id) => ({
        id,
        glyph: GLYPHS[id % GLYPHS.length],
        left: Math.random() * 100, // start position across the viewport (vw)
        size: 10 + Math.random() * 14, // px
        fall: 10 + Math.random() * 10, // descent duration (s)
        delay: -Math.random() * 20, // negative → already mid-fall on load (s)
        drift: (Math.random() * 2 - 1) * 12, // net horizontal drift (vw)
        spin: 6 + Math.random() * 8, // rotation duration (s)
        opacity: 0.55 + Math.random() * 0.45,
      })),
    []
  )

  return (
    <div className="snow" aria-hidden="true">
      {flakes.map((f) => (
        <span
          key={f.id}
          className="snow__flake"
          style={{
            left: `${f.left}vw`,
            fontSize: `${f.size}px`,
            opacity: f.opacity,
            animationDuration: `${f.fall}s`,
            animationDelay: `${f.delay}s`,
            '--drift': `${f.drift}vw`,
            '--spin': `${f.spin}s`,
          }}
        >
          <span className="snow__inner">{f.glyph}</span>
        </span>
      ))}
    </div>
  )
}
