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
import SvgIcon from "@/components/StyledElements/SvgIcon";

const StyledLink = styled(Link)`
  position: absolute;
  top: 5px;
  left: 3px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
`;

export default function DetailsPage({
  favoriteIDsLocal,
  favoriteIDsOwner,
  onToggleFavorite,
  onOpenModal,
  onOpenToast,
  onCloseModal,
}) {
  const router = useRouter();
  const { id } = router.query;
  const { mutate } = useSWR(`/api/plants`);
  const { data: session, status } = useSession();

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
    return <h2>Plant not found</h2>;
  }

  const isDataDefault = plant.owner === "default";

  const isFavorite = session
    ? favoriteIDsOwner.includes(id)
    : favoriteIDsLocal.includes(id);

  return (
    <>
      <StyledLink href="/">
        <SvgIcon variant="back" size="25"></SvgIcon>
      </StyledLink>

      <PlantDetails
        id={id}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        plant={plant}
        session={status === "authenticated"}
      />

      {session && !isDataDefault ? (
        <>
          <SvgLinkButton
            href={`/edit/${id}`}
            variant="pen"
            color="var(--secondary)"
            bottom="8rem"
          />
          <DeletePlantButton type="button" onClick={handleOpenModal} />
        </>
      ) : (
        <> </>
      )}
    </>
  );
}
