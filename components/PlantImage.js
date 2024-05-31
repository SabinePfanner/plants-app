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
  position: relative;
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
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  right: -0.5rem;
  top: -1.5rem;
  z-index: 100;
  background: transparent;
  border: none;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const StyledFavoriteIcon = styled(SvgIcon)`
  position: absolute;
  z-index: 100;
`;

export default function PlantImage({
  image,
  isFavorite,
  onToggleFavorite,
  id,
  height=150,
  width=150
}) {
  const router = useRouter();
  const location = router.pathname;

  return (
    <PlantImageContainer>
      <StyledFavoriteButton onClick={() => onToggleFavorite(id)}>
        <StyledFavoriteIcon
          variant={"chili"}
          color={isFavorite ? "#E23D28" : "#79af6e"}
        />
      </StyledFavoriteButton>
      <Link href={`/${id}`} legacyBehavior>
        <StyledImage
          src={image}
          alt={"Image of plant"}
          width={width}
          height={height}
          $location={location}
        ></StyledImage>
      </Link>
    </PlantImageContainer>
  );
}
