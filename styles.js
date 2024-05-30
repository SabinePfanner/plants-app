import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --color-green: #79af6e;
  }

  body {
    margin: 0;
    font-family: system-ui;
  }
  h1 {
    text-align: center;
    font-size: 1.5rem;
  };
`;
