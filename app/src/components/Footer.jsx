import PawIcon from './PawIcon'
import './Footer.css'

const socials = [
  { label: 'Twitter', url: 'https://x.com/NixTheVix' },
  { label: 'Discord', url: 'https://discord.com/users/1047824702019747890' },
  { label: 'YouTube', url: 'https://www.youtube.com/@NixTheVix' },
  { label: 'Instagram', url: 'https://www.instagram.com/nixthevix_/' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="logo">
          <span className="logo-icon footer-logo-icon">
            <PawIcon />
          </span>{' '}
          NIX.
        </div>
        <div className="footer-links">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.label}
            </a>
          ))}
        </div>
        <div className="footer-copy">© 2026 NixTheVixen Portfolio</div>
      </div>
    </footer>
  )
}
