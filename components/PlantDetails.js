import useSWR from "swr";
import styled from "styled-components";
import PlantImage from "@/components/PlantImage";
import TaskPeriod from "@/components/TaskPeriod";

const PageContainer = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

const HighlightBox = styled.section`
  margin: 1rem;
  background-color: var(--primary);
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

export default function PlantDetails({
  favoriteIDsLocal,
  favoriteIDsOwner,
  onToggleFavorite,
  id,
  plant,
  session,
}) {
  return (
    <PageContainer>
      <h1>{plant.name}</h1>
      <Figure>
        <PlantImage
          image={
            plant.image === "undefined" || plant.image === null
              ? "/icons/placeholder.png"
              : plant.image
          }
          alt={plant.name}
          isFavorite={
            session
              ? favoriteIDsOwner.includes(id)
                ? true
                : false
              : favoriteIDsLocal.includes(id)
              ? true
              : false
          }
          onToggleFavorite={onToggleFavorite}
          id={id}
          width={350}
          height={200}
          session={session}
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
        <StyledListElement>
          Water demand:{" "}
          {plant.waterDemand === "1"
            ? "Low"
            : plant.nutrientDemand === "2"
            ? "Medium"
            : "High"}
        </StyledListElement>
        <StyledListElement>
          Nutrient demand:{" "}
          {plant.nutrientDemand === "1"
            ? "Low"
            : plant.nutrientDemand === "2"
            ? "Medium"
            : "High"}
        </StyledListElement>
        <StyledListElement>
          Frost sensitive: {plant.frostSensitive ? "Yes" : "No"}
        </StyledListElement>
      </StyledList>
      <TaskPeriod task={plant.tasks} taskName="seed" edit={false}></TaskPeriod>
    </PageContainer>
  );
}
