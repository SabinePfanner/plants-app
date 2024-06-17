import styled from "styled-components";

export const RadioButton = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #000;
  border-radius: 50%;
  margin: 0 0.5rem;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    margin: 0.065rem;
  }
  &:checked::after {
    background-color: var(--primary);
  }
`;
