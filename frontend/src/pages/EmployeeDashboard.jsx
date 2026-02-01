import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../api/api";
import KudosFeed from "../components/KudosFeed";
import QASection from "../components/QASection";

export default function EmployeeDashboard() {
  const { logout } = useContext(AuthContext);

const submitPulse = async (status) => {
  try {
    await apiFetch("/pulse/submit", "POST", { status });
    alert(`Pulse submitted: ${status}`);
  } catch (err) {
    alert("Failed to submit pulse");
  }
};


  return (
    <div className="dashboard">
      <h2>Employee Dashboard</h2>
      <p>Welcome Employee 👋</p>

      <div className="section pulse-buttons">
        <h3>How is your workload today?</h3>

        <button
          className="pulse-light"
          onClick={() => submitPulse("Light")}
        >
          Light
        </button>

        <button
          className="pulse-good"
          onClick={() => submitPulse("Good")}
        >
          Good
        </button>

        <button
          className="pulse-heavy"
          onClick={() => submitPulse("Heavy")}
        >
          Heavy
        </button>
      </div>

      <div className="section">
        <KudosFeed />
      </div>

      <div className="section">
        <QASection />
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
