import React, { createContext, useState, useContext, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('bookingAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function for demo purposes
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo users
      if (email === 'admin@example.com' && password === 'password') {
        const adminUser = { id: '1', name: 'Admin User', email, isAdmin: true };
        setUser(adminUser);
        localStorage.setItem('bookingAppUser', JSON.stringify(adminUser));
      } else if (email === 'user@example.com' && password === 'password') {
        const regularUser = { id: '2', name: 'Regular User', email, isAdmin: false };
        setUser(regularUser);
        localStorage.setItem('bookingAppUser', JSON.stringify(regularUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send data to your backend
      const newUser = { id: Date.now().toString(), name, email, isAdmin: false };
      setUser(newUser);
      localStorage.setItem('bookingAppUser', JSON.stringify(newUser));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bookingAppUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};