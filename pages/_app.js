import GlobalStyle from "@/styles";
import useSWR, { SWRConfig } from "swr";
import Header from "@/components/Header.js";
import Footer from "@/components/Footer";
import useLocalStorageState from "use-local-storage-state";

export async function fetcher(...args) {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  return await response.json();
}

export default function App({ Component, pageProps }) {
  const [favoriteIDs, setFavoriteIDs] = useLocalStorageState("favorites", {
    defaultValue: [],
  });

  // Fetch plants from mongoDB
  const { data: plants, error, isLoading } = useSWR("/api/plants", fetcher);

  if (error) {
    return <p>Could not fetch data!</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!plants) {
    return;
  }

  function handleToggleFavorite(id) {
    if (favoriteIDs.includes(id)) {
      setFavoriteIDs(favoriteIDs.filter((favoriteID) => favoriteID !== id)); // remove from favorites
    } else {
      setFavoriteIDs([...favoriteIDs, id]); // add to favorites
    }
  }

  return (
    <>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <GlobalStyle />
        <Header/>
        <Component
          {...pageProps}
          onToggleFavorite={handleToggleFavorite}
          favoriteIDs={favoriteIDs}
          plants={plants}
        />
        <Footer />
      </SWRConfig>
    </>
  );
}
