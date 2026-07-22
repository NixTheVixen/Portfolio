import './CTA.css'

const features = [
  { label: 'Fast 24h Turnaround', dot: 'pink' },
  { label: 'Unlimited Revisions', dot: 'blue' },
  { label: 'Custom Subtitles', dot: 'pink' },
]

export default function CTA() {
  return (
    <section className="cta">
      <h2>Ready to Scale Your Channel?</h2>
      <p>
        Commission me through YTJobs for a free edit trial or book a meeting
        now!
      </p>
      <div className="cta-actions">
        <a
          className="btn-primary"
          href="https://calendly.com/aleycloy/30min"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a Meeting
        </a>
        <a
          className="btn-outline"
          href="https://ytjobs.co/talent/profile/588939?r=618"
          target="_blank"
          rel="noopener noreferrer"
        >
          Work With Me
        </a>
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
