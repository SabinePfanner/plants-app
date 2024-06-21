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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  @media (max-width: 599px) {
    // iPhone SE

    margin: 1.5rem;
  }

  margin-top: 1.5rem;
  padding: 1rem;
  border: 0.1rem solid var(--primary-light-contrast);
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
  border: 0.1rem solid var(--primary-light-contrast);
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
  margin-top: 1rem;
`;

const StyledNote = styled.p`
  margin: 0 1.5rem;
  font-style: italic;
`;

const StyledDiaryHeader = styled.h1`
  margin-top: 3rem;
`;

// const windowWidth = window.width;

// console.log("windowWidth", windowWidth);

const StyledSlider = styled(Slider)`
  position: relative;
  /* width: 95%; */
  /* height: 200px; */
  margin: 3rem 0 1rem 2rem;
  padding: 1.5rem 0.5rem;
  border: 0.1rem solid var(--primary-light-contrast);
  border-radius: 0.5rem;

  /* @media (max-width: 599px) {
    // iPhone SE
    margin: 1.5;
  } */

  /* .slick-list {
    padding: 0 !important;
  } */

  .slick-track {
    height: auto;
    /* line-height:0; */

  } 

  .slick-prev:before,
  .slick-next:before {
    color: var(--primary-light-contrast);
    font-size: 2rem;
  }

  .slick-slide {
    margin: 0 30px;
  }

  /* .slick-slider{
    line-height:0;
  } */
`;

const StyledCarouselImage = styled(Image)`
  border-radius: 0.3rem;

  /* object-fit: cover; // alternative: contain */
  &:hover {
    transform: scale(1.025);
    cursor: pointer;
  }
`;

const settings = {
  className: "slider variable-width",
  dots: true,
  infinite: true,
  centerMode: true,
  centerPadding: "60px",
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  swipeToSlide: true,
  swipe: true,
  draggable: true,
  focusOnSelect: true,
  speed: 400,
  rows: 1,
  adaptiveHeight: true,
};

export default function PlantDetails({
  favoriteIDs,
  onToggleFavorite,
  id,
  plant,
  onOpenToast,
  onOpenModal,
  onCloseModal,
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

  function handleOpenModal() {
    onOpenModal({
      modalInfoText: "Do you really want to delete all images?",
      confirmButtonLabel: "Delete",
      onClick: () => {
        onCloseModal();
        handleDeleteImages();
      },
    });
  }

  return (
    <PageContainer>
      <DetailsHeaderContainer>
        <CardDetailsContainer>
          <StyledHeadlinebox>
            {plant.owner === "default" && (
              <SvgIcon
                variant="default"
                color="var(--primary-contrast)"
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
              <StyledPeriodSummaryHeader>
                {Object.keys(activeTasks).length > 0 ? "Other tasks" : "Tasks"}
              </StyledPeriodSummaryHeader>
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

      {(plant.detailsImages.length && plant.owner !== "default") > 0 && (
        <>
          <StyledDiaryHeader>Your plant diary</StyledDiaryHeader>
          <StyledSlider {...settings}>
            {plant.detailsImages.map((image) => {
              console.log("image in map: ", image);
              return (
                <StyledCarouselImage
                  key={image}
                  alt="Image"
                  src={image[0]}
                  height="150"
                  width={150 * (image[2] / image[1])}
                />
              );
            })}
          </StyledSlider>
        </>
      )}
      {plant.owner !== "default" && (
        <ImagesForm
          onAddImages={handleAddImages}
          onDeleteImages={handleDeleteImages}
          onConfirmDelete={handleOpenModal}
          imagesPresent={plant.detailsImages.length > 0}
        />
      )}

      {plant.owner === "default" && (
        <StyledNote>Default plants can not be edited or deleted!</StyledNote>
      )}
    </PageContainer>
  );
}
