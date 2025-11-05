import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup, login } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

// PUBLIC_INTERFACE
export default function Signup() {
  /** Signup screen for new users. After signup, auto-login. */
  const [name, setName] = useState("");
  const [role, setRole] = useState("USER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { refreshAuth } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signup({ name, email, password, role });
      await login({ email, password });
      refreshAuth();
      navigate("/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "8vh auto" }} className="card">
      <h2>Create account</h2>
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input className="input" value={name} onChange={(e)=>setName(e.target.value)} required />
        <label style={{ marginTop: 8 }}>Email</label>
        <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <label style={{ marginTop: 8 }}>Password</label>
        <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <label style={{ marginTop: 8 }}>Role</label>
        <select className="select" value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="ADMIN">ADMIN</option>
          <option value="PM">PM</option>
          <option value="ENGINEER">ENGINEER</option>
          <option value="AUDITOR">AUDITOR</option>
          <option value="USER">USER</option>
        </select>
        {err && <div style={{ color: "#ef4444", marginTop: 8 }}>{err}</div>}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button className="btn" type="submit" disabled={loading}>{loading ? "Creating..." : "Sign up"}</button>
          <Link className="btn secondary" to="/login">Back to login</Link>
        </div>
      </form>
    </div>
  );
}
