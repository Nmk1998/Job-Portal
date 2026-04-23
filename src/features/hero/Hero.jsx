import SearchBar from "../../components/SearchBar.jsx";
import TrendingTags from "../../components/TrendingTags.jsx";

const TRENDING = ["React Developer", "Node.js", "Python", "DevOps", "UI/UX Designer"];

export default function Hero({ job, setJob, loc, setLoc }) {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-eyebrow">🔥 #1 Platform for Dev Talent</p>
        <h1 className="hero-title">Next Stop: Your Dream <span className="highlight">Tech Job</span></h1>
        <p className="hero-sub">Thousands of developer roles updated daily. Land your dream job faster.</p>
        <SearchBar job={job} setJob={setJob} loc={loc} setLoc={setLoc} />
        <TrendingTags trending={TRENDING} setJob={setJob} />
      </div>
    </section>
  );
}