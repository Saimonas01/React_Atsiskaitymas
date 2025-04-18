import React from 'react';
import Menu from './Menu';
import Footer from './Footer';
import styled from 'styled-components';

const Main = styled.main`
  padding: 20px;
  min-height: 60vh;
`;

const Layout = ({ children }) => (
  <>
    <Menu />
    <Main>{children}</Main>
    <Footer />
  </>
);

export default Layout;
