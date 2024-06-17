import styled from "styled-components";

/* Tooltip container */
export const StyledTooltipContainer = styled.div`
  position: absolute;
  display: block;
`;

/* Tooltip text */
export const StyledTooltipText = styled.span`
  visibility: visible;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  font-size: 0.75rem;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 70%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }

  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`;
