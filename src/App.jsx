import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Layout from './components/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Add from './pages/Add';
import User from './pages/User';
import PrivateRoute from './routes/PrivateRoute';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; background: #f5f5f5; color: #333; }
  a { text-decoration: none; color: inherit; }
`;

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const App = () => (
  <AuthProvider>
    <DataProvider>
      <GlobalStyle />
      <AppContainer>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<PrivateRoute><Add /></PrivateRoute>} />
            <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>} />
          </Routes>
        </Router>
      </AppContainer>
    </DataProvider>
  </AuthProvider>
);

export default App;