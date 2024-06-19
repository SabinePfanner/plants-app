import GlobalStyle from "@/styles";
import { SWRConfig } from "swr";
import Header from "@/components/Header.js";
import Footer from "@/components/Footer";
import useLocalStorageState from "use-local-storage-state";
import ToastMessage from "@/components/ModalAndToast/ToastMessage";
import { useState } from "react";
import Modal from "@/components/ModalAndToast/Modal";
import { SessionProvider } from "next-auth/react";

export async function fetcher(...args) {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }

  return await response.json();
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
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

  const [favoriteIDsLocal, setFavoriteIDsLocal] = useLocalStorageState(
    "favorites",
    {
      defaultValue: [],
    }
  );

  const [favoriteIDsOwner, setFavoriteIDsOwner] = useState([]);

  async function handleToggleFavorite(id, session) {
    console.log("App", session);
    if (session) {
      console.log("App2", session);
      if (favoriteIDsOwner.includes(id)) {
        setFavoriteIDsOwner(
          favoriteIDsOwner.filter((favoriteIDOwner) => favoriteIDOwner !== id)
        ); // remove from favorites
      } else {
        setFavoriteIDsOwner([...favoriteIDsOwner, id]); // add to favorites
      }

      const response = await fetch("/api/plants/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoriteIDsOwner),
      });
      if (!response.ok) {
        console.error(response.status);
      }
    } else {
      if (favoriteIDsLocal.includes(id)) {
        setFavoriteIDsLocal(
          favoriteIDsLocal.filter((favoriteIDLocal) => favoriteIDLocal !== id)
        ); // remove from favorites
      } else {
        setFavoriteIDsLocal([...favoriteIDsLocal, id]); // add to favorites
      }
    }
    console.log(
      "Session",
      session,
      "FavoriteIDsOwner",
      favoriteIDsOwner,
      "FavoriteIDsLocal",
      favoriteIDsLocal
    );
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
      <SessionProvider session={session}>
        <SWRConfig
          value={{
            fetcher,
          }}
        >
          <GlobalStyle />

          <Header
            modalSettings={modalSettings}
            onOpenModal={handleOpenModal}
            onCloseModal={handleCloseModal}
            toastSettings={toastSettings}
            onOpenToast={handleOpenToast}
            onCloseToast={handleCloseToast}
          />
          <main>
            <Component
              {...pageProps}
              onToggleFavorite={handleToggleFavorite}
              favoriteIDsLocal={favoriteIDsLocal}
              favoriteIDsOwner={favoriteIDsOwner}
              toastSettings={toastSettings}
              onOpenToast={handleOpenToast}
              onCloseTast={handleCloseToast}
              modalSettings={modalSettings}
              onOpenModal={handleOpenModal}
              onCloseModal={handleCloseModal}
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
      </SessionProvider>
    </>
  );
}
