export default function TrendingTags({ trending, setJob }) {
  return (
    <div className="trending">
      <span className="trending-label">Trending:</span>
      {trending.map(t => (
        <button key={t} className="tag" onClick={() => setJob(t)}>{t}</button>
      ))}
    </div>
  );
}