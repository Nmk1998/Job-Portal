import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "./UserProfile.css";

export default function UserProfile({ user, onLogout, onAuthClick, onRecruiterClick }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="app">
        <Navbar user={user} onAuthClick={onAuthClick} onRecruiterClick={onRecruiterClick} onLogout={onLogout} />
        <div className="profile-page-wrap">
          <div className="not-logged-in">
            <h2>Please login to view your profile</h2>
            <button className="btn btn-primary" onClick={onAuthClick}>Login Now</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar user={user} onAuthClick={onAuthClick} onRecruiterClick={onRecruiterClick} onLogout={onLogout} />

      <div className="profile-page-wrap">
        <div className="profile-inner">

          <button className="back-btn" onClick={() => navigate("/")}>← Back to Home</button>

          <div className="profile-grid">

            {/* Left - Profile Card */}
            <div className="profile-card">
              <div className="profile-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-email">{user.email}</p>
              <span className="profile-badge">Job Candidate</span>

              <div className="profile-stats">
                <div className="profile-stat">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Applications</span>
                </div>
                <div className="profile-stat">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Saved Jobs</span>
                </div>
                <div className="profile-stat">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Interviews</span>
                </div>
              </div>

              <button
                className="view-applications-btn"
                onClick={() => navigate("/my-applications")}
              >
                📋 View My Applications
              </button>
            </div>

            {/* Right - Profile Details */}
            <div className="profile-details">

              <div className="profile-section">
                <h3>Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">👤 Username</span>
                    <span className="info-value">{user.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📧 Email</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📱 Phone</span>
                    <span className="info-value">Not provided</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📍 Location</span>
                    <span className="info-value">Not provided</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">💼 Experience</span>
                    <span className="info-value">Not provided</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🏢 Current Company</span>
                    <span className="info-value">Not provided</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Account Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">🗓 Member Since</span>
                    <span className="info-value">2024</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">✅ Account Status</span>
                    <span className="info-value status-active">Active</span>
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <button className="edit-profile-btn">✏️ Edit Profile</button>
                <button className="logout-profile-btn" onClick={() => { onLogout("user"); navigate("/"); }}>
                  🚪 Logout
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}