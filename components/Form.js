import styled, { css } from "styled-components";
import { StyledButton, ButtonGroup } from "@/components/StyledElements/Buttons";
import { RadioButton } from "@/components/StyledElements/RadioButton";
import { RangeInput } from "@/components/StyledElements/RangeSlider";
import { CustomSelect } from "@/components/StyledElements/Select";
import { useState } from "react";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  gap: 0.5rem;
  padding: 1rem;
`;

const labelStyles = css`
  font-weight: bold;
  margin-top: 0.4rem;
`;
const Label = styled.label(labelStyles);

const FieldsetLabel = styled.legend(labelStyles);

const Input = styled.input`
  padding: 0.5rem;
  border: 2px solid black;
  border-radius: 0.5rem;
`;

const Fieldset = styled.fieldset`
  padding: 0;
  border: none;
`;

const RadioButtonGroup = styled.div`
  display: flex;
  gap: 5rem;
`;
const RadioButtonLabel = styled.label`
  display: flex;
  align-items: flex-end;
`;

const RangeInputLabels = styled.div`
  display: flex;
  justify-content: space-between;
`;

// Values for custom select components used in form
const cropTypes = ["Fruit", "Herb", "Vegetable", "Other"];
const placements = ["Bed", "Pot", "Pot or Bed"];
const growingConditions = ["Sunny", "Partial Shade"];

export default function Form({ onSubmit, onDismiss }) {
  // Select Crop Type

  const [currentCropType, setCurrentCropType] = useState(null);

  function handleCropTypeChange(value) {
    setCurrentCropType(value);
  }

  // Select Placement

  const [currentPlacement, setCurrentPlacement] = useState(null);

  function handlePlacementChange(value) {
    setCurrentPlacement(value);
  }

  // Select Growing Conditions

  const [currentGrowingConditions, setCurrentGrowingConditions] =
    useState(null);

  function handleGrowingConditionsChange(value) {
    setCurrentGrowingConditions(value);
  }

  function checkSelectInput(input, name) {
    if (!input) {
      return `Select the preferred ${name} ↓`;
    } else {
      return input;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Handle custom selects: if not null, add data to form data, otherwise show a custom alert message
    if (
      currentCropType === null ||
      currentPlacement === null ||
      currentGrowingConditions === null
    ) {
      alert("Please fill out all inputs");
    } else {
      formData.set("cropType", currentCropType);
      formData.set("placement", currentPlacement);
      formData.set("growingConditions", currentGrowingConditions);
      const plantData = Object.fromEntries(formData);
      onSubmit(plantData);
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        type="text"
        minLength="1"
        maxLength="75"
        required
      />
      <Label htmlFor="botanicalName">Botanical name</Label>
      <Input
        id="botanicalName"
        name="botanicalName"
        type="text"
        minLength="1"
        maxLength="75"
        required
      />
      <Label htmlFor="cropType">Crop type</Label>
      <CustomSelect
        id="cropType"
        name="cropType"
        values={cropTypes}
        value={checkSelectInput(currentCropType)}
        onValueChange={handleCropTypeChange}
        labelButtonText={checkSelectInput(currentCropType, "crop type")}
      />
      <FieldsetLabel htmlFor="perennial">Perennial</FieldsetLabel>
      <Fieldset>
        <RadioButtonGroup>
          <RadioButtonLabel htmlFor="perennial-yes">
            Yes
            <RadioButton
              id="perennial-yes"
              name="perennial"
              type="radio"
              value="true"
            />
          </RadioButtonLabel>
          <RadioButtonLabel htmlFor="perennial-no">
            No
            <RadioButton
              id="perennial-no"
              name="perennial"
              type="radio"
              value="false"
              defaultChecked
            />
          </RadioButtonLabel>
        </RadioButtonGroup>
      </Fieldset>
      <Label htmlFor="placement">Placement</Label>
      <CustomSelect
        id="placement"
        name="placement"
        values={placements}
        value={checkSelectInput(currentPlacement)}
        onValueChange={handlePlacementChange}
        labelButtonText={checkSelectInput(currentPlacement, "placement")}
      />
      <Label htmlFor="growingConditions">Growing conditions</Label>
      <CustomSelect
        id="growingConditions"
        name="growingConditions"
        values={growingConditions}
        value={checkSelectInput(growingConditions)}
        onValueChange={handleGrowingConditionsChange}
        labelButtonText={checkSelectInput(
          currentGrowingConditions,
          "growing conditions"
        )}
      />
      <FieldsetLabel htmlFor="waterDemand">Water demand</FieldsetLabel>
      <Fieldset>
        <RangeInput
          id="waterDemand"
          name="waterDemand"
          type="range"
          min="1"
          max="3"
          step="1"
          defaultValue="2"
          required
        />
        <RangeInputLabels>
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </RangeInputLabels>
      </Fieldset>
      <FieldsetLabel htmlFor="nutrientDemand">Nutrient demand</FieldsetLabel>
      <Fieldset>
        <RangeInput
          id="nutrientDemand"
          name="nutrientDemand"
          type="range"
          min="1"
          max="3"
          step="1"
          defaultValue="2"
          required
        />
        <RangeInputLabels>
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </RangeInputLabels>
      </Fieldset>
      <FieldsetLabel htmlFor="frostSensitive">Frost Sensitive</FieldsetLabel>
      <Fieldset>
        <RadioButtonGroup>
          <RadioButtonLabel htmlFor="frostSensitive-yes">
            Yes
            <RadioButton
              id="frostSensitive-yes"
              name="frostSensitive"
              type="radio"
              value="true"
            />
          </RadioButtonLabel>
          <RadioButtonLabel htmlFor="frostSensitive-no">
            No
            <RadioButton
              id="frostSensitive-no"
              name="frostSensitive"
              type="radio"
              value="false"
              defaultChecked
            />
          </RadioButtonLabel>
        </RadioButtonGroup>
      </Fieldset>
      <ButtonGroup>
        <StyledButton type="button" onClick={onDismiss}>
          Dismiss
        </StyledButton>
        <StyledButton type="submit">Save</StyledButton>
      </ButtonGroup>
    </FormContainer>
  );
}
