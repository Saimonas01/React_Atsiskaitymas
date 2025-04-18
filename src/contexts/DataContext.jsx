import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    setPosts(JSON.parse(localStorage.getItem('posts') || '[]'));
    if (user) {
      const key = `${user.id}_saved`;
      setSaved(JSON.parse(localStorage.getItem(key) || '[]'));
    }
  }, [user]);

  const addPost = post => {
    const updated = [post, ...posts];
    setPosts(updated);
    localStorage.setItem('posts', JSON.stringify(updated));
  };

  const savePost = post => {
    if (!user) return;
    const key = `${user.id}_saved`;
    const userSaved = JSON.parse(localStorage.getItem(key) || '[]');
    const updated = [post, ...userSaved];
    localStorage.setItem(key, JSON.stringify(updated));
    setSaved(updated);
  };

  return (
    <DataContext.Provider value={{ posts, addPost, saved, savePost }}>
      {children}
    </DataContext.Provider>
  );
};