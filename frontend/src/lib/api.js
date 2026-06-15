import axios from "axios";

/**
 * --------------------------------------------------
 * API CONFIG
 * --------------------------------------------------
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

/**
 * --------------------------------------------------
 * AXIOS INSTANCE
 * --------------------------------------------------
 */

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * --------------------------------------------------
 * REQUEST INTERCEPTOR
 * --------------------------------------------------
 * Automatically attaches JWT token.
 */

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * --------------------------------------------------
 * RESPONSE INTERCEPTOR
 * --------------------------------------------------
 * Centralized API error handling.
 */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401
    ) {
      localStorage.removeItem(
        "accessToken",
      );

      if (
        window.location.pathname !==
        "/login"
      ) {
        window.location.href =
          "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;