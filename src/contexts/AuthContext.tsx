
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  phoneNumber: string;
  name: string;
  email?: string;
  emailVerified: boolean;
  address: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phoneNumber: string, otp: string, userData: Omit<User, 'id' | 'phoneNumber' | 'emailVerified'>) => Promise<boolean>;
  logout: () => void;
  sendOTP: (phoneNumber: string) => Promise<boolean>;
  verifyEmail: (email: string, otp: string) => Promise<boolean>;
  sendEmailOTP: (email: string) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('moments-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('moments-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('moments-user');
    }
  }, [user]);

  const sendOTP = async (phoneNumber: string): Promise<boolean> => {
    // Simulate OTP sending
    console.log(`Sending OTP to ${phoneNumber}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  };

  const login = async (phoneNumber: string, otp: string, userData: Omit<User, 'id' | 'phoneNumber' | 'emailVerified'>): Promise<boolean> => {
    // Simulate OTP verification
    if (otp === '123456') {
      const newUser: User = {
        id: `user_${Date.now()}`,
        phoneNumber,
        emailVerified: false,
        ...userData
      };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const sendEmailOTP = async (email: string): Promise<boolean> => {
    console.log(`Sending email OTP to ${email}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  };

  const verifyEmail = async (email: string, otp: string): Promise<boolean> => {
    if (otp === '123456' && user) {
      const updatedUser = { ...user, email, emailVerified: true };
      setUser(updatedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      sendOTP,
      verifyEmail,
      sendEmailOTP,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
