import { useState } from "react";
import "./AuthModal.css";
import { API_BASE_URL } from "../../config.js";

export default function AuthModal({ onClose, onSuccess }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({
    username: "",
    emailAddress: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = "Username is required";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";

    if (tab === "register") {
      if (!form.emailAddress.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        e.emailAddress = "Valid email is required";

      if (form.password !== form.confirmPassword)
        e.confirmPassword = "Passwords do not match";
    }

    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // ✅ Prepare request body
      const body =
        tab === "login"
          ? {
              username: form.username,
              password: form.password
            }
          : {
              username: form.username,
              emailAddress: form.emailAddress, // ✅ matches backend
              password: form.password,
              confirmPassword: form.confirmPassword
            };

      const res = await fetch(`${API_BASE_URL}/api/auth/${tab}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      // 🔥 LOGIN FLOW
      if (tab === "login") {
        if (res.ok) {
          const token = await res.text(); // ✅ get JWT

          console.log("TOKEN RECEIVED:", token);

          // ✅ store token
          localStorage.setItem("token", token);

          setSubmitted(true);

          setTimeout(() => {
            onSuccess({
              name: form.username,
              email: form.emailAddress
            });
          }, 1500);
        } else {
          const msg = await res.text();
          setErrors({ form: msg });
        }
      }

      // 🔥 REGISTER FLOW
      else {
        if (res.ok) {
          setSubmitted(true);
        } else {
          const msg = await res.text();
          setErrors({ form: msg });
        }
      }

    } catch (err) {
      console.error(err);
      setErrors({ form: "Server error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (t) => {
    setTab(t);
    setErrors({});
    setSubmitted(false);
    setForm({
      username: "",
      emailAddress: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-logo">
          tech-jobs <span className="logo-badge">.com</span>
        </div>

        <div className="modal-tabs">
          <button
            className={`modal-tab ${tab === "login" ? "active" : ""}`}
            onClick={() => switchTab("login")}
          >
            Sign In
          </button>

          <button
            className={`modal-tab ${tab === "register" ? "active" : ""}`}
            onClick={() => switchTab("register")}
          >
            Create Account
          </button>
        </div>

        {submitted ? (
          <div className="modal-success">
            <div className="success-icon">🎉</div>
            <h3>{tab === "login" ? "Welcome back!" : "Account created!"}</h3>
            <p>
              {tab === "login"
                ? "You've successfully signed in."
                : "Your account is ready!"}
            </p>
          </div>
        ) : (
          <div className="modal-form">

            <div className="field">
              <label>Username</label>
              <input
                value={form.username}
                onChange={e => update("username", e.target.value)}
                placeholder="johndoe"
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>

            {tab === "register" && (
              <div className="field">
                <label>Email Address</label>
                <input
                  type="email"
                  value={form.emailAddress}
                  onChange={e => update("emailAddress", e.target.value)}
                  placeholder="you@example.com"
                />
                {errors.emailAddress && (
                  <span className="error">{errors.emailAddress}</span>
                )}
              </div>
            )}

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={e => update("password", e.target.value)}
                placeholder="••••••••"
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            {tab === "register" && (
              <div className="field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={e => update("confirmPassword", e.target.value)}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
              </div>
            )}

            {errors.form && (
              <div className="error" style={{ textAlign: "center" }}>
                {errors.form}
              </div>
            )}

            <button
              className="btn-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : tab === "login"
                ? "Sign In"
                : "Create Account"}
            </button>

            <p className="switch-text">
              {tab === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() =>
                  switchTab(tab === "login" ? "register" : "login")
                }
              >
                {tab === "login" ? "Sign up free" : "Sign in"}
              </button>
            </p>

          </div>
        )}
      </div>
    </div>
  );
}