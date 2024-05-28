import { Card } from "./card";
import useSWR from "swr";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 1rem;
  grid-auto-flow: row;
`;

export default function CardList() {
  const { data: plants, error, isLoading } = useSWR("/api/plants");
  console.log("plants in cardList: ", plants);

  if (error) {
    return <p>Could not fetch data!</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!plants) {
    return;
  }

  return (
    <>
      <StyledList>
        {plants.map((plant) => {
          console.log(plant);
          return (
            <li key={plant._id}>
              <Card
                name={plant.name}
                cropType={plant.cropType}
                image={plant.image}
              />
            </li>
          );
        })}
      </StyledList>
    </>
  );
}
