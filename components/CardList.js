import Card from "@/components/Card";
import styled from "styled-components";
import MultiSelectDropdown from "./StyledElements/MultiSelect";
import SvgIcon from "./StyledElements/SvgIcon";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-row: auto;
  grid-gap: 0.5rem;
  padding-inline-start: 0;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 375px) {
    // iPhone SE
    grid-template-columns: 1fr;
  }

  @media (min-width: 1024px) {
    // Desktop (3-column layout)
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1440px) {
    // Larger screen (4-column layout)
    grid-template-columns: repeat(6, 1fr);
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
  background-color: var(--secondary);

  &:hover {
    cursor: pointer;
    background-color: var(--secondary-light-300);
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

  return (
    <PageContainer>
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
      <ListContainer>
        <StyledList>
          {filteredPlants.map((plant) => {
            return (
              <Card
                key={plant._id}
                name={plant.name}
                owner={plant.owner}
                cropType={plant.cropType}
                image={
                  plant.image === "undefined" || plant.image === null
                    ? "/icons/placeholder.png"
                    : plant.image
                }
                isFavorite={favoriteIDs.includes(plant._id)}
                onToggleFavorite={onToggleFavorite}
                id={plant._id}
              />
            );
          })}
        </StyledList>
      </ListContainer>
    </PageContainer>
  );
}
