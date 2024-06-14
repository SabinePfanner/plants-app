import { createGlobalStyle } from "styled-components";
import { Lato } from "next/font/google";

const lato = Lato({ weight: "400", subsets: ["latin"] });

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  
  :root {
--primary-light: #add0a5;
--primary-light-contrast: #423e3e;
--primary: #79af6e;
--primary-contrast: #1D0B07;
--primary-dark: #5c9651;
--primary-dark-contrast: #1D0B07;

--secondary: #e62600;
--secondary-contrast: #1D0B07;
--secondary-light-300: #ffa795;
--secondary-light-contrast: #1D0B07;
--secondary-light-200: #ffcbc1;

--accent: #f67b00;
--accent-contrast: #1D0B07;

--success-border: #5c9651;
--success-background: #add0a5;
--success-contrast: #1D0B07;
  }


  body {
    margin: 0;
    font-family: ${lato.style.fontFamily};
  }

  main {
    margin-bottom: 15vh;
  }

  h1 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--primary-contrast: #1D0B07);

  }

  h2 {
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    color: var(--primary-contrast: #1D0B07);
  };
`;
