import './Footer.css'

const socials = ['Twitter', 'Discord', 'YouTube', 'Instagram']

export default function Footer() {
  return (
    <footer className="footer">
      <div className="logo">
        <span className="logo-icon footer-logo-icon">🐾</span> NIX.
      </div>
      <div className="footer-links">
        {socials.map((social) => (
          <span key={social}>{social}</span>
        ))}
      </div>
      <div className="footer-copy">© 2024 Nix Portfolio. Made with ❄️ and 🌸</div>
    </footer>
  )
}
