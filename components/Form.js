import styled, { css } from "styled-components";
import { StyledButton, ButtonGroup } from "@/components/StyledElements/Buttons";
import { RadioButton } from "@/components/StyledElements/RadioButton";
import { RangeInput } from "@/components/StyledElements/RangeSlider";
import { CustomSelect } from "@/components/StyledElements/Select";
import TaskPeriod from "@/components/TaskPeriod";
import { useState } from "react";
import Image from "next/image";
import SvgIcon from "@/components/StyledElements/SvgIcon";

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

const StyledPeriodSubheader = styled.span`
  font-size: 1rem;
  font-weight: normal;
`;

const VisuallyHidden = styled.input`
  position: absolute;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
  white-space: nowrap;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 5px;
  gap: 4rem;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledImageWrapper = styled.div`
  min-width: 100px;
  min-height: 100px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
  border-radius: 0.5rem;
`;

const CustomFileInputButton = styled.label`
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  display: inline-block;
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    outline: 2px solid black;
    border-radius: 0.5rem;
    padding: 1px;
  }
`;

const StyledImageButton = styled.button`
  text-align: center;
  border: none;
  background-color: #fff;
  cursor: pointer;
  display: inline-block;
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    outline: 2px solid black;
  }
`;

const StyledIconText = styled.p`
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #333;
`;

const IconWithTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    image: "/icons/placeholder.png",
    growingConditions: null,
    placement: null,
    perennial: false,
    frostSensitive: true,
    waterDemand: 2,
    nutrientDemand: 2,
    tasks: {
      seed: { start: null, end: null },
    },
  },
  isEditImage = true,
  onCreatePage,
}) {
  const [editImage, setEditImage] = useState(isEditImage);
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

  // Seed period
  const [seedPeriod, setSeedPeriod] = useState({
    seed: { start: null, end: null },
  });

  function handleSeedPeriod(period) {
    setSeedPeriod(period);
  }

  function checkSelectInput(input, name) {
    if (!input) {
      return `Select the preferred ${name} ↓`;
    } else {
      return input;
    }
  }

  const [image, setImage] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [showFileInput, setShowFileInput] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle file input change
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setSelectedName(file.name);
      setShowFileInput(false); // Hide the file input after selecting a file
    }
  }

  // Function to handle button click
  function handleFileInputButtonClick(event) {
    event.preventDefault(); // Ensure default behavior is prevented
    // Programmatically click the hidden file input
    document.getElementById("fileInput").click();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    setLoading(true);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    setLoading(false);

    const { url } = await response.json();

    // Handle custom selects: if not null, add data to form data, otherwise show a custom alert message
    if (
      currentCropType === null ||
      currentPlacement === null ||
      currentGrowingConditions === null
    ) {
      alert("Please fill out all inputs");
    } else if (seedPeriod.start !== null && seedPeriod.end === null) {
      alert(
        "You have not defined the end of the seed period. Click on the respective time interval to set."
      );
    } else {
      formData.set("cropType", currentCropType);
      formData.set("placement", currentPlacement);
      formData.set("growingConditions", currentGrowingConditions);
      if (editImage) {
        formData.set("image", url);
      } else {
        formData.set("image", data.image);
      }
      const plantData = Object.fromEntries(formData);
      plantData.tasks = seedPeriod; // needs to be inserted here, since it is an object, not a string

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
        maxLength="50"
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
      <Label htmlFor="fileInput">Image</Label>
      <ImageContainer>
        {editImage ? (
          <>
            <VisuallyHidden
              type="file"
              name="image"
              id="fileInput"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />

            <CustomFileInputButton
              htmlFor="fileInput"
              tabIndex="0"
              onClick={handleFileInputButtonClick}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleFileInputButtonClick(event);
                }
              }}
            >
              <SvgIcon
                variant="upload"
                max-height="80"
                max-width="80"
              ></SvgIcon>
              <StyledIconText>Click to upload</StyledIconText>
            </CustomFileInputButton>

            {!onCreatePage && (
              <IconWithTextContainer>
                <StyledImageButton
                  hidden={onCreatePage}
                  type="button"
                  onClick={() => setEditImage(false)}
                >
                  <SvgIcon
                    variant="cancel"
                    max-height="80"
                    max-width="80"
                  ></SvgIcon>
                </StyledImageButton>
                <StyledIconText>Cancel image upload</StyledIconText>
              </IconWithTextContainer>
            )}
          </>
        ) : (
          <IconWithTextContainer>
            <StyledImageButton type="button" onClick={() => setEditImage(true)}>
              <SvgIcon variant="pen" max-height="80" max-width="80"></SvgIcon>
            </StyledImageButton>
            <StyledIconText>Edit image</StyledIconText>
          </IconWithTextContainer>
        )}

        <ImagePreviewContainer>
          <StyledImageWrapper>
            <Image
              src={image ? URL.createObjectURL(image) : data.image}
              alt="Preview of the image to upload"
              sizes="300px"
              fill
              style={{ objectFit: "contain" }}
            />
          </StyledImageWrapper>
          <StyledIconText>{selectedName || "Preview"}</StyledIconText>
        </ImagePreviewContainer>
      </ImageContainer>
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
      <Label htmlFor="seedPeriod">
        Seed period:{" "}
        <StyledPeriodSubheader>
          {seedPeriod.seed.start === null
            ? "click an interval to set period start"
            : seedPeriod.seed.end === null
            ? "click an interval to set period end"
            : `${seedPeriod.seed.start} \u2013 ${seedPeriod.seed.end}`}
        </StyledPeriodSubheader>
      </Label>{" "}
      <TaskPeriod
        task={data.tasks}
        taskName="seed"
        onSeedPeriod={handleSeedPeriod}
        edit={true}
      ></TaskPeriod>
      <ButtonGroup>
        <StyledButton type="button" onClick={onDismiss}>
          {cancelButtonText}
        </StyledButton>
        <StyledButton type="submit" disabled={loading}>
          {submitButtonText}
        </StyledButton>
      </ButtonGroup>
    </FormContainer>
  );
}
