import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [displayName, setN] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      await axios.post("/api/auth/register", { username, password, displayName });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      if (err.response && err.response.status === 409)
        setError("Username already exists");
      else setError("Registration failed. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "80px auto", fontFamily: "sans-serif" }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: 12 }}>
          <label>Display Name</label>
          <input
            value={displayName}
            onChange={(e) => setN(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setU(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setP(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}
        {success && (
          <div style={{ color: "green", marginTop: 8 }}>
            ✅ Account created! Redirecting…
          </div>
        )}
        <button type="submit" style={{ marginTop: 16, padding: "8px 12px" }}>
          Register
        </button>
        <div style={{ marginTop: 12 }}>
          <a href="/login">Already have an account? Login</a>
        </div>
      </form>
    </div>
  );
}
