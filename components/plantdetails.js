import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledTitle = styled.h2`
  text-align: center;
`;

const HighlightBox = styled.section`
  margin: 1rem;
  background-color: var(--color-green);
  border-radius: 5px;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0.5rem 0rem 0.5rem -2rem;
  padding: 0.5rem 0.5rem;
`;

const StyledListElement = styled.li`
  margin: 0rem 1.2rem;
  padding: 0.2rem 1.8rem;
`;

export default function PlantDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data: plant, isLoading } = useSWR(`/api/plants/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!plant) {
    return;
  }

  return (
    <>
      <StyledTitle>{plant.name}</StyledTitle>
      <HighlightBox>
        <StyledList>
          <StyledListElement>{plant.botanicalName}</StyledListElement>
          <StyledListElement>{plant.cropType}</StyledListElement>
          <StyledListElement>
            {plant.perennial ? "Perennial plant" : "Annual plant"}
          </StyledListElement>
        </StyledList>
      </HighlightBox>
      <StyledList>
        <StyledListElement>Placement: {plant.placement}</StyledListElement>
        <StyledListElement>
          Growing Conditions: {plant.growingConditions}
        </StyledListElement>
        <StyledListElement>Water demand: {plant.waterDemand}</StyledListElement>
        <StyledListElement>
          Nutrient demand: {plant.nutrientDemand}
        </StyledListElement>
        <StyledListElement>
          Frost sensitive: {plant.frostSensitive ? "Yes" : "No"}
        </StyledListElement>
      </StyledList>
    </>
  );
}
