import React, { createContext, useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const DEFAULT_AVATAR = 'https://via.placeholder.com/150';

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('authUser'));
    if (stored) setUser(stored);
  }, []);

  const register = (newUser) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('authUser', JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.email === email);
    if (found && bcrypt.compareSync(password, found.password)) {
      localStorage.setItem('authUser', JSON.stringify(found));
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, DEFAULT_AVATAR }}>
      {children}
    </AuthContext.Provider>
  );
};