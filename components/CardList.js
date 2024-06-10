import Card from "@/components/Card";
import styled from "styled-components";
import MultiSelectDropdown from "./StyledElements/MultiSelect";
import { useState } from "react";

const StyledList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-auto-flow: row;
  padding-inline-start: 0;
`;

const StyledListElement = styled.li`
  align-self: end;
  justify-self: center;
`;

const FilterContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0 0 0 8%;
`;

const ResetButton = styled.button`
  font-size: 0.7rem;
  border: 0.5px solid #000;
  border-radius: 0.5rem;
  margin: 0 0 0 20px;
  background-color: #e62600;
  color: #fff;
  max-height: 24px;

  &:hover {
    cursor: pointer;
    background-color: #ff4a26;
  }

  &:disabled,
  :hover {
    cursor: auto;
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
  name,
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
          Reset filter
        </ResetButton>
      </FilterContainer>
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
    </>
  );
}
