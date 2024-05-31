import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import SvgIcon, { icons } from "@/components/SvgIcon";
import { useRouter } from "next/router";

const PlantImageContainer = styled.div`
  position: relative;
`;

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  ${(props) =>
    props.$location !== "/[id]" &&
    `&:hover {
    cursor: pointer;
  }`}
`;

const StyledFavoriteButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  right: -0.5rem;
  top: -1.5rem;
  background: transparent;
  border: none;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default function PlantImage({
  image,
  isFavorite,
  onToggleFavorite,
  id,
  height = 150,
  width = 150,
}) {
  const router = useRouter();
  const location = router.pathname;

  return (
    <PlantImageContainer>
      <Link href={`/${id}`} legacyBehavior>
        <StyledImage
          src={image}
          alt={"Image of plant"}
          width={width}
          height={height}
          $location={location}
        ></StyledImage>
      </Link>
      <StyledFavoriteButton onClick={() => onToggleFavorite(id)}>
        <SvgIcon variant={"chili"} color={isFavorite ? "#E23D28" : "#79af6e"} />
      </StyledFavoriteButton>
    </PlantImageContainer>
  );
}
