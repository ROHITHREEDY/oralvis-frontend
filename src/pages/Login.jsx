import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ apiBase, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await axios.post(`${apiBase}/api/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Login</h2>
      {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}
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
        <button
          type="submit"
          style={{ width: "100%", padding: 10, background: "#1A91F0", color: "#fff", border: "none", borderRadius: 4 }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: 10, textAlign: "center" }}>
        New? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
