import styled from "styled-components";
import PlantDetails from "@/components/PlantDetails.js";
import Link from "next/link";
import { DeletePlantButton } from "@/components/StyledElements/CreateEditDelete";

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
}) {
  function handleOpenModal() {
    onOpenModal({
      modalInfoText: "Do you really want to delete this crop?",
      confirmButtonLabel: "Delete",
      toastMessageText: "Crop successfully deleted.",
      toastMessageRouter: "/",
    });
  }

  return (
    <>
      <StyledLink href="/">←</StyledLink>
      <PlantDetails
        favoriteIDs={favoriteIDs}
        onToggleFavorite={onToggleFavorite}
      />
      <DeletePlantButton type="button" onClick={handleOpenModal} />
    </>
  );
}
