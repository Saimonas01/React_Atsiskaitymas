import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #4a90e2;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #357ab8;
  }
`;

const Add = () => {
  const { user } = useContext(AuthContext);
  const { addPost } = useContext(DataContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: '',
    desc: '',
    image: ''
  });

  const handle = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const submit = e => {
    e.preventDefault();
    const post = {
      ...data,
      id: Date.now(),
      userId: user.id,
      created: new Date().toISOString()
    };
    addPost(post);
    navigate('/');
  };

  return (
    <>
      <h2>Add</h2>
      <Form onSubmit={submit}>
        <Input name="title" placeholder="Title" onChange={handle} required />
        <TextArea name="desc" placeholder="Description" onChange={handle} required />
        <Input type="file" accept="image/*" onChange={handleFile} />
        {data.image && (
          <img
            src={data.image}
            alt="preview"
            style={{
              width: '100%',
              maxHeight: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginTop: '10px'
            }}
          />
        )}
        <Button type="submit">Add</Button>
      </Form>
    </>
  );
};

export default Add;
