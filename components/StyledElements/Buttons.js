import styled from "styled-components";

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
`;

export const StyledButton = styled.button`
  background-color: var(--primary-light);
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 5.5rem;
  font-weight: 700;
  border: 2px solid var(--primary-dark);
  color: var(--primary-contrast);
  margin: 1rem 0.5rem 1rem 0.5rem;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const StyledButtonCancel = styled.button`
  background-color: var(--secondary-light-200);
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 5.5rem;
  font-weight: 700;
  border: 2px solid var(--secondary-light);
  color: var(--primary-contrast);
  margin: 1rem 0.5rem 1rem 0.5rem;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
