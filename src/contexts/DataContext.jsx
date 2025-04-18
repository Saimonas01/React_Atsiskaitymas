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

  const addPost = (post) => {
    const updated = [post, ...posts];
    setPosts(updated);
    localStorage.setItem('posts', JSON.stringify(updated));
  };

  const deletePost = (id) => {
    if (!user) return;
    const allPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const target = allPosts.find(p => p.id === id);
    if (!target || target.userId !== user.id) return;

    const updated = allPosts.filter(post => post.id !== id);
    setPosts(updated);
    localStorage.setItem('posts', JSON.stringify(updated));
  };

  const savePost = (post) => {
    if (!user) return;
    const key = `${user.id}_saved`;
    const userSaved = JSON.parse(localStorage.getItem(key) || '[]');
    const updated = [post, ...userSaved];
    localStorage.setItem(key, JSON.stringify(updated));
    setSaved(updated);
  };

  const unsavePost = (id) => {
    if (!user) return;
    const key = `${user.id}_saved`;
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    const updated = current.filter(post => post.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));
    setSaved(updated);
  };

  return (
    <DataContext.Provider value={{
      posts, addPost, deletePost,
      saved, savePost, unsavePost
    }}>
      {children}
    </DataContext.Provider>
  );
};
