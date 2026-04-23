import { useState } from "react";
import "./PostJobModal.css";
import { API_BASE_URL } from "../../config.js";

export default function PostJobModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    salary: "",
    category: "",
    hot: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Job title is required";
    if (!form.company.trim()) e.company = "Company name is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.jobType) e.jobType = "Job type is required";
    if (!form.salary.trim()) e.salary = "Salary is required";
    if (!form.category) e.category = "Category is required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/postjob`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      } else {
        const msg = await res.text();
        setErrors({ form: msg });
      }
    } catch (err) {
      setErrors({ form: "Server error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box post-job-modal" onClick={e => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-logo">Post a <span className="logo-badge">Job</span></div>
        <p className="modal-subtitle">Fill in the details to post your job listing</p>

        {submitted ? (
          <div className="modal-success">
            <div className="success-icon">🎉</div>
            <h3>Job Posted Successfully!</h3>
            <p>Your job listing is now live and visible to candidates.</p>
          </div>
        ) : (
          <div className="modal-form">

            <div className="form-row">
              <div className="field">
                <label>Job Title</label>
                <input value={form.title} onChange={e => update("title", e.target.value)} placeholder="e.g. Senior React Developer" />
                {errors.title && <span className="error">{errors.title}</span>}
              </div>

              <div className="field">
                <label>Company Name</label>
                <input value={form.company} onChange={e => update("company", e.target.value)} placeholder="e.g. Stripe" />
                {errors.company && <span className="error">{errors.company}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label>Location</label>
                <input value={form.location} onChange={e => update("location", e.target.value)} placeholder="e.g. Remote, New York" />
                {errors.location && <span className="error">{errors.location}</span>}
              </div>

              <div className="field">
                <label>Salary</label>
                <input value={form.salary} onChange={e => update("salary", e.target.value)} placeholder="e.g. $120K–$150K" />
                {errors.salary && <span className="error">{errors.salary}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label>Job Type</label>
                <select value={form.jobType} onChange={e => update("jobType", e.target.value)}>
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
                {errors.jobType && <span className="error">{errors.jobType}</span>}
              </div>

              <div className="field">
                <label>Category</label>
                <select value={form.category} onChange={e => update("category", e.target.value)}>
                  <option value="">Select category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Mobile">Mobile</option>
                  <option value="DevOps / Cloud">DevOps / Cloud</option>
                  <option value="AI / ML">AI / ML</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Data Science">Data Science</option>
                </select>
                {errors.category && <span className="error">{errors.category}</span>}
              </div>
            </div>

            <div className="field checkbox-field">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.hot}
                  onChange={e => update("hot", e.target.checked)}
                />
                <span>🔥 Mark as Hot Job</span>
              </label>
            </div>

            {errors.form && <div className="error" style={{ textAlign: "center" }}>{errors.form}</div>}

            <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
              {loading ? "Posting..." : "Post Job →"}
            </button>

          </div>
        )}
      </div>
    </div>
  );
}