import GlobalStyle from "@/styles";
import { SWRConfig } from "swr";
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

  // Toast Feature
  const [toastSettings, setToastSettings] = useState({
    isOpen: false,
    duration: 0,
    toastMessage: "",
  });

  // Modal Feature
  const [modalSettings, setModalSettings] = useState({
    isOpen: false,
    modalInfoText: "",
    confirmButtonLabel: "",
    onClick: null,
  });

  function handleToggleFavorite(id) {
    if (favoriteIDs.includes(id)) {
      setFavoriteIDs(favoriteIDs.filter((favoriteID) => favoriteID !== id)); // remove from favorites
    } else {
      setFavoriteIDs([...favoriteIDs, id]); // add to favorites
    }
  }

  // Toast Feature functionality
  function handleOpenToast(toastMessage) {
    setToastSettings({
      isOpen: true,
      toastMessage: toastMessage,
      duration: 3000,
    });
  }

  function handleCloseToast() {
    setToastSettings({ isOpen: false });
  }

  // Modal Feature functionality
  function handleOpenModal(modalSettings) {
    setModalSettings({ ...modalSettings, isOpen: true });
  }

  function handleCloseModal() {
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
            toastSettings={toastSettings}
            onOpenToast={handleOpenToast}
            onCloseTast={handleCloseToast}
            modalSettings={modalSettings}
            onOpenModal={handleOpenModal}
          />
          <Modal
            modalSettings={modalSettings}
            onOpenModal={handleOpenModal}
            onCloseModal={handleCloseModal}
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
