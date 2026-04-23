import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onAuthClick, onRecruiterClick, user, recruiter, onLogout, onPostJob }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <div className="logo" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        tech-jobs <span className="logo-badge">.com</span>
      </div>
      <div className="nav-actions">
        {recruiter ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button className="btn btn-primary" onClick={onPostJob}>+ Post a Job</button>
            <div className="profile-wrap">
              <button className="profile-btn" onClick={() => setShowDropdown(!showDropdown)}>
                <div className="profile-icon">{recruiter.name.charAt(0).toUpperCase()}</div>
                <span className="profile-name">{recruiter.name}</span>
              </button>
              {showDropdown && (
                <div className="profile-dropdown">
                  <span className="dropdown-email">{recruiter.email}</span>
                  <hr />
                  <button onClick={() => { setShowDropdown(false); }}>My Job Posts</button>
                  <hr />
                  <button className="logout-btn" onClick={() => { onLogout("recruiter"); setShowDropdown(false); }}>Logout</button>
                </div>
              )}
            </div>
          </div>
        ) : user ? (
          <div className="profile-wrap">
            <button className="profile-btn" onClick={() => setShowDropdown(!showDropdown)}>
              <div className="profile-icon">{user.name.charAt(0).toUpperCase()}</div>
              <span className="profile-name">{user.name}</span>
            </button>
            {showDropdown && (
              <div className="profile-dropdown">
                <span className="dropdown-email">{user.email}</span>
                <hr />
                <button onClick={() => { navigate("/profile"); setShowDropdown(false); }}>
                  👤 My Profile
                </button>
                <button onClick={() => { navigate("/my-applications"); setShowDropdown(false); }}>
                  📋 My Applications
                </button>
                <hr />
                <button className="logout-btn" onClick={() => { onLogout("user"); setShowDropdown(false); }}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button className="btn btn-primary" onClick={onAuthClick}>Job Candidate Login / Register</button>
            <button className="btn btn-outline" onClick={onRecruiterClick}>Recruiter Login / Register</button>
          </>
        )}
      </div>
    </nav>
  );
}