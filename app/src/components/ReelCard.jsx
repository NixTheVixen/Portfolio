export default function ReelCard({ badge, badgeColor, title, category, categoryColor, heading, description }) {
  return (
    <div className="reel-card">
      <div className="reel-thumb">
        <span className={`badge ${badgeColor}`}>{badge}</span>
        <h3>{title}</h3>
      </div>
      <div className="reel-meta">
        <div className={`reel-cat ${categoryColor}`}>{category}</div>
        <h4>{heading}</h4>
        <p>{description}</p>
      </div>
    </div>
  )
}
