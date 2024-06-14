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
  gap: 5px;
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
}) {
  const filterOptions = {
    cropType: ["Fruit", "Herb", "Vegetable", "Other"],
    placement: ["Bed", "Pot"],
    growingConditions: ["Sunny", "Partial shade"],
  };

  const filteredPlants = plants.filter((plant) =>
    Object.keys(filter).every(
      (category) =>
        filter[category].length === 0 ||
        filter[category].some((filter) => plant[category].includes(filter))
    )
  );

  // let idx = 1;

  // function filterPlants(plants, filters) {
  
  //   const category = Object.keys(filters)[idx - 1];

  //   if (idx <= Object.keys(filters).length) {
  //     const filteredPlants = plants.filter((plant) =>
  //       filters[category].length === 0 ||
  //       filters[category].some((filter) => plant[category].includes(filter))
  //     );
  //     idx++;
  //     return filterPlants(filteredPlants, filters);
  //   } else {
  //     return plants;
  //   }
  // }

  // const filteredPlants = filterPlants(plants, filter);

  return (
    <>
      <FilterContainer>
        <MultiSelectDropdown
          options={filterOptions.cropType}
          selected={filter.cropType}
          toggleOption={onToggleFilter}
          category={"cropType"}
          label={"Crop Type"}
        />
        <MultiSelectDropdown
          options={filterOptions.placement}
          selected={filter.placement}
          toggleOption={onToggleFilter}
          category={"placement"}
          label={"Placement"}
        />
        <MultiSelectDropdown
          options={filterOptions.growingConditions}
          selected={filter.growingConditions}
          toggleOption={onToggleFilter}
          category={"growingConditions"}
          label={"Growing Conditions"}
        />
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
