import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledNav = styled.nav`
  padding: 1rem;
  position: absolute;
  width: 100%;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-around;
  position: relative;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: white;
  }
  justify-self: center;
`;

export default function Navigation() {
  const router = useRouter();
  return (
    <>
      <StyledNav>
        <StyledList>
          <li>
            <StyledLink href="/">Home</StyledLink>
          </li>
          <li>
            <StyledLink href="/my-garden">My Garden</StyledLink>
          </li>
        </StyledList>
      </StyledNav>
    </>
  );
}