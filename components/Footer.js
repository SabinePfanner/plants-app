import styled from "styled-components";
import Link from "next/link";
import SvgIcon from "./StyledElements/SvgIcon";
import { usePathname } from "next/navigation";

const StyledFooter = styled.footer`
  background-color: var(--primary);
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2px;
`;

const StyledLink = styled(Link)`
  background: transparent;
  border: 0;
  padding-bottom: 0;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default function Footer() {
  const pathName = usePathname();

  return (
    <StyledFooter>
      <StyledLink href="/">
        <SvgIcon
          variant="home"
          size="40"
          color={pathName === "/" ? "var(--accent)" : "var(--primary-contrast)"}
        />
      </StyledLink>
      <StyledLink href="/my-garden">
        <SvgIcon
          variant="chili"
          size="30"
          color={
            pathName === "/my-garden"
              ? "var(--accent)"
              : "var(--primary-contrast)"
          }
          title="My Garden Page"
        />
      </StyledLink>
    </StyledFooter>
  );
}
