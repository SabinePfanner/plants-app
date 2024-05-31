import Card from "@/components/Card";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 1rem;
  grid-auto-flow: row;
  padding-inline-start: 0px;
  margin-bottom: 15vh;
`;

const StyledListElement = styled.li`
  align-self: end;
  justify-self: center;
`;

export default function CardList({ plants, favoriteIDs, onToggleFavorite }) {
  return (
    <StyledList>
      {plants.map((plant) => {
        return (
          <StyledListElement key={plant._id}>
            <Card
              name={plant.name}
              cropType={plant.cropType}
              image={plant.image}
              isFavorite={favoriteIDs.includes(plant._id) ? true : false}
              onToggleFavorite={onToggleFavorite}
              id={plant._id}
            />
          </StyledListElement>
        );
      })}
    </StyledList>
  );
}
