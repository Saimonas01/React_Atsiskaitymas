import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
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
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;
const Loading = styled.img`
  display: block;
  margin: 20px auto;
`;

export default function User() {
  const { user } = useContext(AuthContext);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const key = `${user.id}_saved`;
      setSaved(JSON.parse(localStorage.getItem(key) || '[]'));
      setLoading(false);
    }, 500);
  }, [user]);

  return (
    <>
      <Title>My Saved</Title>
      {loading && <Loading src="/loading.gif" alt="loading" />}
      {!loading && saved.length === 0 && <p>Nėra išsaugotų įrašų.</p>}
      {!loading && saved.length > 0 && (
        <CardGrid>
          {saved.map((p) => (
            <Card key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              {p.image && <img src={p.image} alt={p.title} />}
            </Card>
          ))}
        </CardGrid>
      )}
    </>
  );
}