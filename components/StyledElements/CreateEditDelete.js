import styled from "styled-components";
import SvgIcon from "@/components/StyledElements/SvgIcon";
import Link from "next/link";

const StyledLink = styled(Link)`
  position: fixed;
  width: 2.5rem;
  height: 2.5rem;
  right: 1rem;
  bottom: 6.5rem;
  background: transparent;
  border: none;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    title: "createCrop";
  }
`;

export default function CreateNewPlantButton() {
  return (
    <>
      <StyledLink href="/create">
        <SvgIcon variant={"plus"} color={"#E23D28"} title={"createCrop"} />
      </StyledLink>
    </>
  );
}
