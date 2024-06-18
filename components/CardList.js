import Card from "@/components/Card";
import styled from "styled-components";
import MultiSelectDropdown from "./StyledElements/MultiSelect";
import SvgIcon from "./StyledElements/SvgIcon";

const StyledListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  width: 100%;
  gap: 1rem;
`;

const StyledListElement = styled.li`
  flex: 1 1 calc(50% - 1rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
  @media (max-width: 768px) {
    flex: 1 1 calc(100% - 1rem);
  }

  @media (max-width: 375px) {
    // iPhone SE
    flex: 1 1 calc(100% - 0.5rem);
    margin: 0.25rem;
  }

  @media (min-width: 1024px) {
    // Desktop (3-column layout)
    flex: 1 1 calc(33.33% - 1rem);
  }

  @media (min-width: 1440px) {
    // Larger screen (4-column layout)
    flex: 1 1 calc(25% - 1rem);
  }
`;

const FilterContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;
  margin: 10px 0;
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  width: 25px;
  height: 25px;
  border: 0.5px solid #000;
  border-radius: 0.5rem;
  margin: 0 5px;
  padding: 4px;
  background-color: #e62600;

  &:hover {
    cursor: pointer;
    background-color: #ff4a26;
  }
`;

export default function CardList({
  plants,
  favoriteIDs,
  onToggleFavorite,
  onToggleFilter,
  onResetFilter,
  filter,
  activeTasksByPlant,
}) {
  const filterOptions = {
    cropType: ["Fruit", "Herb", "Vegetable", "Other"],
    placement: ["Bed", "Pot"],
    growingConditions: ["Sunny", "Partial shade"],
    activePeriods: ["Seed", "Cultivation", "Planting", "Harvest", "Pruning"],
  };

  const filterOptionsLabels = {
    cropType: "Crop Type",
    placement: "Placement",
    growingConditions: "Growing Conditions",
    activePeriods: "Current Tasks",
  };

  const filteredPlants = plants.filter((plant) => {
    return Object.keys(filter).every((category) => {
      if (category === "activePeriods") {
        const plantIdIndex = activeTasksByPlant.findIndex(
          (activePlantTask) => activePlantTask[0] === plant._id
        );
        return (
          filter[category].length === 0 ||
          filter[category].some((filter) =>
            activeTasksByPlant[plantIdIndex][1].includes(filter)
          )
        );
      } else {
        return (
          filter[category].length === 0 ||
          filter[category].some((filter) => plant[category].includes(filter))
        );
      }
    });
  });

  return (
    <>
      <FilterContainer>
        {Object.keys(filterOptions).map((option) => (
          <MultiSelectDropdown
            key={option}
            options={filterOptions[option]}
            selected={filter[option]}
            toggleOption={onToggleFilter}
            category={option}
            label={filterOptionsLabels[option]}
          />
        ))}
        <ResetButton type="reset" onClick={onResetFilter}>
          <SvgIcon variant="reload" color="#fff" />
        </ResetButton>
      </FilterContainer>
      <StyledListContainer>
        <StyledList>
          {filteredPlants.map((plant) => {
            return (
              <StyledListElement key={plant._id}>
                <Card
                  name={plant.name}
                  cropType={plant.cropType}
                  image={plant.image}
                  isFavorite={favoriteIDs.includes(plant._id)}
                  onToggleFavorite={onToggleFavorite}
                  id={plant._id}
                />
              </StyledListElement>
            );
          })}
        </StyledList>
      </StyledListContainer>
    </>
  );
}
