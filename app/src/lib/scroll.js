// Custom cubic-bezier smooth scroll — the browser only exposes a fixed easing,
// so we animate window.scrollTo ourselves with a real bezier timing function.
function cubicBezier(x1, y1, x2, y2) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t
  const sampleY = (t) => ((ay * t + by) * t + cy) * t
  const sampleDX = (t) => (3 * ax * t + 2 * bx) * t + cx
  const solveX = (x) => {
    let t = x
    for (let i = 0; i < 8; i += 1) {
      const err = sampleX(t) - x
      if (Math.abs(err) < 1e-5) return t
      const d = sampleDX(t)
      if (Math.abs(d) < 1e-6) break
      t -= err / d
    }
    return t
  }
  return (x) => sampleY(solveX(x))
}

// Smooth ease-in-out bezier.
const ease = cubicBezier(0.65, 0, 0.35, 1)

export function scrollToBezier(targetY, duration = 900) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, targetY)
    return
  }
  const startY = window.scrollY
  const distance = targetY - startY
  let start
  const step = (ts) => {
    if (start === undefined) start = ts
    const progress = Math.min((ts - start) / duration, 1)
    window.scrollTo(0, startY + distance * ease(progress))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
