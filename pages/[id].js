import styled from "styled-components";
import PlantDetails from "@/components/PlantDetails.js";
import Link from "next/link";
import {
  DeletePlantButton,
  SvgLinkButton,
} from "@/components/StyledElements/CreateEditDelete";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: black;
`;

export default function DetailsPage({
  favoriteIDs,
  onToggleFavorite,
  onOpenModal,
  onOpenToast,
  onCloseModal,
}) {
  const router = useRouter();
  const { id } = router.query;
  const { mutate } = useSWR(`/api/plants`);
  const { data: session } = useSession();

  function handleOpenModal() {
    onOpenModal({
      modalInfoText: "Do you really want to delete this crop?",
      confirmButtonLabel: "Delete",
      onClick: handleDelete,
    });
  }

  async function handleDelete() {
    const response = await fetch(`/api/plants/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      onCloseModal();
      onOpenToast("Crop successfully deleted!");
      mutate();
      router.push(`/`);
    }
  }
  const { data: plant, error, isLoading } = useSWR(`/api/plants/${id}`);

  if (error) {
    return <p>Could not fetch data!</p>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!plant) {
    return;
  }

  const isDataDefault = plant.owner === "default";

  return (
    <>
      <StyledLink href="/">←</StyledLink>
      <PlantDetails
        id={id}
        favoriteIDs={favoriteIDs}
        onToggleFavorite={onToggleFavorite}
        plant={plant}
      />

      {session && !isDataDefault ? (
        <>
          <SvgLinkButton
            href={`/edit/${id}`}
            variant="pen"
            color="var(--secondary)"
            bottom="10rem"
          />
          <DeletePlantButton type="button" onClick={handleOpenModal} />
        </>
      ) : (
        <> </>
      )}
    </>
  );
}
