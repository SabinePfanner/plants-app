import styled from "styled-components";
import Navigation from "@/components/Navigation";

const StyledFooter = styled.footer`
  background-color: #79af6e;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Navigation />
    </StyledFooter>
  );
}
