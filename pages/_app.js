import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Header from "@/Components/Header";

export async function fetcher(...args) {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  return await response.json();
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
