import styled from "styled-components";

export const ModalBox = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 12rem;
  width: 14rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.$isActionConfirmed ? `var(--success-background)` : `#eee`};
  border: 2px solid var(--success-border);
  border-radius: 0.5rem;
`;
