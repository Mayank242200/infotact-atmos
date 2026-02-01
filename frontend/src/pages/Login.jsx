import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../api/api";
import { socket } from "../socket";
import { toast } from "react-toastify";

export default function Login({ goToSignup }) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleLogin = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) return toast.error(emailError);
    if (passwordError) return toast.error(passwordError);

    try {
      const data = await apiFetch("/auth/login", "POST", {
        email,
        password,
      });

      if (data.token) {
        localStorage.setItem("token", data.token);

        const payload = JSON.parse(atob(data.token.split(".")[1]));

        localStorage.setItem("teamId", payload.teamId);

        socket.emit("join_company");
        socket.emit("join_team", payload.teamId);

        login(payload.role);

        toast.success("Login successful 🎉");
      } else {
        toast.error(data.msg || "Login failed");
      }
    } catch (err) {
      toast.error("Server not reachable");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => {
          const err = validateEmail(email);
          if (err) toast.error(err);
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => {
          const err = validatePassword(password);
          if (err) toast.error(err);
        }}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        New user?{" "}
        <button className="link-btn" onClick={goToSignup}>
          Signup
        </button>
      </p>
    </div>
  );
}
