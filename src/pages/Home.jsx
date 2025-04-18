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
  background: #ff4d4d;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background: #d93636;
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
  const { posts, deletePost } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

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

              {user && user.id === p.userId && (
                <Button onClick={() => deletePost(p.id)}>🗑️ Ištrinti</Button>
              )}
            </Card>
          ))}
        </CardGrid>
      )}
    </>
  );
};

export default Home;
