import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';

const NavBar = styled.nav`
  display: flex;
  gap: 10px;
  background: #4a90e2;
  padding: 10px;
  border-radius: 8px;
  a, button {
    color: #fff;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const Menu = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <NavBar>
      <Link to="/">Home</Link>
      {!user && <Link to="/register">Register</Link>}
      {!user && <Link to="/login">Login</Link>}
      {user && <Link to="/add">Add</Link>}
      {user && <Link to="/user">My Saved</Link>}
      {user && <button onClick={logout}>Logout</button>}
    </NavBar>
  );
};

export default Menu;