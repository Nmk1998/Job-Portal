import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CompanyLogo from "../../utils/CompanyLogo.jsx";
import AuthModal from "../login/AuthModal.jsx";
import ApplicationForm from "../applicationform/ApplicationForm.jsx";
import "./ApplyCard.css";

export default function ApplyCard({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // ✅ Handle Apply Click
  const handleApply = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setShowForm(true);
  };

  // ❌ If no job found
  if (!job) {
    return (
      <div className="apply-page">
        <div className="apply-container">
          <p>Job not found!</p>
          <button className="apply-back" onClick={() => navigate("/")}>
            ← Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ✅ Login Modal */}
      {showLoginModal && (
        <AuthModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={(userData) => {
            setUser(userData);
            setShowLoginModal(false);
            setShowForm(true); // 🔥 Open form after login
          }}
        />
      )}

      <div className="apply-page">
        <div className="apply-container">

          {/* Back Button */}
          <button className="apply-back" onClick={() => navigate(-1)}>
            ← Back to Jobs
          </button>

          {/* Header */}
          <div className="apply-header">
            <CompanyLogo company={job.company} />
            <div>
              <h2 className="apply-job-title">{job.title}</h2>
              <p className="apply-company">{job.company}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="apply-tags">
            <span className="apply-tag">📍 {job.location}</span>
            <span className="apply-tag">💼 {job.jobType}</span>
            <span className="apply-tag">💰 {job.salary}</span>
            <span className="apply-tag">🗂 {job.category}</span>
            {job.hot && <span className="hot-badge">🔥 Hot</span>}
          </div>

          {/* Login Banner */}
          {!user && !showForm && (
            <div className="apply-login-banner">
              <div className="banner-left">
                <span className="banner-icon">🔐</span>
                <div>
                  <p className="banner-title">Login required to apply</p>
                  <p className="banner-sub">
                    Create a free account and apply in seconds
                  </p>
                </div>
              </div>

              <button
                className="banner-btn"
                onClick={() => setShowLoginModal(true)}
              >
                Login / Register
              </button>
            </div>
          )}

          {/* About */}
          <div className="apply-section">
            <h3>About the Role</h3>
            <p>
              {job.description ||
                `We are looking for a talented ${job.title} to join ${job.company}. You will work on exciting projects with a world-class team.`}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="apply-section">
            <h3>Responsibilities</h3>
            <ul className="apply-list">
              <li>Design and develop high-quality software solutions</li>
              <li>Collaborate with cross-functional teams</li>
              <li>Write clean, maintainable and efficient code</li>
              <li>Participate in code reviews and technical discussions</li>
              <li>Troubleshoot and debug applications</li>
            </ul>
          </div>

          {/* Requirements */}
          <div className="apply-section">
            <h3>Requirements</h3>
            <ul className="apply-list">
              <li>3+ years of relevant experience</li>
              <li>Strong problem-solving skills</li>
              <li>Experience with modern technologies</li>
              <li>Excellent communication skills</li>
              <li>Bachelor's degree in CS or related field</li>
            </ul>
          </div>

          {/* Benefits */}
          <div className="apply-section">
            <h3>Benefits</h3>
            <div className="benefits-grid">
              {[
                { icon: "🏥", label: "Health Insurance" },
                { icon: "🏠", label: "Remote Friendly" },
                { icon: "📈", label: "Stock Options" },
                { icon: "🎓", label: "Learning Budget" },
                { icon: "🏖️", label: "Unlimited PTO" },
                { icon: "💻", label: "Home Office Setup" },
              ].map((b) => (
                <div key={b.label} className="benefit-item">
                  <span className="benefit-icon">{b.icon}</span>
                  <span className="benefit-label">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 🔥 Footer Logic */}
          <div className="apply-footer">

            {/* ✅ Success */}
            {formSubmitted ? (
              <div className="applied-success">
                <span className="success-icon">🎉</span>
                <div>
                  <h4>Application Submitted!</h4>
                  <p>We'll notify you about next steps.</p>
                </div>
              </div>
            ) : showForm ? (

              /* ✅ FORM COMPONENT */
              <ApplicationForm
                job={job}
                user={user}
                onSuccess={() => setFormSubmitted(true)}
              />

            ) : (

              /* ✅ APPLY BUTTON */
              <button className="apply-btn" onClick={handleApply}>
                {user ? "Apply Now →" : "Login to Apply →"}
              </button>

            )}

          </div>

        </div>
      </div>
    </>
  );
}