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

  @media (max-width: 700px) {
    html {
      font-size: 10px;
    }
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.5rem;
    }
    h3 {
      font-size: 1.2rem;
    }
    * {
      font-size: 1.5rem;
    }
  }
`;

export default GlobalStyle;
