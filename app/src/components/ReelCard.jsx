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
  return (
    <div className="reel-card">
      <div className={`reel-thumb${hasEmbed ? ' reel-thumb--video' : ''}`}>
        <span className={`badge ${badgeColor}`}>{badge}</span>
        {videoId ? (
          <iframe
            className="reel-video"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${videoId}`}
            title="YouTube video player"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : videoSrc ? (
          <video
            className="reel-video"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
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
