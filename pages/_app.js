import GlobalStyle from "@/styles";
import useSWR, { SWRConfig } from "swr";
import Header from "@/components/Header.js";
import Footer from "@/components/Footer";
import useLocalStorageState from "use-local-storage-state";
import ToastMessage from "@/components/ModalAndToast/ToastMessage";
import { useState } from "react";
import Modal from "@/components/ModalAndToast/Modal";

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

  // Toast Message Feature
  const [toastSettings, setToastSettings] = useState({
    isOpen: false,
    duration: 3000,
    toastMessage: "",
  });

  // Modal Feature
  const [modalSettings, setModalSettings] = useState({
    isOpen: false,
    modalInfoText: "",
    confirmButtonLabel: "",
    toastMessageText: "",
    toastMessageRouter: "",
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

  function handleOpenToast(toastMessage) {
    setToastSettings({
      ...toastSettings,
      isOpen: true,
      toastMessage: toastMessage,
    });
  }

  function handleCloseToast() {
    setToastSettings({ isOpen: false });
  }

  function handleOpenModal(modalSettings) {
    setModalSettings({ ...modalSettings, isOpen: true });
  }

  function handleCloseModel() {
    setModalSettings({ isOpen: false });
  }

  return (
    <>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <GlobalStyle />
        <Header />
        <main>
          <Component
            {...pageProps}
            onToggleFavorite={handleToggleFavorite}
            favoriteIDs={favoriteIDs}
            plants={plants}
            onOpenToast={handleOpenToast}
            onOpenModal={handleOpenModal}
          />
          <Modal
            modalSettings={modalSettings}
            onOpenModal={handleOpenModal}
            onCloseModal={handleCloseModel}
            onOpenToast={handleOpenToast}
          />
          <ToastMessage
            toastSettings={toastSettings}
            onOpenToast={handleOpenToast}
            onCloseToast={handleCloseToast}
          />
        </main>
        <Footer />
      </SWRConfig>
    </>
  );
}
