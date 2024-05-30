import styled from "styled-components";
import PlantDetails from "@/components/PlantDetails.js";
import Link from "next/link";

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: black;
`;

export default function DetailsPage({ favoriteIDs, onToggleFavorite }) {
  return (
    <>
      <StyledLink href="/">←</StyledLink>
      <PlantDetails favoriteIDs={favoriteIDs} onToggleFavorite={onToggleFavorite}/>
    </>
  );
}
