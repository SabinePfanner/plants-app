import { useSession, signIn } from "next-auth/react";
import SvgIcon from "./StyledElements/SvgIcon";
import styled from "styled-components";

export const StyledLoginButton = styled.button`
  position: absolute;
  right: 0;
  top: 5px;
  background: transparent;
  border: none;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default function Login({ onOpenModal }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <StyledLoginButton onClick={onOpenModal}>
        <SvgIcon variant="logout" size="25" color="var(--primary-contrast)" />
      </StyledLoginButton>
    );
  }
  return (
    <StyledLoginButton onClick={() => signIn()}>
      <SvgIcon variant="login" size="25" color="var(--primary-contrast)" />
    </StyledLoginButton>
  );
}
