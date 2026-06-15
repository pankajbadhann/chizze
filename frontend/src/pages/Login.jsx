import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import ROUTES from "../config/routes";

/**
 * --------------------------------------------------
 * LOGIN PAGE (PRODUCTION READY)
 * --------------------------------------------------
 */

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  /**
   * --------------------------------------------------
   * HANDLE INPUT
   * --------------------------------------------------
   */

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * --------------------------------------------------
   * SUBMIT LOGIN
   * --------------------------------------------------
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await api.post(
        "/auth/login",
        form,
      );

      const { user, token } =
        res.data.data;

      login({ user, token });

      navigate(ROUTES.CHATS);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * --------------------------------------------------
   * UI
   * --------------------------------------------------
   */

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
      }}
    >
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <p
        onClick={() =>
          navigate(ROUTES.REGISTER)
        }
        style={{ cursor: "pointer" }}
      >
        Create new account
      </p>
    </div>
  );
}