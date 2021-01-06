import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'BMDOHYEON';
    box-sizing: border-box;
  }

  body {
    color: ${(props) => props.theme.highlightColor};
    background-color: ${(props) => props.theme.mainColor};
  }
`;

export default GlobalStyle;
