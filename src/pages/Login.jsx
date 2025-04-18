import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';

const Form = styled.form`
  display: flex; flex-direction: column; gap: 15px;
  background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;
const Input = styled.input`
  padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem;
`;
const Button = styled.button`
  padding: 10px 20px; border: none; border-radius: 4px; background: #4a90e2; color: #fff;
  font-size: 1rem; cursor: pointer; transition: background 0.2s;
  &:hover { background: #357ab8; }
`;

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState(null);

  const handle = e => setCreds({ ...creds, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    if (login(creds.email, creds.password)) {
      setMsg('Prisijungta');
      navigate('/');
    } else {
      setMsg('Blogi prisijungimo duomenys');
    }
  };

  return (
    <>
      <h2>Login</h2>
      {msg && <p>{msg}</p>}
      <Form onSubmit={submit}>
        <Input name="email" placeholder="Email" onChange={handle} required />
        <Input type="password" name="password" placeholder="Password" onChange={handle} required />
        <Button type="submit">Login</Button>
      </Form>
    </>
  );
}