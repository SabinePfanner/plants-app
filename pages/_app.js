import GlobalStyle from "@/styles";
import { SWRConfig } from "swr";
import Header from "@/components/Header.js";
import Footer from "@/components/Footer";
import useLocalStorageState from "use-local-storage-state";
import ToastMessage from "@/components/ModalAndToast/ToastMessage";
import { useState } from "react";
import Modal from "@/components/ModalAndToast/Modal";
import { SessionProvider } from "next-auth/react";
import useSWR from "swr";

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

  const {
    data: favoriteIDsOwner,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/users`, fetcher);

  console.log("favoriteIDsOwner", favoriteIDsOwner);
  if (error) {
    return <p>Could not fetch data!</p>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!favoriteIDsOwner) {
    return;
  }

  async function handleToggleFavorite(id, session) {
    if (session) {
      let updatedIDs;
      if (favoriteIDsOwner.includes(id)) {
        updatedIDs = favoriteIDsOwner.filter(
          (favoriteIDOwner) => favoriteIDOwner !== id
        );
        // remove from favorites
      } else {
        updatedIDs = [...favoriteIDsOwner, id]; // add to favorites
      }

      const response = await fetch(`/api/users/favorites`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedIDs),
      });
      console.log("UpdatedIDs", updatedIDs);

      if (!response.ok) {
        console.error(response.status);
      }
      mutate();
    } else {
      if (favoriteIDsLocal.includes(id)) {
        setFavoriteIDsLocal(
          favoriteIDsLocal.filter((favoriteIDLocal) => favoriteIDLocal !== id)
        ); // remove from favorites
      } else {
        setFavoriteIDsLocal([...favoriteIDsLocal, id]); // add to favorites
      }
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
