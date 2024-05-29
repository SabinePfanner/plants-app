import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;

  align-items: center;
  background-color: var(--color-green);
`;

const Logo = styled.img`
  height: 200px;
`;

const Headline = styled.h1`
  text-align: center;
  font-size: 1.5rem;
`;

const StyledLink = styled(Link)`
  height: 50px;
  place-self: start start;
`;

export default function Header() {
  return (
    <>
      <HeaderContainer>
        <StyledLink href="/">Back</StyledLink>
        <Logo src="/icons/logo.png" alt="App Logo Crop it" />
      </HeaderContainer>
      <Headline>Discover the hottest crops!</Headline>
    </>
  );
}
