import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';
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
  const { posts } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Title>Home</Title>
      {loading && <Loading src="/loading.gif" alt="Kraunama..." />}
      {!loading && posts.length === 0 && <Message>Nėra įrašų.</Message>}
      {!loading && posts.length > 0 && (
        <CardGrid>
          {posts.map(p => (
            <Card key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              {p.image && <img src={p.image} alt={p.title} style={{ width: '100%', marginTop: '10px' }} />}
            </Card>
          ))}
        </CardGrid>
      )}
    </>
  );
};

export default Home;