import { useState, useEffect } from "react";
import "../styles/login.css";
import { API_BASE } from "../config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fake loading effect (like chess knight animation)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const handleLogin = async () => {
  setError("");

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await res.json();

    localStorage.setItem("role", data.role);
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("name", data.name);
    localStorage.setItem("email", email);
    console.log("Saving password to sessionStorage:", password);

sessionStorage.setItem("password", password);

console.log(
  "Stored password:",
  sessionStorage.getItem("password"));

    // 🔥 ROUTER-AWARE NAVIGATION
    if (data.role === "admin") navigate("/admin");
    else if (data.role === "coach") navigate("/coach");
    else if (data.role === "student") navigate("/student");
    else if (data.role === "parent") navigate("/parent");
    else navigate("/login");

  } catch (err) {
    setError(err.message || "Invalid credentials");
  }
};

  // Show loading screen while fake loading
  if (loading) {
    return (
      <div className="login-loader">
        <i className="fas fa-chess-knight"></i>
        <h5>GAMBIT ACADEMY</h5>
      </div>
    );
  }

  // Main Login Form (shown after fake loading)
  return (
    <div className="login-wrapper">
      {/* Chess piece backgrounds (optional visuals) */}
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
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {error && <div className="error">{error}</div>}

        <button onClick={() => {
  console.log("Button WAS CLICKED!"); // ✅ Does this show?
  handleLogin();
}}>Enter Academy</button>

        <p className="note">
          Access restricted to students, coaches & staff
        </p>
      </div>
    </div>
  );
}