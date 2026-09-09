import { useEffect, useRef } from 'react'

// Feather icons (MIT-licensed, royalty-free) — inlined so there are no external deps.
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-7.5-5-10-10A5 5 0 0 1 12 6a5 5 0 0 1 10 5c-2.5 5-10 10-10 10z" />
    </svg>
  )
}

export default function ReelCard({ badge, badgeColor, title, videoId, videoSrc, category, categoryColor, heading, description, views, likes }) {
  const hasEmbed = Boolean(videoId || videoSrc)
  const videoRef = useRef(null)
  // On phones we don't autoplay: three looping players at once is the main
  // source of scroll lag. Videos load paused / tap-to-play instead.
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 768px)').matches

  // Fix Firefox/Chrome stretching the 720x1280 portrait to 16:9 in native fullscreen.
  // CSS :fullscreen with !important is ignored in some browsers, so we enforce via JS.
  useEffect(() => {
    if (!videoSrc) return undefined
    const v = videoRef.current
    if (!v) return undefined

    const apply = () => {
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement
      if (fsEl === v) {
        v.style.setProperty('object-fit', 'contain', 'important')
        v.style.setProperty('object-position', 'center', 'important')
        v.style.setProperty('width', 'auto', 'important')
        v.style.setProperty('height', '100vh', 'important')
        v.style.setProperty('max-width', '56.25vh', 'important')
        v.style.setProperty('max-height', '100vh', 'important')
        v.style.setProperty('aspect-ratio', '9 / 16', 'important')
        v.style.setProperty('background', '#000', 'important')
        v.style.setProperty('position', 'fixed', 'important')
        v.style.setProperty('top', '50%', 'important')
        v.style.setProperty('left', '50%', 'important')
        v.style.setProperty('transform', 'translate(-50%, -50%)', 'important')
        v.style.setProperty('inset', 'auto', 'important')
        v.style.setProperty('border-radius', '0', 'important')
      } else {
        v.style.removeProperty('object-fit')
        v.style.removeProperty('object-position')
        v.style.removeProperty('width')
        v.style.removeProperty('height')
        v.style.removeProperty('max-width')
        v.style.removeProperty('max-height')
        v.style.removeProperty('aspect-ratio')
        v.style.removeProperty('background')
        v.style.removeProperty('position')
        v.style.removeProperty('top')
        v.style.removeProperty('left')
        v.style.removeProperty('transform')
        v.style.removeProperty('inset')
        v.style.removeProperty('border-radius')
      }
    }

    const events = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange']
    events.forEach((ev) => document.addEventListener(ev, apply))
    return () => events.forEach((ev) => document.removeEventListener(ev, apply))
  }, [videoSrc])

  return (
    <div className="reel-card">
      <div className={`reel-thumb${hasEmbed ? ' reel-thumb--video' : ''}`}>
        <span className={`badge ${badgeColor}`}>{badge}</span>
        {videoId ? (
          <iframe
            className="reel-video"
            src={
              isMobile
                ? `https://www.youtube.com/embed/${videoId}?playsinline=1`
                : `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${videoId}`
            }
            title="YouTube video player"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : videoSrc ? (
          <video
            ref={videoRef}
            className="reel-video"
            src={videoSrc}
            muted
            playsInline
            autoPlay={!isMobile}
            loop
            controls
            preload="metadata"
          />
        ) : (
          <h3>{title}</h3>
        )}
      </div>
      <div className="reel-meta">
        <div className="reel-stats">
          {views && (
            <span className="reel-stat reel-stat--views">
              <EyeIcon />
              {views}
            </span>
          )}
          {likes && (
            <span className="reel-stat reel-stat--likes">
              <HeartIcon />
              {likes}
            </span>
          )}
        </div>
        <div className={`reel-cat ${categoryColor}`}>{category}</div>
        <h4>{heading}</h4>
        <p>{description}</p>
      </div>
    </div>
  )
}
