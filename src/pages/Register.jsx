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

  const [form, setForm] = useState({
    email: '',
    username: '',
    avatar: '',
    dob: '',
    password: '',
    confirm: ''
  });

  const [msg, setMsg] = useState(null);

  const handle = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatar = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const submit = e => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (!validateEmail(form.email)) return setMsg('Neteisingas el. paštas');
    if (users.some(u => u.email === form.email)) return setMsg('El. paštas užimtas');
    if (users.some(u => u.username === form.username)) return setMsg('Vartotojo vardas užimtas');
    if (!validatePassword(form.password)) return setMsg('Silpnas slaptažodis');
    if (form.password !== form.confirm) return setMsg('Slaptažodžiai nesutampa');
    if (!validateDob(form.dob)) return setMsg('Turite būti bent 13 metų');

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
        <Input type="file" accept="image/*" onChange={handleAvatar} />
        <Input type="date" name="dob" value={form.dob} onChange={handle} required />
        <Input type="password" name="password" placeholder="Password" value={form.password} onChange={handle} required />
        <Input type="password" name="confirm" placeholder="Confirm Password" value={form.confirm} onChange={handle} required />
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default Register;
