import { StyledImage } from "./image.js";
import styled from "styled-components";

const Figure = styled.figure`
  margin: 1rem;
`;

export function Card({ image, name, cropType }) {
  return (
    <article>
      <Figure>
        <StyledImage src={image} alt={name} width={150} height={150} />
        <figcaption>{`${name} -- ${cropType}`}</figcaption>
      </Figure>
    </article>
  );
}
