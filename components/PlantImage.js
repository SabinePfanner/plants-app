import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

const PlantImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  ${(props) =>
    props.$location !== "/[id]" &&
    `&:hover {
    cursor: pointer;
  }`}
`;

export default function PlantImage({ image, id, height = 150, width = 250 }) {
  const router = useRouter();
  const location = router.pathname;

  return (
    <PlantImageContainer>
      <Link href={`/${id}`} legacyBehavior>
        <StyledImage
          src={!image ? "/images/chili.jpg" : image}
          alt={"Image of plant"}
          width={width}
          height={height}
          $location={location}
        ></StyledImage>
      </Link>
    </PlantImageContainer>
  );
}
