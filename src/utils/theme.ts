// Theme file
import { createGlobalStyle } from 'styled-components';

export const colors = {
  red: '#F71735',
  blue: '#276FBF',
  yellow: '#FFB71B',
  black: '#333',
  green: '#00FF89',
  white: '#F5F5F5',
};

const REFERENCE_WIDTH = 1920;
const pxToVw = (pxVal: number) => (pxVal / REFERENCE_WIDTH) * 100;
export const getWidthAcrossColumns = (numColumns: number) => (numColumns * theme.grid.column) + ((numColumns-1) * theme.grid.gutter); // includes gutters

// Grid setup
const gridBaseUnit = 2; // vw
const numColumns = 12;
const gutterWidth = gridBaseUnit/2;
const margins = {
  top: gridBaseUnit * 2,
  bottom: gridBaseUnit * 2,
  left: gridBaseUnit * 2,
  right: gridBaseUnit * 2,
};

// all units in vw
const theme = {
  baseFontColor: colors.black,
  baseBackgroundColor: colors.white,
  baseHighlightColor: colors.green,
  grid: {
    gutter: gutterWidth,
    baseUnit: gridBaseUnit,
    margin: margins,
    column: (100 - (margins.left + margins.right) - (gutterWidth * (numColumns - 1))) / numColumns,
  },
  borders:{
    width: pxToVw(3),
  },
  colors,
};

export const GlobalStyle = createGlobalStyle`
  /*
  @font-face {
    font-family: SOME_FONT;
    src: url("/fonts/LOCATION_OF_FONT") format("opentype");
  }
  */

  body {
    font-family: monospace;

    font-size: 0.85vw;
    background-color: ${theme.baseBackgroundColor};
    color: ${theme.baseFontColor};
    letter-spacing: -0.05em;
    line-height: 1.5em;

    max-width: 100vw;
    overflow-x: hidden;
  }

  h1, h2 {
    font-family: sans-serif;
    font-size: 4em;
    margin: 0;
    line-height: 1em;

    text-transform: uppercase;
  }

  h2 {
    font-size: 2em;
  }

  div {
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    body {
      font-size: 2.5vw;
    }
  }
`;

export default theme;
