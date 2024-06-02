import styled, { css } from "styled-components";
import { StyledButton, ButtonGroup } from "@/components/StyledElements/Buttons";
import { RadioButton } from "@/components/StyledElements/RadioButton";
import { RangeInput } from "@/components/StyledElements/RangeSlider";
import { CustomSelect } from "@/components/StyledElements/Select";

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

const cropTypes = ["Fruit", "Herb", "Vegetable", "Other"];
const placements = ["Bed", "Pot", "Pot or Bed"];
const growingConditions = ["Sunny", "Partial Shade"];

export default function Form({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
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
        required
        values={cropTypes}
        defaultValue="Select the crop type &darr;"
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
        required
        values={placements}
        defaultValue="Select the preferred placement &darr;"
      />
      <Label htmlFor="growingConditions">Growing conditions</Label>
      <CustomSelect
        id="growingConditions"
        name="growingConditions"
        required
        values={growingConditions}
        defaultValue="Select the preferred conditions &darr;"
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
        <StyledButton type="reset">Dismiss</StyledButton>
        <StyledButton type="submit">Save</StyledButton>
      </ButtonGroup>
    </FormContainer>
  );
}
