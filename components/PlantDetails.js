import useSWR from "swr";
import styled from "styled-components";
import PlantImage from "@/components/PlantImage";
import TaskPeriod from "@/components/TaskPeriod";
import SvgIcon from "./StyledElements/SvgIcon";

const periodColors = {
  Seed: "#D27D2D",
  Cultivation: "#AA336A",
  Planting: "#79af6e",
  Harvest: "#E23D28",
  Pruning: "#71797E",
};

const PageContainer = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

const HighlightBox = styled.section`
  margin: 1rem;
  background-color: var(--primary-light);
  border: 2px solid var(--primary);
  border-radius: 5px;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0.5rem 0 0.5rem -2rem;
  padding: 0.5rem 0.5rem;
`;

const StyledHighlightList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0.5rem 0.5rem;
  width: 100%;
`;

const StyledListElement = styled.li`
  margin: 1.2rem;
  padding: 0.8rem;
`;

const StyledHighlightListElement = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
`;

const StyledName = styled.h2`
  font-size: 22px;
`;

const StyledCondition = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid var(--primary);
`;

const StyledSvgBox = styled.div`
  display: flex;
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
  plant,
}) {
  // Filter out tasks that have defined periods
  const tasksArray = Object.entries(plant.tasks);
  const tasksArrayFiltered = tasksArray.filter(
    (task) => task[1].start && task[1].end
  );
  const tasksFiltered = Object.fromEntries(tasksArrayFiltered);

  return (
    <PageContainer>
      <h1>{plant.name}</h1>
      <Figure>
        <PlantImage
          image={
            plant.image === "undefined" || plant.image === null
              ? "/icons/placeholder.jpg"
              : plant.image
          }
          alt={plant.name}
          isFavorite={favoriteIDs.includes(id) ? true : false}
          onToggleFavorite={onToggleFavorite}
          id={id}
          width={350}
          height={200}
        />
      </Figure>
      <HighlightBox>
        <StyledHighlightList>
          <StyledHighlightListElement>
            <StyledName>{plant.botanicalName}</StyledName>
          </StyledHighlightListElement>

          <StyledHighlightListElement>
            <SvgIcon
              variant="clock"
              color="var(--primary-contrast)"
              size="25"
            />
            {plant.perennial ? "Perennial plant" : "Annual plant"}
          </StyledHighlightListElement>
          <StyledHighlightListElement>
            {plant.cropType === "Fruit" ? (
              <StyledHighlightListElement>
                <SvgIcon variant="fruit" color="var(--secondary)" size="25" />
                <span>Fruit</span>
              </StyledHighlightListElement>
            ) : plant.cropType === "Vegetable" ? (
              <StyledHighlightListElement>
                <SvgIcon variant="vegetable" color="var(--accent)" size="25" />
                <span>Vegetable</span>
              </StyledHighlightListElement>
            ) : plant.cropType === "Herb" ? (
              <StyledHighlightListElement>
                <SvgIcon variant="herb" color="var(--primary)" size="25" />
                <span>Herb</span>
              </StyledHighlightListElement>
            ) : (
              <StyledHighlightListElement>
                <SvgIcon variant="other" color="var(--primary)" size="25" />
                <span>Other</span>
              </StyledHighlightListElement>
            )}
          </StyledHighlightListElement>
        </StyledHighlightList>
      </HighlightBox>
      <StyledList>
        <StyledPeriodSummaryContainer>
          <StyledListElement>
            <StyledCondition>
              {plant.growingConditions === "Sunny" ? (
                <>
                  <SvgIcon
                    variant="sunny"
                    color="var(--primary-contrast)"
                    size="25"
                  />
                  <span>Sunny</span>
                </>
              ) : (
                <>
                  <SvgIcon
                    variant="partialShade"
                    color="var(--primary-contrast)"
                    size="25"
                  />
                  <span>Partial shade</span>
                </>
              )}
            </StyledCondition>
          </StyledListElement>
          <StyledListElement>
            <StyledCondition>
              {plant.placement === "Bed" ? (
                <>
                  <SvgIcon
                    variant="bed"
                    color="var(--primary-contrast)"
                    size="25"
                  />
                  <span>Bed</span>
                </>
              ) : plant.placement === "Pot" ? (
                <>
                  <SvgIcon
                    variant="pot"
                    color="var(--primary-contrast)"
                    size="25"
                  />
                  <span>Pot</span>
                </>
              ) : (
                <>
                  <StyledSvgBox>
                    <SvgIcon
                      variant="pot"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                    <SvgIcon
                      variant="bed"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                  </StyledSvgBox>
                  <span>Pot or bed</span>
                </>
              )}
            </StyledCondition>
          </StyledListElement>
          <StyledListElement>
            <StyledCondition>
              {plant.frostSensitive ? (
                <>
                  <SvgIcon
                    variant="snowflakeOff"
                    color="var(--primary-contrast)"
                    size="25"
                  />
                  <span>Frost sensitive</span>
                </>
              ) : (
                <>
                  <SvgIcon
                    variant="snowflake"
                    color="var(--primary-contrast)"
                    size="25"
                  />
                  <span>Frost insensitive</span>
                </>
              )}
            </StyledCondition>
          </StyledListElement>
        </StyledPeriodSummaryContainer>
        <StyledPeriodSummaryContainer>
          <StyledListElement>
            <StyledCondition>
              {plant.waterDemand === "1" ? (
                <>
                  <StyledSvgBox>
                    <SvgIcon
                      variant="waterFill"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                    <SvgIcon
                      variant="water"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                    <SvgIcon
                      variant="water"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                  </StyledSvgBox>
                  <span>Low water demand</span>
                </>
              ) : plant.waterDemand === "2" ? (
                <>
                  <StyledSvgBox>
                    <SvgIcon
                      variant="waterFill"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                    <SvgIcon
                      variant="waterFill"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                    <SvgIcon
                      variant="water"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                  </StyledSvgBox>
                  <span>Medium water demand</span>
                </>
              ) : (
                <>
                  <StyledSvgBox>
                    <SvgIcon
                      variant="waterFill"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                    <SvgIcon
                      variant="waterFill"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                    <SvgIcon
                      variant="waterFill"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                  </StyledSvgBox>
                  <span>High water demand</span>
                </>
              )}
            </StyledCondition>
          </StyledListElement>
          <StyledListElement>
            <StyledCondition>
              {plant.nutrientDemand === "1" ? (
                <>
                  <StyledSvgBox>
                    <SvgIcon
                      variant="nutrientFill"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                    <SvgIcon
                      variant="nutrient"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                    <SvgIcon
                      variant="nutrient"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                  </StyledSvgBox>
                  <span>Low nutrient demand</span>
                </>
              ) : plant.nutrientDemand === "2" ? (
                <>
                  <StyledSvgBox>
                    <SvgIcon
                      variant="nutrientFill"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                    <SvgIcon
                      variant="nutrientFill"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                    <SvgIcon
                      variant="nutrient"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                  </StyledSvgBox>
                  <span>Medium nutrient demand</span>
                </>
              ) : (
                <>
                  <StyledSvgBox>
                    <SvgIcon
                      variant="nutrientFill"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                    <SvgIcon
                      variant="nutrientFill"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                    <SvgIcon
                      variant="nutrientFill"
                      color="var(--primary-contrast)"
                      size="25"
                    />
                  </StyledSvgBox>
                  <span>High nutrient demand</span>
                </>
              )}
            </StyledCondition>
          </StyledListElement>{" "}
        </StyledPeriodSummaryContainer>
      </StyledList>
      {Object.keys(tasksFiltered).length > 0 ? (
        <div key="periodSummariesContainer">
          <StyledPeriodSummaryContainer key="periodSummariesContainer">
            {Object.keys(tasksFiltered).map((task) => {
              return (
                <StyledPeriodSummary
                  key={task + "PeriodSummary"}
                  $color={periodColors[task]}
                >
                  <StyledPeriodText
                    $weight="bold"
                    $size="1rem"
                    key={task + "PeriodSummaryHeader"}
                  >
                    {task}
                  </StyledPeriodText>
                  <StyledPeriodText
                    $weight="normal"
                    $size="0.9rem"
                    key={task + "PeriodSummaryText"}
                  >
                    {plant.tasks[task].start} &mdash; {plant.tasks[task].end}
                  </StyledPeriodText>
                </StyledPeriodSummary>
              );
            })}
          </StyledPeriodSummaryContainer>
          <StyledPeriodContainer key="periodContainer">
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
