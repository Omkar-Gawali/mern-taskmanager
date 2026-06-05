import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
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

      const res = await API.post("/auth/login", formData);

      login(res.data.token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
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
          Stay on top of everything that matters.
        </h2>
        <p className="auth-sub">
          Manage tasks, track progress, and collaborate with your team — all in
          one clean workspace.
        </p>
        <div className="auth-dots">
          <span className="active" />
          <span />
          <span />
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h1>Task Manager</h1>

          <div className="auth-card-header">
            <h2>Welcome back</h2>
            <p>Sign in to continue to your workspace</p>
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
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p className="auth-footer">
            Don't have an account?
            <Link to="/register">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
