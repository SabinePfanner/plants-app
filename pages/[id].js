import styled from "styled-components";
import PlantDetails from "@/components/plantdetails";
import Link from "next/link";
import { useRouter } from "next/router";

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: white;
`;

export default function DetailsPage() {
  return (
    <>
      <h1>Discover more details</h1>
      <StyledLink href="/">←</StyledLink>
      <PlantDetails />
    </>
  );
}
