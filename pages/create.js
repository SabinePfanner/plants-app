import { useRouter } from "next/router";
import Form from "@/components/Form";

export default function CreatePlant({
  onOpenToast,
  onOpenModal,
  onCloseModal,
}) {
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
      router.push(`/${responseObject.id}`);
      onOpenToast("New crop successfully created!");
    }
  }

  function handleOpenModal() {
    onOpenModal({
      modalInfoText: "Do you really want to dismiss all changes?",
      confirmButtonLabel: "Dismiss",
      onClick: () => {
        onCloseModal();
        router.push("/");
        onOpenToast("All changes dismissed.");
      },
    });
  }

  return (
    <>
      <h1>Create a new hot crop!</h1>
      <Form onSubmit={addPlant} onDismiss={handleOpenModal} />
    </>
  );
}
