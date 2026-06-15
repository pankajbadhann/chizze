import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

/**
 * --------------------------------------------------
 * AUTH PROVIDER
 * --------------------------------------------------
 */

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  /**
   * --------------------------------------------------
   * BOOTSTRAP AUTH STATE
   * --------------------------------------------------
   */

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(
          JSON.parse(storedUser),
        );
      } catch {
        localStorage.removeItem(
          "user",
        );
      }
    }

    setLoading(false);
  }, []);

  /**
   * --------------------------------------------------
   * LOGIN
   * --------------------------------------------------
   */

  const login = ({
    user,
    token,
  }) => {
    localStorage.setItem(
      "accessToken",
      token,
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user),
    );

    setUser(user);
  };

  /**
   * --------------------------------------------------
   * LOGOUT
   * --------------------------------------------------
   */

  const logout = () => {
    localStorage.removeItem(
      "accessToken",
    );

    localStorage.removeItem(
      "user",
    );

    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      isAuthenticated:
        !!user,
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * --------------------------------------------------
 * CUSTOM HOOK
 * --------------------------------------------------
 */

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
};