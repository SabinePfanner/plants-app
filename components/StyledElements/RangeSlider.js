import styled from "styled-components";

// element heights
const height = "16px";
const thumbHeight = 16;
const trackHeight = "10px";

// colours
const upperColor = "lightgrey";
const lowerColor = "var(--color-green)";
const upperBackground = `linear-gradient(to bottom, ${upperColor}, ${upperColor}) 100% 50% / 100% ${trackHeight} no-repeat transparent`;
const lowerBackground = `linear-gradient(to bottom, ${lowerColor}, ${lowerColor}) 100% 50% / 100% ${trackHeight} no-repeat transparent`;

// Webkit cannot style progress so we fake it with a long shadow on the thumb element
const makeLongShadow = (color, size) => {
  let i = 1;
  let shadow = `${i}px 0 0 ${size} ${color}`;

  for (; i < 700; i++) {
    shadow = `${shadow}, ${i}px 0 0 ${size} ${color}`;
  }

  return shadow;
};

export const RangeInput = styled.input`
  overflow: hidden;
  appearance: none;
  width: 100%;
  cursor: pointer;
  border-radius: 10px;

  &:focus {
    outline: none;
  }

  // Settings for general browser (e.g. Chrome)

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: ${height};
    background: ${lowerBackground};
    border-radius: 0.5rem;
  }

  &::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    height: ${thumbHeight}px;
    width: ${thumbHeight}px;
    background: ${lowerColor};
    border-radius: 100%;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: ${makeLongShadow(upperColor, "-3px")};
    transition: background-color 150ms;
  }

  // Settings for Mozilla Firefox Browser

  &::-moz-range-track,
  &::-moz-range-progress {
    width: 100%;
    height: ${height};
    background: ${upperBackground};
  }

  &::-moz-range-progress {
    background: ${lowerBackground};
  }

  &::-moz-range-thumb {
    appearance: none;
    margin: 0;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background: ${lowerColor};
    border-radius: 100%;
    border: 0;
    transition: background-color 150ms;
  }

  // Settings for Microsoft Browser (e.g. Edge)

  &::-ms-track {
    width: 100%;
    height: ${height};
    border: 0;
    /* color needed to hide track marks */
    color: transparent;
    background: transparent;
  }

  &::-ms-fill-lower {
    background: ${lowerBackground};
  }

  &::-ms-fill-upper {
    background: ${upperBackground};
  }

  &::-ms-thumb {
    appearance: none;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background: ${lowerColor};
    border-radius: 100%;
    border: 0;
    transition: background-color 150ms;
    /* IE Edge thinks it can support -webkit prefixes */
    top: 0;
    margin: 0;
    box-shadow: none;
  }

  // Settings for hover and focus behaviour for each browser type

  &:hover,
  &:focus {
    &::-webkit-slider-thumb {
      background-color: ${lowerColor};
    }
    &::-moz-range-thumb {
      background-color: ${lowerColor};
    }
    &::-ms-thumb {
      background-color: ${lowerColor};
    }
  }
`;
