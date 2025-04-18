import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';
import styled from 'styled-components';

const Title = styled.h2`
  margin-bottom: 20px;
`;
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;
const Card = styled.div`
  background: #fff; border-radius: 8px; padding: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

export default function Home() {
  const { posts } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setTimeout(() => setLoading(false), 500); }, []);

  return (
    <>
      <Title>Home</Title>
      {loading && <img src="/loading.gif" alt="loading" />}
      {!loading && posts.length === 0 && <p>Nėra įrašų.</p>}
      <CardGrid>
        {posts.map(p => (
          <Card key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            {p.image && <img src={p.image} alt={p.title} />}
          </Card>
        ))}
      </CardGrid>
    </>
  );
}