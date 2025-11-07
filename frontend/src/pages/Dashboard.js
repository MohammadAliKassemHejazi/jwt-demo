import { useEffect, useState } from "react";
import { getMe, logout } from "../auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cached = localStorage.getItem("name");
    if (cached) setName(cached);
    getMe()
      .then((me) => setName(me.name))
      .catch(() => {
        logout();
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div style={{ maxWidth: 600, margin: "80px auto", fontFamily: "sans-serif" }}>
      <h2>Hello {name || "..."} 👋</h2>
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        style={{ marginTop: 16, padding: "8px 12px" }}
      >
        Log out
      </button>
    </div>
  );
}
