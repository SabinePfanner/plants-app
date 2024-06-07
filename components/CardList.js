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
  position: fixed;
  z-index: 1000;
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

export default function CardList({ plants, favoriteIDs, onToggleFavorite }) {
  const [cropType, setCropType] = useState([]);

  const cropTypeFilterOptions = ["Fruit", "Herb", "Vegetable", "Other"];

  function toggleCropType({ title }) {
    setCropType((prevSelected) => {
      // if it's in, remove
      const newArray = [...prevSelected];
      if (newArray.includes(title)) {
        console.log("New Array 1", newArray);
        return newArray.filter((item) => item != title);
        // else, add
      } else {
        newArray.push(title);
        console.log("New Array 2 ", newArray);
        return newArray;
      }
    });
  }

  const [placement, setPlacement] = useState([]);

  const placementFilterOptions = ["Bed", "Pot"];

  function togglePlacement({ title }) {
    setPlacement((prevSelected) => {
      // if it's in, remove
      const newArray = [...prevSelected];
      if (newArray.includes(title)) {
        console.log("New Array 1", newArray);
        return newArray.filter((item) => item != title);
        // else, add
      } else {
        newArray.push(title);
        console.log("New Array 2 ", newArray);
        return newArray;
      }
    });
  }

  const [growingConditions, setGrowingConditions] = useState([]);

  const growingConditionsFilterOptions = ["Sunny", "Partial shade"];

  function toggleGrowingConditions({ title }) {
    setGrowingConditions((prevSelected) => {
      // if it's in, remove
      const newArray = [...prevSelected];
      if (newArray.includes(title)) {
        console.log("New Array 1", newArray);
        return newArray.filter((item) => item != title);
        // else, add
      } else {
        newArray.push(title);
        console.log("New Array 2 ", newArray);
        return newArray;
      }
    });
  }

  let filteredPlants;

  filteredPlants = plants.filter((plant) => {
    if (cropType.length > 0) {
      return cropType.some((filter) => plant.cropType.includes(filter));
    } else {
      return plant;
    }
  });

  filteredPlants = filteredPlants.filter((plant) => {
    if (placement.length > 0) {
      return placement.some((filter) => plant.placement.includes(filter));
    } else {
      return plant;
    }
  });

  filteredPlants = filteredPlants.filter((plant) => {
    if (growingConditions.length > 0) {
      return growingConditions.some((filter) =>
        plant.growingConditions.includes(filter)
      );
    } else {
      return plant;
    }
  });

  function resetFilter() {
    setCropType([]);
    setPlacement([]);
    setGrowingConditions([]);
  }
  return (
    <>
      <FilterContainer>
        <MultiSelectDropdown
          options={cropTypeFilterOptions}
          selected={cropType}
          toggleOption={toggleCropType}
        />
        <MultiSelectDropdown
          options={placementFilterOptions}
          selected={placement}
          toggleOption={togglePlacement}
        />
        <MultiSelectDropdown
          options={growingConditionsFilterOptions}
          selected={growingConditions}
          toggleOption={toggleGrowingConditions}
        />
        <ResetButton type="reset" onClick={resetFilter} disabled={false}>
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
