import { useState } from "react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

import "../styles/auth.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/auth/register", formData);

      toast.success("Registration Successful");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left decorative panel */}
      <div className="auth-left">
        <div className="auth-brand">
          TaskFlow
          <span />
        </div>
        <h2 className="auth-headline">
          Your productivity journey starts here.
        </h2>
        <p className="auth-sub">
          Create an account and start organizing your work, setting priorities,
          and hitting every deadline.
        </p>
        <div className="auth-dots">
          <span />
          <span className="active" />
          <span />
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h1>Task Manager</h1>

          <div className="auth-card-header">
            <h2>Create account</h2>
            <p>Join TaskFlow and get organised today</p>
          </div>

          <div className="auth-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Jane Smith"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </button>

          <p className="auth-footer">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
