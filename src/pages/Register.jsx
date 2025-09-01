import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register({ apiBase }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("technician");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    try {
      await axios.post(`${apiBase}/api/auth/register`, { email, password, role });
      setMsg("Registered! Please login.");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Register</h2>
      {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}
      {msg && <div style={{ color: "green", marginBottom: 8 }}>{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        >
          <option value="technician">Technician</option>
          <option value="dentist">Dentist</option>
        </select>
        <button
          type="submit"
          style={{ width: "100%", padding: 10, background: "#1A91F0", color: "#fff", border: "none", borderRadius: 4 }}
        >
          Register
        </button>
      </form>
      <p style={{ marginTop: 10, textAlign: "center" }}>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
