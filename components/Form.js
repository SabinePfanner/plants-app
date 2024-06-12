import styled, { css } from "styled-components";
import { StyledButton, ButtonGroup } from "@/components/StyledElements/Buttons";
import { RadioButton } from "@/components/StyledElements/RadioButton";
import { RangeInput } from "@/components/StyledElements/RangeSlider";
import { CustomSelect } from "@/components/StyledElements/Select";
import { useState } from "react";
import Image from "next/image";

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

const StyledFileInput = styled(Input).attrs({
  type: "file",
})`
  padding: 8px;
  border: none;
  &:focus {
    border-color: #0056b3;
    outline: none;
  }
`;

const StyledImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
`;

// Values for custom select components used in form
const cropTypes = ["Fruit", "Herb", "Vegetable", "Other"];
const placements = ["Bed", "Pot", "Pot or Bed"];
const growingConditions = ["Sunny", "Partial Shade"];

export default function Form({
  onSubmit,
  onDismiss,
  submitButtonText = "Save",
  cancelButtonText = "Dismiss",
  data = {
    name: null,
    botanicalName: null,
    cropType: null,
    image: null,
    growingConditions: null,
    placement: null,
    perennial: false,
    frostSensitive: true,
    waterDemand: 2,
    nutrientDemand: 2,
  },
}) {
  // Select Crop Type

  const [currentCropType, setCurrentCropType] = useState(data.cropType);

  function handleCropTypeChange(value) {
    setCurrentCropType(value);
  }

  // Select Placement

  const [currentPlacement, setCurrentPlacement] = useState(data.placement);

  function handlePlacementChange(value) {
    setCurrentPlacement(value);
  }

  // Select Growing Conditions

  const [currentGrowingConditions, setCurrentGrowingConditions] = useState(
    data.growingConditions
  );

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

  const [image, setImage] = useState(null);

  function handleImageChange(event) {
    const file = event.target.files[0];
    setImage(file || null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const { url } = await response.json();

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
      formData.set("image", url);
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
        defaultValue={data.name}
        required
      />
      <Label htmlFor="botanicalName">Botanical name</Label>
      <Input
        id="botanicalName"
        name="botanicalName"
        type="text"
        minLength="1"
        maxLength="75"
        defaultValue={data.botanicalName}
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
      <Label htmlFor="image">Image</Label>
      <StyledFileInput
        name="image"
        id="image"
        accept="image/*"
        required
        onChange={handleImageChange}
      />
      {image ? (
        <StyledImageWrapper>
          <Image
            src={URL.createObjectURL(image)}
            alt="Preview of the image to upload"
            sizes="300px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </StyledImageWrapper>
      ) : (
        <StyledImageWrapper>
          <Image
            src={data.image}
            alt="Preview of the image to upload"
            sizes="300px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </StyledImageWrapper>
      )}
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
              defaultChecked={data.perennial}
            />
          </RadioButtonLabel>
          <RadioButtonLabel htmlFor="perennial-no">
            No
            <RadioButton
              id="perennial-no"
              name="perennial"
              type="radio"
              value="false"
              defaultChecked={!data.perennial}
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
          defaultValue={data.waterDemand}
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
          defaultValue={data.nutrientDemand}
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
              defaultChecked={data.frostSensitive}
            />
          </RadioButtonLabel>
          <RadioButtonLabel htmlFor="frostSensitive-no">
            No
            <RadioButton
              id="frostSensitive-no"
              name="frostSensitive"
              type="radio"
              value="false"
              defaultChecked={!data.frostSensitive}
            />
          </RadioButtonLabel>
        </RadioButtonGroup>
      </Fieldset>
      <ButtonGroup>
        <StyledButton type="button" onClick={onDismiss}>
          {cancelButtonText}
        </StyledButton>
        <StyledButton type="submit">{submitButtonText}</StyledButton>
      </ButtonGroup>
    </FormContainer>
  );
}
