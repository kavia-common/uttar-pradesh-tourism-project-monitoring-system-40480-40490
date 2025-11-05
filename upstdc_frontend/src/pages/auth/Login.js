import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { login } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

// PUBLIC_INTERFACE
export default function Login() {
  /** Login screen to obtain JWT tokens via backend and enter the app. */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { refreshAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login({ email, password });
      refreshAuth();
      navigate(from, { replace: true });
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "10vh auto" }} className="card">
      <h2>Sign in</h2>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <label style={{ marginTop: 8 }}>Password</label>
        <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        {err && <div style={{ color: "#ef4444", marginTop: 8 }}>{err}</div>}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button className="btn" type="submit" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
          <Link className="btn secondary" to="/signup">Create account</Link>
        </div>
      </form>
    </div>
  );
}
