import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
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

const Button = styled.button`
  margin-top: 10px;
  background: #bbb;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    background: #999;
  }
`;

const Loading = styled.img`
  display: block;
  margin: 20px auto;
`;

const User = () => {
  const { user } = useContext(AuthContext);
  const { saved, unsavePost } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (!user) {
    return (
      <p style={{ textAlign: 'center', marginTop: '40px' }}>
        Prisijunkite, kad matytumėte išsaugotus įrašus.
      </p>
    );
  }

  return (
    <>
      <Title>My Saved</Title>
      {loading && <Loading src="/loading.gif" alt="Kraunama..." />}
      {!loading && saved.length === 0 && (
        <p style={{ textAlign: 'center' }}>Nėra išsaugotų įrašų.</p>
      )}
      {!loading && saved.length > 0 && (
        <CardGrid>
          {saved.map((p) => (
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
              <Button onClick={() => unsavePost(p.id)}>
                ❌ Pašalinti iš išsaugotų
              </Button>
            </Card>
          ))}
        </CardGrid>
      )}
    </>
  );
};

export default User;
