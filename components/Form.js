import styled, { css } from "styled-components";
import { StyledButton, ButtonGroup } from "@/components/StyledElements/Buttons";
import { RadioButton } from "@/components/StyledElements/RadioButton";
import { RangeInput } from "@/components/StyledElements/RangeSlider";
import { CustomSelect } from "@/components/StyledElements/Select";
import TaskPeriod from "@/components/TaskPeriod";
import { useState } from "react";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  gap: 0.5rem;
  padding: 1rem;
  align-self: center;
  margin: 0 auto;
`;

const labelStyles = css`
  font-weight: 700;
  margin-top: 0.4rem;
  color: var(--primary-contrast);
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
  color: var(--primary-contrast);
`;

const RangeInputLabels = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--primary-contrast);
`;

const StyledPeriodContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 1rem;
`;

const StyledPeriodSubheader = styled.span`
  font-size: 1rem;
  font-weight: normal;
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
    growingConditions: null,
    placement: null,
    perennial: false,
    frostSensitive: true,
    waterDemand: 2,
    nutrientDemand: 2,
    tasks: {
      Seed: { start: null, end: null },
      Cultivation: { start: null, end: null },
      Planting: { start: null, end: null },
      Harvest: { start: null, end: null },
      Pruning: { start: null, end: null },
    },
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

  // Periods
  const [seedPeriod, setSeedPeriod] = useState(data.tasks.Seed);
  const [cultivationPeriod, setCultivationPeriod] = useState(
    data.tasks.Cultivation
  );
  const [plantingPeriod, setPlantingPeriod] = useState(data.tasks.Planting);
  const [harvestPeriod, setHarvestPeriod] = useState(data.tasks.Harvest);
  const [pruningPeriod, setPruningPeriod] = useState(data.tasks.Pruning);

  const definedPeriods = {
    Seed: seedPeriod,
    Cultivation: cultivationPeriod,
    Planting: plantingPeriod,
    Harvest: harvestPeriod,
    Pruning: pruningPeriod,
  };

  function handleSetSeedPeriod(period) {
    setSeedPeriod(period);
  }
  function handleSetCultivationPeriod(period) {
    setCultivationPeriod(period);
  }
  function handleSetPlantingPeriod(period) {
    setPlantingPeriod(period);
  }
  function handleSetHarvestPeriod(period) {
    setHarvestPeriod(period);
  }
  function handleSetPruningPeriod(period) {
    setPruningPeriod(period);
  }

  const periodHandleFunctions = {
    Seed: setSeedPeriod,
    Cultivation: setCultivationPeriod,
    Planting: setPlantingPeriod,
    Harvest: setHarvestPeriod,
    Pruning: setPruningPeriod,
  };

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
      plantData.tasks = definedPeriods; // needs to be inserted here, since it is an object, not a string

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
      <br />
      {Object.keys(data.tasks).map((task) => {
        return (
          <div key={task}>
            <Label htmlFor={task}>
              {task} period:{" "}
              <StyledPeriodSubheader>
                {definedPeriods[task].start === null
                  ? "click an interval to set period start"
                  : definedPeriods[task].end === null
                  ? "click an interval to set period end"
                  : `${definedPeriods[task].start} \u2013 ${definedPeriods[task].end}`}
              </StyledPeriodSubheader>
            </Label>{" "}
            <StyledPeriodContainer>
              <TaskPeriod
                task={data.tasks[task]}
                taskName={task}
                onSetPeriod={periodHandleFunctions[task]}
                edit={true}
                color="#79af6e"
              ></TaskPeriod>
            </StyledPeriodContainer>
          </div>
        );
      })}
      <ButtonGroup>
        <StyledButton type="button" onClick={onDismiss}>
          {cancelButtonText}
        </StyledButton>
        <StyledButton type="submit">{submitButtonText}</StyledButton>
      </ButtonGroup>
    </FormContainer>
  );
}
