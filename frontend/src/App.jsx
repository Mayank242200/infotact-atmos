import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";

export default function App() {
  const { user } = useContext(AuthContext);
  const [showSignup, setShowSignup] = useState(false);

  if (!user) {
    return showSignup ? (
      <Signup goToLogin={() => setShowSignup(false)} />
    ) : (
      <Login goToSignup={() => setShowSignup(true)} />
    );
  }

  // ✅ ROLE CHECK (CASE-SENSITIVE)
  if (user.role === "Manager") {
    return <ManagerDashboard />;
  }

  return <EmployeeDashboard />;
}
