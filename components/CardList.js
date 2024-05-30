import Card from "@/components/Card.js";
import useSWR from "swr";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 1rem;
  grid-auto-flow: row;
  padding-inline-start: 0px;
`;

export default function CardList() {
  const { data: plants, error, isLoading } = useSWR("/api/plants");

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
    <StyledList>
      {plants.map((plant) => {
        return (
          <li key={plant._id}>
            <Card
              name={plant.name}
              cropType={plant.cropType}
              image={plant.image}
              id={plant._id}
            />
          </li>
        );
      })}
    </StyledList>
  );
}
