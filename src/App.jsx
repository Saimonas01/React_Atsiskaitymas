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

// Globaliniai stiliai – taikomi visam projektui
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: Arial, sans-serif;
    background: #f5f5f5;
    color: #333;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

// Centrinis konteineris visam turiniui
const AppContainer = styled.div`
  max-width: 800px;
  margin: 60px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
`;

const App = () => (
  <AuthProvider>
    <DataProvider>
      <GlobalStyle />
      <AppContainer>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/add" element={
              <PrivateRoute>
                <Layout><Add /></Layout>
              </PrivateRoute>
            } />
            <Route path="/user" element={
              <PrivateRoute>
                <Layout><User /></Layout>
              </PrivateRoute>
            } />
          </Routes>
        </Router>
      </AppContainer>
    </DataProvider>
  </AuthProvider>
);

export default App;
