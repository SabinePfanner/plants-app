import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "@/components/Form";
import Modal from "@/components/ModalAndToast/Modal";
import { useState } from "react";

export default function CreatePlant() {
  const { mutate } = useSWR("/api/plants/");
  const router = useRouter();

  async function addPlant(plant) {
    const response = await fetch(`/api/plants/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plant),
    });
    if (!response.ok) {
      console.error(response.status);
    } else {
      const responseObject = await response.json();
      router.push(`/${responseObject.id}?isnew=true`);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal(isVisible) {
    setIsModalOpen(isVisible);
  }

  return (
    <>
      <h1>Create a new hot crop!</h1>
      <Form onSubmit={addPlant} onDismiss={handleOpenModal} />
      {isModalOpen && (
        <Modal
          confirmButtonLabel="Dismiss"
          modalInfoText="Do you really want to dismiss all changes?"
          toastMessageText="All changes dismissed"
          onModalOpen={handleOpenModal}
        />
      )}
    </>
  );
}
