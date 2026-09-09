import { motion } from 'framer-motion'
import './CTA.css'

const features = [
  { label: 'Fast Turnaround', dot: 'blue' },
  { label: 'Unlimited Revisions', dot: 'blue' },
  { label: 'Custom Subtitles', dot: 'blue' },
]

export default function CTA() {
  return (
    <motion.section
      className="cta"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.455, 0.03, 0.515, 0.955] }}
    >
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
    </motion.section>
  )
}
