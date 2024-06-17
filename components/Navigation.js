import Link from "next/link";
import styled from "styled-components";

const StyledNav = styled.nav`
  padding: 1rem;
  position: absolute;
  width: 100%;
`;

const StyledList = styled.ul`
  list-style: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  justify-self: center;
  text-decoration: none;
  color: var(--primary-contrast);
  &:hover {
    color: white;
  }
`;

export default function Navigation() {
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
