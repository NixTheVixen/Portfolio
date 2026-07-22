import MailIcon from './MailIcon'
import './CTA.css'

const features = [
  { label: 'Fast 24h Turnaround', dot: 'pink' },
  { label: 'Unlimited Revisions', dot: 'blue' },
  { label: 'Custom Subtitles', dot: 'pink' },
]

export default function CTA() {
  return (
    <section className="cta">
      <div className="mail-icon">
        <MailIcon />
      </div>
      <h2>Ready to Scale Your Channel?</h2>
      <p>Grab a spot for a free edit trial or book a commission now!</p>
      <div className="cta-actions">
        <button className="btn-primary">Book an Edit</button>
        <button className="btn-outline">Work With Me</button>
      </div>
      <div className="features">
        {features.map((feature) => (
          <span key={feature.label}>
            <span className={`dot ${feature.dot}`}></span> {feature.label}
          </span>
        ))}
      </div>
    </section>
  )
}
