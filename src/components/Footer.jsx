import React from 'react';
import styled from 'styled-components';

const FooterBar = styled.footer`
  text-align: center;
  margin-top: 40px;
  padding: 10px;
  font-size: 0.9rem;
  color: #777;
`;

const Footer = () => <FooterBar>© 2025 My App</FooterBar>;

export default Footer;