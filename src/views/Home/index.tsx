import React from 'react';
import StyledHome from './style';

import Header from 'components/Header';
import ThreeComponent from 'components/ThreeComponent';

const Home: React.FC = () => {
  return (
    <StyledHome className="app">
      <Header />
      <ThreeComponent />
    </StyledHome>
  );
}

export default Home;
