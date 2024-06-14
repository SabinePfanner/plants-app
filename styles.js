import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: darkgrey lightgrey;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 1rem;
}

*::-webkit-scrollbar-track {
  /* background: orange; */
}

*::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 20px;
  border: 3px solid darkgrey;
}

::-webkit-scrollbar-button {
  display: none;
}

  
  :root {
    --color-green: #79af6e;
    --color-green-300: #add0a5;
  }

  main {
    margin-bottom: 15vh;
  }

  body {
    margin: 0;
    font-family: system-ui;
  }

  h1 {
    text-align: center;
    font-size: 1.5rem;
  }

  h2 {
    text-align: center;
    font-size: 1rem;
  };
`;
