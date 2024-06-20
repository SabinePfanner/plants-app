import styled from "styled-components";
import SvgIcon from "@/components/StyledElements/SvgIcon";
import Link from "next/link";

const StyledLink = styled(Link)`
  position: fixed;
  //width: 0;
  //height: 2.5rem;
  display: flex;
  align-items: center;
  right: ${(props) => (props.$right ? props.$right : "1rem")};
  bottom: ${(props) => (props.$bottom ? props.$bottom : "6.5rem")};
  background: white;
  border: 0;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export function SvgLinkButton({ href, variant, color, right, bottom }) {
  return (
    <>
      <StyledLink href={href} $right={right} $bottom={bottom}>
        <SvgIcon variant={variant} color={color} />
      </StyledLink>
    </>
  );
}

const StyledButton = styled.button`
  position: fixed;
  //width: 0;
  //height: 2.5rem;
  /* display: flex;
  align-items: center; */
  right: 1rem;
  bottom: 6.5rem;
  background: white;
  border: 0;
  border-radius: 50%;
  padding: 0;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export function DeletePlantButton({ type, onClick }) {
  return (
    <>
      <StyledButton type={type} onClick={onClick}>
        <SvgIcon
          variant="trashCan"
          color="var(--secondary)"
          title="deleteCrop"
        />
      </StyledButton>
    </>
  );
}
