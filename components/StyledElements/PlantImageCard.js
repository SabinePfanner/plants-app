import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import SvgIcon from "@/components/StyledElements/SvgIcon";
import { useRouter } from "next/router";

const PlantImageContainer = styled.div`
  height: 150px;
  width: 200px;
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

export default function PlantImageCard({
  image,
  isFavorite,
  onToggleFavorite,
  id,
  session,
}) {
  const router = useRouter();
  const location = router.pathname;

  return (
    <PlantImageContainer>
      <Link href={`/${id}`} legacyBehavior>
        <StyledImage
          src={!image ? "/icons/placeholder.jpg" : image}
          alt={"Image of plant"}
          $location={location}
          fill
          sizes="100%"
          priority={true}
          style={{
            objectFit: "cover",
          }}
        ></StyledImage>
      </Link>
      <StyledFavoriteButton onClick={() => onToggleFavorite(id, session)}>
        <SvgIcon
          variant="chili"
          color={isFavorite ? "var(--secondary)" : "var(--primary)"}
        />
      </StyledFavoriteButton>
    </PlantImageContainer>
  );
}
