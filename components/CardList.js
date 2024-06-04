import Card from "@/components/Card";
import styled from "styled-components";
import Modal from "./ModalAndToast/Modal";

const StyledList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-auto-flow: row;
  padding-inline-start: 0;
`;

const StyledListElement = styled.li`
  align-self: end;
  justify-self: center;
`;

export default function CardList({ plants, favoriteIDs, onToggleFavorite }) {
  return (
    <>
      <StyledList>
        {plants.map((plant) => {
          return (
            <StyledListElement key={plant._id}>
              <Card
                name={plant.name}
                cropType={plant.cropType}
                image={plant.image}
                isFavorite={favoriteIDs.includes(plant._id)}
                onToggleFavorite={onToggleFavorite}
                id={plant._id}
              />
            </StyledListElement>
          );
        })}
      </StyledList>
    </>
  );
}
