import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import CompanyLogo from "../utils/CompanyLogo.jsx";


export default function SearchResults({ user, onAuthClick, onRecruiterClick, onLogout }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get("title") || "";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchJobs = async () => {
    setLoading(true);
    try {
      let url = category
        ? `/api/jobs/by-category?category=${encodeURIComponent(category)}`
        : `/api/jobs/search?title=${keyword}&location=${location}`;

      const res = await fetch(url);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };
  fetchJobs();
}, [keyword, location, category]);

  return (
    <div className="app">
      <Navbar
        user={user}
        onAuthClick={onAuthClick}
        onRecruiterClick={onRecruiterClick}
        onLogout={onLogout}
      />

      <div className="search-results-wrap">
        <div className="inner">

          {/* Header */}
          <div className="results-header">
            <div>
              <h2 className="section-title">
                {category ? `${category} Jobs` : keyword ? `Results for "${keyword}"` : "All Jobs"}
                </h2>
              <p className="section-sub">
                {location ? `📍 ${location}` : "All locations"} · {jobs.length} jobs found
              </p>
            </div>
            <button className="btn btn-ghost" onClick={() => navigate("/")}>← Back to Home</button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="loading">
              <p>Searching jobs...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="error" style={{ textAlign: "center" }}>{error}</div>
          )}

          {/* No Results */}
          {!loading && !error && jobs.length === 0 && (
            <div className="no-results">
              <p>😔 No jobs found for "<strong>{keyword}</strong>"</p>
              <button className="btn btn-primary" onClick={() => navigate("/")}>Search Again</button>
            </div>
          )}

          {/* Jobs Grid */}
          {!loading && jobs.length > 0 && (
            <div className="jobs-grid">
              {jobs.map(j => (
                <div key={j.id} className="job-card">
                  <div className="job-header">
                    <CompanyLogo company={j.company} />
                    {j.hot && <span className="hot-badge">🔥 Hot</span>}
                  </div>
                  <h3 className="job-title">{j.title}</h3>
                  <p className="job-company">{j.company}</p>
                  <div className="job-meta">
                    <span>📍 {j.location}</span>
                    <span>💼 {j.jobType}</span>
                  </div>
                  <div className="job-footer">
                    <span className="job-salary">{j.salary}</span>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate(`/jobs/${j.id}`, { state: { job: j } })}>
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
      
      <Footer />
    </div>
  );
}