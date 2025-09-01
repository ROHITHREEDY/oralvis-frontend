import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Welcome, {user.email}</h2>
      <p style={{ margin: "1rem 0" }}>
        Role: <b>{user.role}</b>
      </p>
      <button style={{ padding: 8, width: "100%" }} onClick={handleLogout}>
        Logout
      </button>
      <p style={{ marginTop: 18 }}>Assignment - Home/Dashboard</p>
    </div>
  );
}
