import { useState } from "react";
import { apiFetch } from "../api/api";
import { toast } from "react-toastify";

export default function Signup({ goToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });

  const validateName = (value) => {
    if (!value) return "Name is required";
    if (value.length < 3) return "Name must be at least 3 characters";
    return "";
  };

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const nameError = validateName(form.name);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);

    if (nameError) return toast.error(nameError);
    if (emailError) return toast.error(emailError);
    if (passwordError) return toast.error(passwordError);

    try {
      const res = await apiFetch("/auth/signup", "POST", form);

      if (res.msg) {
        toast.success("Signup successful 🎉 Please login");
        goToLogin();
      } else {
        toast.error("Signup failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        onBlur={() => {
          const err = validateName(form.name);
          if (err) toast.error(err);
        }}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        onBlur={() => {
          const err = validateEmail(form.email);
          if (err) toast.error(err);
        }}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        onBlur={() => {
          const err = validatePassword(form.password);
          if (err) toast.error(err);
        }}
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
      >
        <option value="Employee">Employee</option>
        <option value="Manager">Manager</option>
      </select>

      <button onClick={handleSignup}>Signup</button>

      <p>
        Already have an account?{" "}
        <button className="link-btn" onClick={goToLogin}>
          Login
        </button>
      </p>
    </div>
  );
}
