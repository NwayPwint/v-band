import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../services/api";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await adminApi.login(password);
      if (res.data.success) {
        localStorage.setItem("admin_auth", "true");
        navigate("/admin");
      }
    } catch {
      setError("Invalid password");
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h1>VELOCITY</h1>
        <p>Admin Login</p>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        {error && <span className="admin-login-error">{error}</span>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
