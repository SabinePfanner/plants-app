import styled from "styled-components";
import { useState } from "react";
import {
  VisuallyHidden,
  CustomFileInputButton,
  StyledIconText,
} from "@/components/Form";
import { StyledButton, ButtonGroup } from "@/components/StyledElements/Buttons";
import SvgIcon from "@/components/StyledElements/SvgIcon";

export default function ImagesForm({ onAddImages }) {
  const [showFileInput, setShowFileInput] = useState(false);
  const [numberFilesSelected, setNumberFilesSelected] = useState();
  const [selectedImages, setSelectedImages] = useState();
  const [loading, setLoading] = useState(false);

  // Function to handle file input change
  function handleImageUpload(event) {
    const files = event.target.files;
    if (files) {
      setSelectedImages(files);
      setNumberFilesSelected(Object.keys(files).length);
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

    const response = await fetch("/api/upload/detailsImages", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    const { images } = await response.json();

    console.log("Images: ", images);

    const imagesArray = images.map((image) => {
      return [image.url, image.height, image.width];
    });
    setNumberFilesSelected();
    onAddImages(imagesArray);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <VisuallyHidden
        type="file"
        name="image"
        id="fileInput"
        accept="image/*"
        onChange={handleImageUpload}
        multiple
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
        <SvgIcon variant="upload" max-height="80" max-width="80"></SvgIcon>
        <StyledIconText>Click to upload</StyledIconText>
      </CustomFileInputButton>
      {numberFilesSelected && (
        <>
          <div>
            {numberFilesSelected &&
              `${numberFilesSelected} ${numberFilesSelected > 1 ? "files selected" : "file selected"}`}{" "}
          </div>
          <StyledButton type="submit" disabled={loading}>
            Upload images
          </StyledButton>
          <StyledButton
            type="button"
            onClick={() => {
              setNumberFilesSelected(), setSelectedImages();
            }}
          >
            Cancel upload
          </StyledButton>
        </>
      )}
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;


const StyledInput = styled.input`
  padding: 8px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #0056b3;
    outline: none;
  }
`;
