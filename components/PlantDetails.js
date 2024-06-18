import useSWR from "swr";
import styled from "styled-components";
import PlantImage from "@/components/PlantImage";
import TaskPeriod from "@/components/TaskPeriod";
import {
  getCurrentInterval,
  getActiveTasksByPlant,
  months,
} from "@/utils/TaskPeriodUtils";

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

const StyledPeriodSummaryContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem;
  margin-top: 1.5rem;
  padding: 1rem;
  border: 0.1rem solid grey;
  border-radius: 0.5rem;
`;

const StyledPeriodSummary = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.$color};
  color: white;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 0.5rem;
`;

const StyledPeriodSummaryHeader = styled.div`
  position: absolute;
  left: 1rem;
  top: -1rem;
  background: white;
  font-size: 0.9rem;
  padding: 0.2rem 0.8rem;
  border-radius: 0.5rem;
  border: 0.1rem solid grey;
`;

const StyledPeriodText = styled.div`
  font-weight: ${(props) => props.$weight};
  font-size: ${(props) => props.$size};
  margin-bottom: 0.1rem;
`;

const StyledPeriodContainer = styled.div`
  overflow-x: "auto";
  overflow-y: hidden;
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

  // Get current time period / interval
  const currentInterval = getCurrentInterval(months);
  const currentTasks = getActiveTasksByPlant([plant], months)[0][1];

  // Filter out tasks that have defined periods
  const tasksArray = Object.entries(plant.tasks);
  const tasksArrayFiltered = tasksArray.filter(
    (task) => task[1].start && task[1].end
  );

  const activeTasksArray = tasksArrayFiltered.filter((task) =>
    currentTasks.includes(task[0])
  );
  const inactiveTasksArray = tasksArrayFiltered.filter(
    (task) => !currentTasks.includes(task[0])
  );

  const tasksFiltered = Object.fromEntries(tasksArrayFiltered);
  const activeTasks = Object.fromEntries(activeTasksArray);
  const inactiveTasks = Object.fromEntries(inactiveTasksArray);

  const periodColors = {
    Seed: "#D27D2D",
    Cultivation: "#FFC000",
    Planting: "#79af6e",
    Harvest: "#E23D28",
    Pruning: "#71797E",
  };

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
        <>
          {Object.keys(activeTasks).length > 0 && (
            <StyledPeriodSummaryContainer>
              <StyledPeriodSummaryHeader>
                Current tasks
              </StyledPeriodSummaryHeader>
              {Object.keys(activeTasks).map((task) => {
                return (
                  <StyledPeriodSummary key={task} $color={periodColors[task]}>
                    <StyledPeriodText $weight="bold" $size="calc(70% + 0.5vw)">
                      {task}
                    </StyledPeriodText>
                    <StyledPeriodText
                      $weight="normal"
                      $size="calc(70% + 0.4vw)"
                    >
                      {plant.tasks[task].start} &mdash; {plant.tasks[task].end}
                    </StyledPeriodText>
                  </StyledPeriodSummary>
                );
              })}
            </StyledPeriodSummaryContainer>
          )}

          {Object.keys(inactiveTasks).length > 0 && (
            <StyledPeriodSummaryContainer>
              <StyledPeriodSummaryHeader>Other tasks</StyledPeriodSummaryHeader>
              {Object.keys(inactiveTasks).map((task) => {
                return (
                  <StyledPeriodSummary key={task} $color={periodColors[task]}>
                    <StyledPeriodText $weight="bold" $size="calc(70% + 0.5vw)">
                      {task}
                    </StyledPeriodText>
                    <StyledPeriodText
                      $weight="normal"
                      $size="calc(70% + 0.4vw)"
                    >
                      {plant.tasks[task].start} &mdash; {plant.tasks[task].end}
                    </StyledPeriodText>
                  </StyledPeriodSummary>
                );
              })}
            </StyledPeriodSummaryContainer>
          )}

          <StyledPeriodContainer>
            {Object.keys(tasksFiltered).map((task, index) => {
              return (
                <TaskPeriod
                  key={task}
                  task={plant.tasks[task]}
                  taskName={task}
                  edit={false}
                  showHeader={index === 0}
                  color={periodColors[task]}
                  currentInterval={currentInterval}
                ></TaskPeriod>
              );
            })}
          </StyledPeriodContainer>
        </>
      ) : (
        <StyledNote>No periods defined for this plant yet.</StyledNote>
      )}
    </>
  );
}
