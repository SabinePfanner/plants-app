import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";
import PlantImage from "@/components/PlantImage";

const HighlightBox = styled.section`
  margin: 1rem;
  background-color: var(--color-green);
  border-radius: 5px;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0.5rem 0 0.5rem -2rem;
  padding: 0.5rem 0.5rem;
`;

const StyledListElement = styled.li`
  margin: 0 1.2rem;
  padding: 0.2rem 1.8rem;
`;

const Figure = styled.figure`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

export default function PlantDetails({ favoriteIDs, onToggleFavorite }) {
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
      <h1>{plant.name}</h1>
      <Figure>
        <PlantImage
          image={plant.image}
          alt={plant.name}
          isFavorite={favoriteIDs.includes(id) ? true : false}
          onToggleFavorite={onToggleFavorite}
          id={id}
          width={350}
          height={200}
        />
      </Figure>
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
