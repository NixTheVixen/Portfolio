import { useEffect, useState } from 'react'
import ReelCard from './ReelCard'
import { fetchYouTubeStats } from '../lib/youtubeStats'
import reel2Video from '../assets/reel2.mp4'
import './FeaturedReels.css'

const API_KEY = import.meta.env.VITE_YT_API_KEY
const REFRESH_MS = 5 * 60 * 1000 // re-poll every 5 minutes while the page is open

const reels = [
  {
    badge: 'HIGH RETENTION',
    badgeColor: 'pink',
    videoId: 'sbDRAsFKRms', // embedded player + live view/like counts
    category: '⚡ FAST-PACED HOOK',
    categoryColor: 'pink',
    heading: 'How-To Style',
    views: '128K', // fallback shown until the API key is configured
    likes: '9.4K',
    description:
      'Focuses on clear visuals for new players to have a point of reference.',
  },
  {
    badge: 'FUN TIME',
    badgeColor: 'blue',
    videoSrc: reel2Video, // self-hosted Instagram reel; stats stay manual
    category: '🤣 RELATABLE MEME',
    categoryColor: 'blue',
    heading: 'A Moment Of Laughter',
    views: '656K',
    likes: '34K',
    description:
      'Popular meme formats that go viral and make your viewers have a good laugh.',
  },
  {
    badge: 'ENGAGING TUTORIAL',
    badgeColor: 'yellow',
    videoId: 'p0nJ6_oWiI4', // embedded player + live stats
    category: '💬 HIGH ENGAGEMENT',
    categoryColor: 'purple',
    heading: 'Value-Driven Short',
    views: '214K',
    likes: '18.3K',
    description:
      'Fast information delivery with clear call-outs and zoom-ins for maximum clarity.',
  },
]

// Live YouTube view/like counts keyed by video id. Re-polls periodically.
// Returns {} (→ manual fallbacks are used) when no API key is configured.
function useYouTubeStats(ids) {
  const [stats, setStats] = useState({})
  const key = ids.join(',')
  useEffect(() => {
    const list = key ? key.split(',') : []
    if (!API_KEY || list.length === 0) return undefined
    let active = true
    const load = () =>
      fetchYouTubeStats(list, API_KEY)
        .then((data) => {
          if (active) setStats(data)
        })
        .catch((err) => console.warn('YouTube stats fetch failed:', err))
    load()
    const timer = setInterval(load, REFRESH_MS)
    return () => {
      active = false
      clearInterval(timer)
    }
  }, [key])
  return stats
}

export default function FeaturedReels() {
  const statsIds = reels.map((r) => r.videoId ?? r.statsId).filter(Boolean)
  const liveStats = useYouTubeStats(statsIds)

  return (
    <section className="reels">
      <h2>Featured Reels</h2>
      <p>Crafting finger-stopping hooks.</p>
      <div className="reel-grid">
        {reels.map((reel) => {
          const id = reel.videoId ?? reel.statsId
          const live = id ? liveStats[id] : undefined
          return (
            <ReelCard
              key={reel.heading}
              {...reel}
              views={live?.views ?? reel.views}
              likes={live?.likes ?? reel.likes}
            />
          )
        })}
      </div>
    </section>
  )
}
