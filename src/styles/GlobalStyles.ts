import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --panda-black: #333333;
    --panda-white: #f5f5f5;
    --panda-accent: #8bc34a;
    --panda-shadow: #224422;
    --font-primary: 'Comic Sans MS', 'Bubblegum Sans', cursive;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-primary);
    background: linear-gradient(135deg, var(--panda-white) 0%, #e0e0e0 100%);
    min-height: 100vh;
    overflow-x: hidden;
  }

  button {
    font-family: var(--font-primary);
    cursor: pointer;
    border: none;
    padding: 10px 20px;
    background-color: var(--panda-accent);
    color: white;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: bold;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
      background-color: var(--panda-shadow);
    }
  }

  h1, h2, h3 {
    color: var(--panda-black);
  }
`;

export default GlobalStyles;