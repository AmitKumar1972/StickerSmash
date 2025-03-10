import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { router } from "expo-router";
import { authApi } from "../../utils/services/api";
import {
  User,
  saveAuthData,
  saveUser,
  getUser,
  getToken,
  clearAuthData,
} from "../../utils/services/auth";

// Define the shape of our context
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userType: "patient" | "doctor";
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    fullName: string,
    email: string,
    password: string,
    userType: "patient" | "doctor"
  ) => Promise<boolean>;
  fetchCurrentUser: () => Promise<boolean>;
  logout: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  userType: "patient",
  login: async () => false,
  signup: async () => false,
  fetchCurrentUser: async () => false,
  logout: async () => {},
});

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Computed properties
  const isAuthenticated = !!token;
  const userType = user?.userType || "patient";

  // Fetch current user profile
  const fetchCurrentUser = async (): Promise<boolean> => {
    try {
      if (!token) return false;

      const response = await authApi.getCurrentUser();

      if (response.success && response.data?.user) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        await saveUser(updatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return false;
    }
  };

  // Load user and token from storage on app start
  useEffect(() => {
    const loadUserAndToken = async () => {
      try {
        const storedToken = await getToken();
        const storedUser = await getUser();

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);

          // Optionally fetch the latest user data from the server
          if (storedToken) {
            try {
              const response = await authApi.getCurrentUser();
              if (response.success && response.data?.user) {
                const updatedUser = response.data.user;
                setUser(updatedUser);
                await saveUser(updatedUser);
              }
            } catch (err) {
              console.error("Error fetching current user on startup:", err);
            }
          }
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserAndToken();
  }, []);

  // Login with email and password
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.login(email, password);

      if (response.success && response.token && response.user) {
        // Save auth data
        await saveAuthData(response.token, response.user);

        // Update state
        setToken(response.token);
        setUser(response.user);

        console.log("Login successful, token saved:", response.token);
        return true;
      } else {
        console.error("Login failed:", response.message || "Unknown error");
        return false;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };

  // Signup with email and password
  const signup = async (
    fullName: string,
    email: string,
    password: string,
    userType: "patient" | "doctor"
  ): Promise<boolean> => {
    try {
      console.log("Signing up with:", { fullName, email, userType });

      const response = await authApi.signup(
        fullName,
        email,
        password,
        userType
      );

      if (response.success && response.token && response.user) {
        // Save auth data
        await saveAuthData(response.token, response.user);

        // Update state
        setToken(response.token);
        setUser(response.user);

        console.log("Signup successful, token saved:", response.token);
        return true;
      } else {
        console.error("Signup failed:", response.message || "Unknown error");
        return false;
      }
    } catch (error) {
      console.error("Error signing up:", error);
      return false;
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      await clearAuthData();
      setUser(null);
      setToken(null);
      // Redirect to login page after logout
      router.replace("/splash");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        userType,
        login,
        signup,
        fetchCurrentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
