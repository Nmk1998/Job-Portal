import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ job, setJob, loc, setLoc }) {
  const navigate = useNavigate();
  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showTitles, setShowTitles] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  
  // Fetch title suggestions
useEffect(() => {
  if (job.trim().length < 2) { setTitleSuggestions([]); return; }
  const timer = setTimeout(async () => {
    try {
      const res = await fetch(`/api/jobs/suggest/titles?title=${job}`);
      const data = await res.json();
      setTitleSuggestions(data);
      setShowTitles(true);
    } catch (err) {
      console.error(err);
    }
  }, 300);
  return () => clearTimeout(timer);
}, [job]);

// Fetch location suggestions
useEffect(() => {
  if (loc.trim().length < 2) { setLocationSuggestions([]); return; }
  const timer = setTimeout(async () => {
    try {
      const res = await fetch(`/api/jobs/suggest/locations?location=${loc}`);
      const data = await res.json();
      setLocationSuggestions(data);
      setShowLocations(true);
    } catch (err) {
      console.error(err);
    }
  }, 300);
  return () => clearTimeout(timer);
}, [loc]);

// Navigate with correct param name
const handleSearch = () => {
  navigate(`/search?title=${job}&location=${loc}`);
};

  return (
    <div className="search-card">
      <div className="search-row">

        {/* Job Title Field */}
        <div className="search-field" ref={titleRef} style={{ position: "relative" }}>
          <span className="search-icon">🔍</span>
          <input
            value={job}
            onChange={e => { setJob(e.target.value); setShowTitles(true); }}
            onFocus={() => titleSuggestions.length > 0 && setShowTitles(true)}
            placeholder="Job title, skill or keyword"
          />
          {showTitles && titleSuggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {titleSuggestions.map((s, i) => (
                <div key={i} className="suggestion-item" onClick={() => { setJob(s); setShowTitles(false); }}>
                  🔍 {s}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="divider" />

        {/* Location Field */}
        <div className="search-field" ref={locationRef} style={{ position: "relative" }}>
          <span className="search-icon">📍</span>
          <input
            value={loc}
            onChange={e => { setLoc(e.target.value); setShowLocations(true); }}
            onFocus={() => locationSuggestions.length > 0 && setShowLocations(true)}
            placeholder="City, state or remote"
          />
          {showLocations && locationSuggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {locationSuggestions.map((s, i) => (
                <div key={i} className="suggestion-item" onClick={() => { setLoc(s); setShowLocations(false); }}>
                  📍 {s}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="search-btn" onClick={handleSearch}>Search Jobs</button>
      </div>
    </div>
  );
}