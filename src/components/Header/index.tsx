import React from 'react';
import StyledHeader from './style';
import { useState as useAppState } from 'stores/App';

const Header: React.FC = () => {
  const appState = useAppState();

  return (
    <StyledHeader
      className="header"
    >
      <h1 className="title">hello</h1>
    </StyledHeader>
  );
};

export default Header;
