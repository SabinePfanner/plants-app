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

const StyledPeriodSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem;
`;

const StyledPeriodSummary = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.$color};
  color: white;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 1rem 0.5rem 1rem 1rem;
  border-radius: 0.5rem;
`;

const StyledPeriodText = styled.div`
  font-weight: ${(props) => props.$weight};
  font-size: ${(props) => props.$size};
  margin-bottom: 0.1rem;
`;

const StyledPeriodContainer = styled.div`
  overflow-x: auto;
`;

const StyledNote = styled.p`
  margin: 0 1.5rem;
  font-style: italic;
`;

export default function PlantDetails({
  favoriteIDs,
  onToggleFavorite,
  id,
  onIsDataDefault,
}) {
  const { data: plant, error, isLoading } = useSWR(`/api/plants/${id}`);

  if (error) {
    return <p>Could not fetch data!</p>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!plant) {
    return;
  }

  onIsDataDefault(plant.owner === "default");

  // Filter out tasks that have defined periods
  const tasksArray = Object.entries(plant.tasks);
  const tasksArrayFiltered = tasksArray.filter(
    (task) => task[1].start && task[1].end
  );
  const tasksFiltered = Object.fromEntries(tasksArrayFiltered);

  const periodColors = {
    Seed: "#D27D2D",
    Cultivation: "#AA336A",
    Planting: "#79af6e",
    Harvest: "#E23D28",
    Pruning: "#71797E",
  };

  return (
    <PageContainer>
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
      {Object.keys(tasksFiltered).length > 0 ? (
        <div key = "periodSummariesContainer">
          <StyledPeriodSummaryContainer key = "periodSummariesContainer">
            {Object.keys(tasksFiltered).map((task) => {
              return (
                <StyledPeriodSummary key={task + "PeriodSummary"} $color={periodColors[task]}>
                  <StyledPeriodText $weight="bold" $size="1rem"  key={task + "PeriodSummaryHeader"}>
                    {task}
                  </StyledPeriodText>
                  <StyledPeriodText $weight="normal" $size="0.9rem" key={task + "PeriodSummaryText"}>
                    {plant.tasks[task].start} &mdash; {plant.tasks[task].end}
                  </StyledPeriodText>
                </StyledPeriodSummary>
              );
            })}
          </StyledPeriodSummaryContainer>
            <StyledPeriodContainer key = "periodContainer">
              {Object.keys(tasksFiltered).map((task, index) => {
                return (
                  <TaskPeriod
                    key={task + "PeriodGrid"}
                    task={plant.tasks[task]}
                    taskName={task}
                    edit={false}
                    showHeader={index === 0}
                    color={periodColors[task]}
                  ></TaskPeriod>
                );
              })}
            </StyledPeriodContainer>
        </div>
      ) : (
        <StyledNote>No periods defined for this plant yet.</StyledNote>
      )}
      <TaskPeriod task={plant.tasks} taskName="seed" edit={false}></TaskPeriod>
    </PageContainer>
  );
}
