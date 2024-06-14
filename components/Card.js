import styled from "styled-components";
import SvgIcon from "@/components/StyledElements/SvgIcon";
import PlantImageCard from "./StyledElements/PlantImageCard";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1.5rem 1rem 1rem 1rem;
  border: transparent;
  border-radius: 0.5rem;
  width: 230px;
  height: 230px;
  background: #fff;
  box-shadow: 0 4px 6px var(--primary);

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  min-width: 200px;
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
      <PlantImageCard
        image={image}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        id={id}
      />
      <CardInfoContainer>
        <div>{name}</div>{" "}
        {cropType === "Fruit" ? (
          <div>
            <SvgIcon variant="fruit" color="var(--secondary)" size="25" />
          </div>
        ) : cropType === "Vegetable" ? (
          <div>
            <SvgIcon variant="vegetable" color="var(--accent)" size="25" />
          </div>
        ) : cropType === "Herb" ? (
          <div>
            <SvgIcon variant="herb" color="var(--primary)" size="25" />
          </div>
        ) : (
          <div>
            <SvgIcon variant="other" color="var(--primary)" size="25" />
          </div>
        )}
      </CardInfoContainer>
    </CardContainer>
  );
}
