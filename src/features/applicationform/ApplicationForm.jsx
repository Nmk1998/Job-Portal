import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ApplicationForm.css";
import { API_BASE_URL } from "../../config.js";

export default function ApplicationForm({ job, user }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: user?.name || "",
    gmailId: user?.email || "",       // ← matches Java gmailId
    phoneNumber: "",                   // ← matches Java phoneNumber
    location: "",
    experience: "",
    currentCompany: "",
    expectedSalary: "",               // ← matches Java expectedSalary
    noticePeriod: "",
    coverLetter: ""
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!resume) {
    setError("Please upload your resume!");
    return;
  }

  const formData = new FormData();

  formData.append("fullName", form.fullName);
  formData.append("gmailId", form.gmailId);
  formData.append("phoneNumber", form.phoneNumber);
  formData.append("location", form.location);
  formData.append("experience", form.experience);
  formData.append("currentCompany", form.currentCompany);
  formData.append("expectedSalary", form.expectedSalary);
  formData.append("noticePeriod", form.noticePeriod);
  formData.append("coverLetter", form.coverLetter);
  formData.append("resume", resume);

  setLoading(true);
  setError("");

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/form/applications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const msg = await res.text();

    if (res.ok) {
      setSubmitted(true);
      setTimeout(() => navigate("/"), 2000);
    } else {
      setError(msg);
    }

  } catch (err) {
    setError("Server error. Please try again.");
  } finally {
    setLoading(false);
  }
  };

  if (submitted) {
    return (
      <div className="app-form success-screen">
        <div className="success-icon">🎉</div>
        <h3>Application Submitted!</h3>
        <p>Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been submitted!</p>
        <p className="redirect-msg">Redirecting to home...</p>
        <button className="submit-btn" onClick={() => navigate("/")}>← Back to Home</button>
      </div>
    );
  }

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Apply for {job.title}</h3>
      <p className="form-company">@ {job.company}</p>

      <div className="form-grid">
        <div className="field">
          <label>Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="field">
          <label>Gmail ID</label>
          <input
            name="gmailId"
            value={form.gmailId}
            onChange={handleChange}
            placeholder="you@gmail.com"
            required
          />
        </div>

        <div className="field">
          <label>Phone Number</label>
          <input
            name="phoneNumber"
            onChange={handleChange}
            placeholder="+91 9999999999"
            required
          />
        </div>

        <div className="field">
          <label>Location</label>
          <input
            name="location"
            onChange={handleChange}
            placeholder="City, Country"
            required
          />
        </div>

        <div className="field">
          <label>Experience (years)</label>
          <input
            name="experience"
            onChange={handleChange}
            placeholder="e.g. 3"
            type="number"
            required
          />
        </div>

        <div className="field">
          <label>Current Company</label>
          <input
            name="currentCompany"
            onChange={handleChange}
            placeholder="Current Company"
          />
        </div>

        <div className="field">
          <label>Expected Salary</label>
          <input
            name="expectedSalary"
            onChange={handleChange}
            placeholder="e.g. 80000"
            type="number"
          />
        </div>

        <div className="field">
          <label>Notice Period (days)</label>
          <input
            name="noticePeriod"
            onChange={handleChange}
            placeholder="e.g. 30"
            type="number"
          />
        </div>
      </div>

      <div className="field">
        <label>Cover Letter</label>
        <textarea
          name="coverLetter"
          onChange={handleChange}
          placeholder="Tell us why you're a great fit..."
          rows="4"
        />
      </div>

      <div className="resume-upload">
        <label>📎 Upload Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          required
        />
        {resume && <span className="file-name">✅ {resume.name}</span>}
      </div>

      {error && <div className="form-error">⚠️ {error}</div>}

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application →"}
        </button>
      </div>
    </form>
  );
}