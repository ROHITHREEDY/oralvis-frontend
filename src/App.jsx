import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// Replace with your actual backend URL deployed on Render
const API_BASE = "https://oralvis-backend-s50v.onrender.com";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register apiBase={API_BASE} />} />
        <Route path="/login" element={<Login apiBase={API_BASE} setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
