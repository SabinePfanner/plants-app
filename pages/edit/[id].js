import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "@/components/Form";
import { InfoAccessDenied } from "@/components/StyledElements/InfoAccessDenied";
import { useSession } from "next-auth/react";

export default function EditPlant({ onOpenToast, onOpenModal, onCloseModal }) {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: plant, isLoading, error } = useSWR(`/api/plants/${id}`);
  const { status } = useSession();

  async function editPlant(editedData) {
    const response = await fetch(`/api/plants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    });

    if (response.ok) {
      router.push(`/${id}`);
      onOpenToast("Crop successfully edited!");
    } else {
      console.error(response.status);
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  function handleOpenModal() {
    onOpenModal({
      modalInfoText: "Do you really want to dismiss all edits?",
      confirmButtonLabel: "Dismiss",
      onClick: () => {
        onCloseModal();
        router.push("/");
        onOpenToast("All edits dismissed.");
      },
    });
  }
  if (status !== "authenticated") {
    return <InfoAccessDenied message="to edit your own crops" />;
  }
  return (
    <>
      <h1>Edit your crop</h1>
      <Form
        onSubmit={editPlant}
        onDismiss={handleOpenModal}
        data={plant}
        submitButtonText={"Edit plant"}
        isEditImage={false}
        onCreatePage={false}
      />
    </>
  );
}
