import styled from "styled-components";
import Login from "./Login";
import { StyledLoginButton } from "./Login";

const HeaderContainer = styled.header`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #79af6e;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  height: 75px;
  margin-left: auto;
`;

const PositionLogin = styled.section`
  margin-left: auto;
  align-self: flex-start;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Logo src="/icons/logo.png" alt="App Logo Crop it" />
      <PositionLogin>
        <Login />
      </PositionLogin>
    </HeaderContainer>
  );
}
