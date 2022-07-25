import React from 'react';
import StyledHeader from './style';
import { useState as useAppState } from 'stores/App';

const Header: React.FC = () => {
  const appState = useAppState();

  const startSynth = () => {
    appState.getAudioContext();
  }

  return (
    <StyledHeader
      className="header"
    >
      <button onClick={startSynth}>start</button>
    </StyledHeader>
  );
};

export default Header;
