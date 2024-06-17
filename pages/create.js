import { useRouter } from "next/router";
import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { InfoAccessDenied } from "@/components/StyledElements/InfoAccessDenied";

export default function CreatePlant({
  onOpenToast,
  onOpenModal,
  onCloseModal,
}) {
  const router = useRouter();
  const { status } = useSession();

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
  if (status !== "authenticated") {
    return <InfoAccessDenied message="to create your own crops" />;
  }
  return (
    <>
      <h1>Create a new hot crop!</h1>
      <Form
        onSubmit={addPlant}
        onDismiss={handleOpenModal}
        onCreatePage={true}
      />
    </>
  );
}
