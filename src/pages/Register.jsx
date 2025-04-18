import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { validateEmail, validatePassword, validateDob } from '../utils/validation';
import bcrypt from 'bcryptjs';
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
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #4a90e2;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #357ab8; }
`;

const Register = () => {
  const { register, DEFAULT_AVATAR } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', username: '', avatar: '', dob: '', password: '', confirm: '' });
  const [msg, setMsg] = useState(null);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (!validateEmail(form.email)) { setMsg('Neteisingas el. paštas'); return; }
    if (users.some(u => u.email === form.email)) { setMsg('El. paštas užimtas'); return; }
    if (users.some(u => u.username === form.username)) { setMsg('Vartotojo vardas užimtas'); return; }
    if (!validatePassword(form.password)) { setMsg('Slaptažodis turi būti bent 8 simbolių, su raidėmis ir skaičiais'); return; }
    if (form.password !== form.confirm) { setMsg('Slaptažodžiai nesutampa'); return; }
    if (!validateDob(form.dob)) { setMsg('Turite būti bent 13 metų'); return; }

    const newUser = {
      id: Date.now(),
      email: form.email,
      username: form.username,
      avatar: form.avatar || DEFAULT_AVATAR,
      dob: form.dob,
      password: bcrypt.hashSync(form.password, 8),
    };
    register(newUser);
    navigate('/');
  };

  return (
    <>
      <h2>Register</h2>
      {msg && <p>{msg}</p>}
      <Form onSubmit={submit}>
        <Input name="email" placeholder="Email" value={form.email} onChange={handle} required />
        <Input name="username" placeholder="Username" value={form.username} onChange={handle} required />
        <Input name="avatar" placeholder="Avatar URL (optional)" value={form.avatar} onChange={handle} />
        <Input type="date" name="dob" value={form.dob} onChange={handle} required />
        <Input type="password" name="password" placeholder="Password" value={form.password} onChange={handle} required />
        <Input type="password" name="confirm" placeholder="Confirm Password" value={form.confirm} onChange={handle} required />
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default Register;