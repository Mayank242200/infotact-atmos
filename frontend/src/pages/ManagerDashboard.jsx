import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../api/api";
import { socket } from "../socket";
import ManagerKudosFeed from "../components/ManagerKudosFeed";
import ManagerQASection from "../components/ManagerQASection";

export default function ManagerDashboard() {
  const { logout } = useContext(AuthContext);
  const [summary, setSummary] = useState({
    Light: 0,
    Good: 0,
    Heavy: 0,
  });

  useEffect(() => {
    apiFetch("/pulse/summary").then(setSummary);

    socket.on("pulse_update", (data) => {
      setSummary(data);
    });

    return () => socket.off("pulse_update");
  }, []);

  return (
    <div className="dashboard">
      <h2>Manager Dashboard</h2>
      <p>Team Pulse & Live Engagement 📊</p>

      {/* Pulse Summary */}
      <div className="section">
        <h3>Team Pulse Summary</h3>
        <div className="pulse-summary">
          <div className="pulse-card light">
            <span>Light</span>
            <strong>{summary.Light}</strong>
          </div>
          <div className="pulse-card good">
            <span>Good</span>
            <strong>{summary.Good}</strong>
          </div>
          <div className="pulse-card heavy">
            <span>Heavy</span>
            <strong>{summary.Heavy}</strong>
          </div>
        </div>
      </div>

      {/* Team Kudos (READ ONLY) */}
      <div className="section">
        <h3>Team Kudos</h3>
        <ManagerKudosFeed />
      </div>

      {/* Live Q&A (READ ONLY) */}
      <div className="section">
        <h3>Live Q&A</h3>
        <ManagerQASection />
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
