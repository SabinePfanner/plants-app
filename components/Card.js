import styled from "styled-components";
import SvgIcon from "@/components/StyledElements/SvgIcon";
import PlantImageCard from "./StyledElements/PlantImageCard";

const CardContainer = styled.div`
  position: relative;
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

const DefaultLock = styled.div`
  position: absolute;
  top: 2.5px;
  left: 0.5px;
`;

const CardInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  min-width: 200px;
  max-width: 200px;
`;

export default function Card({
  image,
  name,
  cropType,
  owner,
  id,
  session,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <CardContainer>
      {owner === "default" && (
        <DefaultLock>
          <SvgIcon
            variant="default"
            color="var(--primary-constrast)"
            size="16"
          ></SvgIcon>
        </DefaultLock>
      )}
      <PlantImageCard
        image={image}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        id={id}
        session={session}
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
