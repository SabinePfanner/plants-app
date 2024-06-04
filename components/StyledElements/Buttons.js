import styled from "styled-components";

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const StyledButton = styled.button`
  background-color: var(--color-green);
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 5.5rem;
  font-weight: bold;
  border: 2px solid green;
  margin: 1rem 0.5rem 1rem 0.5rem;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
