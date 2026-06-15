import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import ROUTES from "./config/routes";

/**
 * PAGES
 */
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatRoom from "./pages/ChatRoom";
import ChatLayout from "./layouts/ChatLayout";

/**
 * --------------------------------------------------
 * PROTECTED ROUTE
 * --------------------------------------------------
 */

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

/**
 * --------------------------------------------------
 * APP
 * --------------------------------------------------
 */

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* AUTH */}
      <Route
        path={ROUTES.LOGIN}
        element={
          isAuthenticated ? (
            <Navigate to={ROUTES.CHATS} />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path={ROUTES.REGISTER}
        element={
          isAuthenticated ? (
            <Navigate to={ROUTES.CHATS} />
          ) : (
            <Register />
          )
        }
      />

      {/* CHAT APP LAYOUT */}
      <Route
        path={ROUTES.CHATS}
        element={
          <ProtectedRoute>
            <ChatLayout>
              <div>Select a chat</div>
            </ChatLayout>
          </ProtectedRoute>
        }
      />

      {/* SINGLE CHAT VIEW INSIDE LAYOUT */}
      <Route
        path={ROUTES.CHAT()}
        element={
          <ProtectedRoute>
            <ChatLayout>
              <ChatRoom />
            </ChatLayout>
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route
        path="*"
        element={
          <Navigate
            to={
              isAuthenticated
                ? ROUTES.CHATS
                : ROUTES.LOGIN
            }
          />
        }
      />
    </Routes>
  );
}