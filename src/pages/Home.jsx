import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const Button = styled.button`
  margin-top: 10px;
  background: #4a90e2;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background: #357ab8;
  }

  &.delete {
    background: #ff4d4d;

    &:hover {
      background: #d93636;
    }
  }

  & + & {
    margin-left: 10px;
  }
`;

const Loading = styled.img`
  display: block;
  margin: 30px auto;
  width: 48px;
`;

const Message = styled.p`
  text-align: center;
  color: #555;
  font-size: 1.1rem;
  margin-top: 40px;
`;

const Home = () => {
  const { posts, deletePost, savePost, unsavePost } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (user) {
      const key = `${user.id}_saved`;
      const savedPosts = JSON.parse(localStorage.getItem(key) || '[]');
      const ids = savedPosts.map(p => p.id);
      setSavedIds(ids);
    }
  }, [user]);

  const toggleSave = (post) => {
    if (!user) return;
    if (savedIds.includes(post.id)) {
      unsavePost(post.id);
      setSavedIds(prev => prev.filter(id => id !== post.id));
    } else {
      savePost(post);
      setSavedIds(prev => [...prev, post.id]);
    }
  };

  return (
    <>
      <Title>Home</Title>

      {loading && <Loading src="/loading.gif" alt="Kraunama..." />}

      {!loading && posts.length === 0 && (
        <Message>Nėra įrašų.</Message>
      )}

      {!loading && posts.length > 0 && (
        <CardGrid>
          {posts.map((p) => (
            <Card key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>

              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: '100%',
                    marginTop: '10px',
                    borderRadius: '6px',
                    objectFit: 'cover',
                    maxHeight: '200px'
                  }}
                />
              )}

              {user && (
                <div style={{ marginTop: '10px', display: 'flex' }}>
                  {user.id === p.userId && (
                    <Button className="delete" onClick={() => deletePost(p.id)}>🗑️ Ištrinti</Button>
                  )}
                  <Button onClick={() => toggleSave(p)}>
                    {savedIds.includes(p.id) ? '❌ Atšaukti' : '💾 Išsaugoti'}
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </CardGrid>
      )}
    </>
  );
};

export default Home;
