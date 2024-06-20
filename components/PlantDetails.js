import useSWR from "swr";
import styled from "styled-components";
import PlantImage from "@/components/PlantImage";
import TaskPeriod from "@/components/TaskPeriod";
import SvgIcon from "./StyledElements/SvgIcon";
import {
  getCurrentInterval,
  getActiveTasksByPlant,
  months,
} from "@/utils/TaskPeriodUtils";
import ImagesForm from "@/components/ImagesForm";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { StyledButton, ButtonGroup } from "@/components/StyledElements/Buttons";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

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

const DetailsHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CardDetailsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 1rem 1rem 1rem;
  border: transparent;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px var(--primary);
  width: 500px;
  height: 330px;

  @media (max-width: 599px) {
    // iPhone SE
    width: 270px;
    height: 270px;
  }
`;

const StyledHeadlinebox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const HighlightBox = styled.section`
  margin: 1rem 3rem 0 3rem;
  background-color: var(--primary-light);
  border: 2px solid var(--primary);
  border-radius: 5px;

  @media (max-width: 599px) {
    // iPhone SE
    width: 70%;
    margin: auto;
    margin-top: 1rem;
  }
`;

const StyledHighlightList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0.5rem;
  width: 100%;
  margin: auto;

  @media (max-width: 599px) {
    // iPhone SE
    flex-direction: column;
  }
`;

const StyledHighlightListElement = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  @media (max-width: 599px) {
    // iPhone SE
    flex-direction: row;
  }
`;

const StyledName = styled.h2`
  font-size: 22px;
`;

const StyledCondition = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 1rem 0.5rem 1rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid var(--primary);
`;

const StyledSvgBox = styled.div`
  display: flex;
`;

const StyledConditionSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem;
  @media (max-width: 599px) {
    // iPhone SE

    margin: auto;
  }
`;

const StyledPeriodSummaryContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem;

  @media (max-width: 599px) {
    // iPhone SE

    margin: auto;
  }

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
  overflow-x: auto;
  margin-right: 1rem;
  margin-left: 1rem;
`;

const StyledNote = styled.p`
  margin: 0 1.5rem;
  font-style: italic;
`;

const StyledCarousel = styled(Carousel)`
  margin: 1rem 0;
  padding: 2rem 3rem;
  border-bottom: 2px solid grey;
  border-top: 2px solid grey;
  border-radius: 0.5rem;
`;

const StyledCarouselImage = styled(Image)`
  margin: 0rem 1rem;
  /* padding: 2rem 3rem; */
  /* border-bottom: 2px solid grey;
  border-top: 2px solid grey; */
  /* padding: 1rem; */
  border-radius: 0.5rem;
  max-width: 230px;
  min-width: 230px;
  /* max-width:100%; */
`;

export default function PlantDetails({
  favoriteIDs,
  onToggleFavorite,
  id,
  plant,
  onOpenToast,
}) {
  const { mutate } = useSWR(`/api/plants/${id}`);

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

  async function handleAddImages(images) {
    const response = await fetch(`/api/plants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...plant,
        detailsImages: images,
        updateImages: true,
      }),
    });

    if (response.ok) {
      mutate();
      onOpenToast("Images added to plant!");
    } else {
      console.error(response.status);
    }
  }

  async function handleDeleteImages() {
    const plantWithoutImages = { ...plant, detailsImages: [] };
    const response = await fetch(`/api/plants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantWithoutImages),
    });

    if (response.ok) {
      mutate();
      onOpenToast("Images successfully deleted!");
    } else {
      console.error(response.status);
    }
  }

  return (
    <PageContainer>
      <DetailsHeaderContainer>
        <CardDetailsContainer>
          <StyledHeadlinebox>
            {plant.owner === "default" && (
              <SvgIcon
                variant="default"
                color="var(--primary-constrast)"
                size="16"
              ></SvgIcon>
            )}
            <h1>{plant.name}</h1>
          </StyledHeadlinebox>

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
        </CardDetailsContainer>
      </DetailsHeaderContainer>
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
              <>
                <SvgIcon variant="fruit" color="var(--secondary)" size="25" />
                <span>Fruit</span>
              </>
            ) : plant.cropType === "Vegetable" ? (
              <>
                <SvgIcon variant="vegetable" color="var(--accent)" size="25" />
                <span>Vegetable</span>
              </>
            ) : plant.cropType === "Herb" ? (
              <>
                <SvgIcon variant="herb" color="var(--primary)" size="25" />
                <span>Herb</span>
              </>
            ) : (
              <>
                <SvgIcon variant="other" color="var(--primary)" size="25" />
                <span>Other</span>
              </>
            )}
          </StyledHighlightListElement>
        </StyledHighlightList>
      </HighlightBox>

      <StyledConditionSummaryContainer>
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
      </StyledConditionSummaryContainer>
      <StyledConditionSummaryContainer>
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
            </>
          )}{" "}
          <span>Water demand</span>
        </StyledCondition>

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
            </>
          )}
          <span>Nutrient demand</span>
        </StyledCondition>
      </StyledConditionSummaryContainer>

      {Object.keys(tasksFiltered).length > 0 ? (
        <div key="periodSummariesContainer">
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
            <StyledPeriodSummaryContainer key="periodSummariesContainer">
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
                  key={task + "PeriodGrid"}
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
        </div>
      ) : (
        <StyledNote>No periods defined for this plant yet.</StyledNote>
      )}

      {plant.detailsImages.length > 0 && (
        <>
          <StyledButton type="button" onClick={handleDeleteImages}>
            Delete images
          </StyledButton>
          <StyledCarousel
            responsive={responsive}
            // focusOnSelect={true}
            // centerMode={true}
          >
            {plant.detailsImages.map((image) => {
              return (
                <Image
                  key={image}
                  alt="Image"
                  src={image}
                  // sizes="100%"
                  height="200"
                  width="250"
                  // partialVisible={false}
                  // fill
                  // style={{ objectFit: "cover" }} // alternative: contain
                  // itemClass="carousel-item-padding-10-px"
                />
              );
            })}
          </StyledCarousel>
        </>
      )}
      {plant.owner === "default" && (
        <StyledNote>Default plants can not be edited or deleted!</StyledNote>
      )}
    </PageContainer>
  );
}
