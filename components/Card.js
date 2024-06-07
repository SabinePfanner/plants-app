import PlantImage from "@/components/PlantImage";
import styled from "styled-components";
import SvgIcon from "@/components/StyledElements/SvgIcon";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 2rem 1rem 1rem 1rem;
  border: transparent;
  border-radius: 0.5rem;
  max-width: 300px;
`;

const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledFavoriteButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  align-self: flex-end;
  width: 2.5rem;
  height: 2.5rem;
  top: -11.7rem;
  background: transparent;
  border: none;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default function Card({
  image,
  name,
  cropType,
  id,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <CardContainer>
      <PlantImage
        image={image}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        id={id}
      />
      <CardInfoContainer>
        <div>{name}</div> <div>{cropType}</div>
      </CardInfoContainer>
      <StyledFavoriteButton onClick={() => onToggleFavorite(id)}>
        <SvgIcon variant="chili" color={isFavorite ? "#E23D28" : "#79af6e"} />
      </StyledFavoriteButton>
    </CardContainer>
  );
}
