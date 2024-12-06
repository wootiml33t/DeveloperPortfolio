import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
  }

  body {
    font-family: 'Inter', sans-serif;
    color: ${({ theme }) => theme.colors.text};
    position: relative;
    overflow-x: hidden;
    
    background: 
      linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.background} 0%,
        ${({ theme }) => theme.colors.background} 49%,
        ${({ theme }) => `${theme.colors.secondary}11`} 49%,
        ${({ theme }) => `${theme.colors.secondary}11`} 51%,
        ${({ theme }) => theme.colors.background} 51%,
        ${({ theme }) => theme.colors.background} 100%
      );
    background-size: 75px 75px;
    background-attachment: fixed; 
  }

  #root {
    position: relative;
    z-index: 1;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
