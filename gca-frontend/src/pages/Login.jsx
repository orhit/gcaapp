import { useState, useEffect } from "react";
import "../styles/login.css";
import { API_BASE } from "../config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fake loader (like your site)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const handleLogin = async () => {
  setError("");

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json();

    localStorage.setItem("role", data.role);
localStorage.setItem("user_id", data.user_id);
localStorage.setItem("name", data.name);
localStorage.setItem("email", email);
localStorage.setItem("password", password);

    window.location.reload();
  } catch {
    setError("Invalid credentials");
  }
};

  if (loading) {
    return (
      <div className="login-loader">
        <i className="fas fa-chess-knight"></i>
        <h5>GAMBIT ACADEMY</h5>
      </div>
    );
  }

  return (
    <div className="login-wrapper">
      {/* background chess pieces */}
      <i className="fas fa-chess-pawn bg-piece one"></i>
      <i className="fas fa-chess-rook bg-piece two"></i>
      <i className="fas fa-chess-queen bg-piece three"></i>

      <div className="login-card">
        <div className="logo">
          <i className="fas fa-chess-knight"></i>
        </div>

        <h2>Gambit Academy</h2>
        <p className="subtitle">Internal Training Portal</p>

        <input
          type="email"
          placeholder="User ID / Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <div className="error">{error}</div>}

        <button onClick={handleLogin}>Enter Academy</button>

        <p className="note">
          Access restricted to students, coaches & staff
        </p>
      </div>
    </div>
  );
}
