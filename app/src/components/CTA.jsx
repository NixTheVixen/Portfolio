import './CTA.css'

const features = [
  { label: 'Fast 24h Turnaround', dot: 'pink' },
  { label: 'Unlimited Revisions', dot: 'blue' },
  { label: 'Custom Subtitles', dot: 'pink' },
]

export default function CTA() {
  return (
    <section className="cta">
      <div className="mail-icon">✉️</div>
      <h2>Ready to Scale Your Channel?</h2>
      <p>
        My schedule fills up fast! Grab a spot for a free edit trial or book a
        full project package. Let's make your next Short go viral.
      </p>
      <div className="cta-actions">
        <button className="btn-primary">Book an Edit →</button>
        <button className="btn-outline">🦊 Work With Me</button>
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
