import ReelCard from './ReelCard'
import './FeaturedReels.css'

const reels = [
  {
    badge: 'HIGH RETENTION',
    badgeColor: 'pink',
    title: 'Hardcore Survival 100 Days Recap',
    category: '⚡ FAST-PACED HOOK',
    categoryColor: 'pink',
    heading: "The Speedrunner's Dilemma",
    description:
      'Focuses on split-second decision making with dynamic captions and SFX impact.',
  },
  {
    badge: 'VISUAL STORYTELLING',
    badgeColor: 'blue',
    title: 'Building the Sakura Palace',
    category: '❄ COZY CINEMATIC',
    categoryColor: 'blue',
    heading: 'Atmospheric Builds',
    description:
      'Satisfying time-lapse edits with soft color grading and immersive world-building.',
  },
  {
    badge: 'ENGAGING TUTORIAL',
    badgeColor: 'yellow',
    title: '5 Redstone Hacks You Need',
    category: '💬 HIGH ENGAGEMENT',
    categoryColor: 'purple',
    heading: 'Value-Driven Short',
    description:
      'Fast information delivery with clear call-outs and zoom-ins for maximum clarity.',
  },
]

export default function FeaturedReels() {
  return (
    <section className="reels">
      <h2>Featured Reels</h2>
      <p>Crafting hooks that keep viewers scrolling... to a stop.</p>
      <div className="reel-grid">
        {reels.map((reel) => (
          <ReelCard key={reel.title} {...reel} />
        ))}
      </div>
    </section>
  )
}
