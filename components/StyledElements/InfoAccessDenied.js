import styled from "styled-components";
import { StyledButton } from "./Buttons";
import { signIn } from "next-auth/react";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 50px 0;
  align-items: center;
`;

export function InfoAccessDenied({ message }) {
  return (
    <StyledSection>
      <h2>Access denied!</h2>
      <p>Please log in {message}</p>
      <StyledButton type="button" onClick={() => signIn()}>
        Login
      </StyledButton>
    </StyledSection>
  );
}
