import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("ssc_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login - check localStorage for registered users
    const users = JSON.parse(localStorage.getItem("ssc_users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userToStore = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        isAdmin: foundUser.email === "admin@ssc.com"
      };
      setUser(userToStore);
      localStorage.setItem("ssc_user", JSON.stringify(userToStore));
      return true;
    }
    
    // Admin backdoor
    if (email === "admin@ssc.com" && password === "admin123") {
      const adminUser = {
        id: "admin-1",
        name: "Admin",
        email: "admin@ssc.com",
        isAdmin: true
      };
      setUser(adminUser);
      localStorage.setItem("ssc_user", JSON.stringify(adminUser));
      return true;
    }
    
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("ssc_users") || "[]");
    
    // Check if email already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }
    
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      isAdmin: false
    };
    
    users.push(newUser);
    localStorage.setItem("ssc_users", JSON.stringify(users));
    
    const userToStore = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: false
    };
    setUser(userToStore);
    localStorage.setItem("ssc_user", JSON.stringify(userToStore));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ssc_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
