import styled from "styled-components";
import { useState } from "react";
import {
  VisuallyHidden,
  CustomFileInputButton,
  StyledIconText,
} from "@/components/Form";
import { StyledButton, ButtonGroup } from "@/components/StyledElements/Buttons";
import SvgIcon from "@/components/StyledElements/SvgIcon";

export default function ImagesForm({
  onAddImages,
  onDeleteImages,
  onConfirmDelete,
  imagesPresent,
}) {
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
    <StyledForm onSubmit={handleSubmit} $imagesPresent={imagesPresent}>
      {!imagesPresent && <StyledFormHeader>Your plant diary</StyledFormHeader>}
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
        <StyledIconText>
          {imagesPresent && !numberFilesSelected
            ? "Upload more plant images"
            : !imagesPresent && !numberFilesSelected
            ? "Upload your plant images"
            : `${numberFilesSelected} ${
                numberFilesSelected > 1 ? "files selected" : "file selected"
              }`}
        </StyledIconText>
      </CustomFileInputButton>
      {numberFilesSelected && (
        <>
          {/* <div>
            {numberFilesSelected &&
              `${numberFilesSelected} ${
                numberFilesSelected > 1 ? "files selected" : "file selected"
              }`}
          </div> */}
          <StyledButton type="submit" disabled={loading}>
            {loading ? "Uploading images" : "Upload images"}
          </StyledButton>
          {!loading && (
            <StyledButton
              type="button"
              onClick={() => {
                setNumberFilesSelected(null), setSelectedImages(null);
              }}
            >
              Cancel upload
            </StyledButton>
          )}
        </>
      )}
      {imagesPresent && !loading && !numberFilesSelected && (
        <StyledButton type="button" onClick={onConfirmDelete}>
          Delete images
        </StyledButton>
      )}
    </StyledForm>
  );
}

const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  align-content: center;
  gap: 2rem;
  padding: 2rem;
  /* @media (max-width: 599px) {
    // iPhone SE
    margin: 1.5;
  } */
  margin: ${(props) =>
    props.$imagesPresent
      ? "0rem 1.5rem 7rem 1.5rem;"
      : "4rem 1.5rem 7rem 1.5rem;"};
  /* border: 0.1rem solid var(--primary-light-contrast); */
  border-radius: 0.5rem;
  border: ${(props) =>
    !props.$imagesPresent
      ? "0.1rem solid var(--primary-light-contrast)"
      : "none"};
`;

const StyledFormHeader = styled.div`
  position: absolute;
  left: 1rem;
  top: -1rem;
  background: white;
  font-size: 0.9rem;
  padding: 0.2rem 0.8rem;
  border-radius: 0.5rem;
  border: 0.1rem solid var(--primary-light-contrast);
`;
