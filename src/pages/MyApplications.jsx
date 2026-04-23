import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import CompanyLogo from "../utils/CompanyLogo.jsx";
import "./MyApplications.css";
import { API_BASE_URL } from "../config.js";

const STATUS_COLORS = {
  "Pending":    { bg: "#fff3e0", color: "#e65100", border: "#ffcc80" },
  "Reviewing":  { bg: "#e3f2fd", color: "#1565c0", border: "#90caf9" },
  "Shortlisted":{ bg: "#f3e5f5", color: "#6a1b9a", border: "#ce93d8" },
  "Rejected":   { bg: "#ffebee", color: "#b71c1c", border: "#ef9a9a" },
  "Hired":      { bg: "#f0fff4", color: "#166534", border: "#86efac" },
};

export default function MyApplications({ user, onLogout, onAuthClick, onRecruiterClick }) {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("Token from localStorage:", token); // 🔍 DEBUG

        // ❌ If no token → stop here
        if (!token) {
          console.error("No token found. User not authenticated.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/form/applications/user`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        // 🔍 Handle unauthorized
        if (res.status === 401) {
          console.error("Unauthorized - Invalid or expired token");
          localStorage.removeItem("token"); // optional auto logout
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("API Response:", data);

        setApplications(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  if (!user) {
    return (
      <div className="app">
        <Navbar user={user} onAuthClick={onAuthClick} onRecruiterClick={onRecruiterClick} onLogout={onLogout} />
        <div className="my-apps-wrap">
          <div className="not-logged-in">
            <h2>Please login to view your applications</h2>
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

      <div className="my-apps-wrap">
        <div className="my-apps-inner">

          <button className="back-btn" onClick={() => navigate("/profile")}>
            ← Back to Profile
          </button>

          <div className="my-apps-header">
            <div>
              <h2 className="section-title">My Applications</h2>
              <p className="section-sub">{applications.length} total applications</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              🔍 Find More Jobs
            </button>
          </div>

          <div className="status-summary">
            {Object.keys(STATUS_COLORS).map(status => (
              <div
                key={status}
                className="status-count-card"
                style={{
                  borderColor: STATUS_COLORS[status].border,
                  background: STATUS_COLORS[status].bg
                }}
              >
                <span
                  className="status-count-number"
                  style={{ color: STATUS_COLORS[status].color }}
                >
                  {applications.filter(a => a.status === status).length}
                </span>
                <span
                  className="status-count-label"
                  style={{ color: STATUS_COLORS[status].color }}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>

          {loading && (
            <div className="loading">
              <p>Loading your applications...</p>
            </div>
          )}

          {!loading && applications.length === 0 && (
            <div className="no-apps">
              <div className="no-apps-icon">📭</div>
              <h3>No applications yet!</h3>
              <p>Start applying to jobs and track your progress here.</p>
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                Browse Jobs
              </button>
            </div>
          )}

          {!loading && applications.length > 0 && (
            <div className="apps-list">
              {applications.map(app => {
                const statusStyle = STATUS_COLORS[app.status] || STATUS_COLORS["Pending"];

                return (
                  <div key={app.id} className="app-card">
                    <div className="app-card-left">

                      <CompanyLogo company={app.currentCompany} />

                      <div className="app-card-info">
                        <h3 className="app-job-title">{app.fullName}</h3>
                        <p className="app-company">{app.currentCompany}</p>

                        <div className="app-meta">
                          <span>📍 {app.location}</span>
                          <span>💼 {app.experience} yrs</span>
                          <span>💰 ₹{app.ExpectedSalary?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="app-card-right">
                      <span
                        className="app-status"
                        style={{
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          border: `1px solid ${statusStyle.border}`
                        }}
                      >
                        {app.status}
                      </span>

                      <p className="app-date">
                        Applied: {app.created_at || "N/A"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}