import styled from 'styled-components';

interface IProps {
  initialized: boolean;
}

export default styled.div<IProps>`
  height: 100vh;
  width: 100vw;

  canvas {
    width: 100vw;
    height: 100vh;
  }
`;
