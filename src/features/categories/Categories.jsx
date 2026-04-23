import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config.js";

const CATEGORIES = [
  { icon: "⚛️", label: "Frontend" },
  { icon: "🖥️", label: "Backend" },
  { icon: "📱", label: "Mobile" },
  { icon: "☁️", label: "DevOps / Cloud" },
  { icon: "🤖", label: "AI / ML" },
  { icon: "🔧", label: "Full Stack" },
  { icon: "🔒", label: "Cybersecurity" },
  { icon: "🎨", label: "UI/UX Design" },
  { icon: "📊", label: "Data Science" },
];

export default function Categories({ refreshKey }) {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});

  const fetchCounts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/category-card`);
      const data = await res.json();
      setCounts(data);
    } catch (err) {
      console.error("Failed to fetch category counts", err);
    }
  };

  const handleCategoryClick = (label) => {
  navigate(`/search?category=${encodeURIComponent(label)}`);
  };

  useEffect(() => {
    // fetch immediately
    fetchCounts();

    // then fetch every 30 seconds automatically
    const interval = setInterval(fetchCounts, 30000);

    // cleanup on unmount
    return () => clearInterval(interval);
  }, [refreshKey]);

  return (
    <div className="categories-wrap">
      <div className="inner">
        <h2 className="section-title">Browse by Category</h2>
        <p className="section-sub">Explore top roles across the tech industry</p>
        <div className="categories-grid">
          {CATEGORIES.map(c => (
            <div key={c.label} className="category-card" onClick={() => handleCategoryClick(c.label)}>
              <span className="cat-icon">{c.icon}</span>
              <span className="cat-label">{c.label}</span>
              <span className="cat-count">
                {counts[c.label] !== undefined ? `${counts[c.label]} jobs` : "0 jobs"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}