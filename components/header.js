import styled from "styled-components";

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
  height: 200px;
`;

const Headline = styled.h1`
  text-align: center;
  font-size: 1.5rem;
`;

export default function Header() {
  return (
    <>
      <HeaderContainer>
        <Logo src="/images/logo.png" alt="App Logo Crop it" />
      </HeaderContainer>
      <Headline>Discover the hottest crops!</Headline>
    </>
  );
}
