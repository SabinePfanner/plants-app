import PlantImage from "@/components/PlantImage";
import styled from "styled-components";

const Caption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CardContainer = styled.div`
  margin: 1rem;
  padding: 2rem 1.5rem 1rem 1.5rem;
  background-color: #e5e4e2;
  border: transparent;
  border-radius: 0.5rem;
`;

export default function Card({
  image,
  name,
  cropType,
  id,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <CardContainer>
      {/* <Link href={`/${id}`} > */}
      {/* <figure> */}
      <PlantImage
        image={image}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        id={id}
      />
      {/* </figure> */}
      {/* </Link> */}
      <Caption>
        <div>{name}</div> <div>{cropType}</div>
      </Caption>
    </CardContainer>
  );
}
