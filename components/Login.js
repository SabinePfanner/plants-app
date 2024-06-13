import { useSession, signIn, signOut } from "next-auth/react";
import SvgIcon from "./StyledElements/SvgIcon";
import styled from "styled-components";

export const StyledLoginButton = styled.button`
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
        <SvgIcon variant="logout" size="30" color="#1D0B07" />
      </StyledLoginButton>
    );
  }
  return (
    <StyledLoginButton onClick={() => signIn()}>
      <SvgIcon variant="login" size="30" color="#1D0B07" />
    </StyledLoginButton>
  );
}
