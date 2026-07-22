import './Hero.css'
import profilePhoto from '../assets/profile.png'
import VideoIcon from './VideoIcon'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="tag-pill">✦ Your Trusted Video Editor</span>
        <h1>
          Cozy Vibe.
          <br />
          <span className="accent">Fast-Paced</span>
          <br />
          Edits.
        </h1>
        <p>
          ❄️ Hi, I'm Nix! I specialize in turning your Minecraft videos into
          high-retention reels, focusing on quality and communication. Let's
          grow your channel together! 🌸
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
