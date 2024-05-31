import Card from "@/components/Card";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); */
  grid-template-rows: 1fr;
  /* grid-gap: 1rem; */
  grid-auto-flow: row;
  padding-inline-start: 0px;
  /* min-height: 0;   */
  /* min-width: 0;   */
`;

// const StyledList = styled.ul`
//   list-style: none;
//   display: flex;
//   /* flex-wrap: wrap; */
//   gap: 1rem;
//   flex-flow: row wrap; 
// `;

// const StyledListElement = styled.li`
//  flex: 1 0;
//   align-self: center;
//   justify-self: center;
//   flex-basis: 50%;
// `;

const StyledListElement = styled.li`
  align-self: end;
  justify-self: center;
  /* overflow: auto;   */
  /* min-width: 0; */
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
