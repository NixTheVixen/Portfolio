const ENDPOINT = 'https://www.googleapis.com/youtube/v3/videos'

// 1234 -> "1.2K", 1500000 -> "1.5M", 950 -> "950"
export function formatCount(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return null
  if (n >= 1_000_000) return stripTrailingZero(n / 1_000_000) + 'M'
  if (n >= 1_000) return stripTrailingZero(n / 1_000) + 'K'
  return String(n)
}

function stripTrailingZero(x) {
  return (Math.round(x * 10) / 10).toString()
}

// Fetch statistics for many video IDs in a single request (costs 1 quota unit).
// Returns { [videoId]: { views, likes } }. `likes` is null when the uploader
// has hidden the like count. Returns {} when no key/ids are provided.
export async function fetchYouTubeStats(ids, apiKey) {
  if (!apiKey || ids.length === 0) return {}
  const url = `${ENDPOINT}?part=statistics&id=${ids.join(',')}&key=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) {
    let detail = ''
    try {
      const body = await res.json()
      detail = body?.error?.errors?.[0]?.reason || body?.error?.message || ''
    } catch {
      /* response had no JSON body */
    }
    throw new Error(
      `YouTube API responded ${res.status}${detail ? ` (${detail})` : ''}`
    )
  }
  const data = await res.json()
  const result = {}
  for (const item of data.items ?? []) {
    result[item.id] = {
      views: formatCount(item.statistics?.viewCount),
      likes: formatCount(item.statistics?.likeCount),
    }
  }
  return result
}
