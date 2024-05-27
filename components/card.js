import { StyledImage } from "./image.js";
import styled from "styled-components";

const Article = styled.article`
  padding: 0.5rem;
`;

const Figure = styled.figure`
  position: relative;
  margin: 0;
`;

export function Card({ image, name, cropType }) {
  return (
    <Article>
      <Figure>
        <StyledImage src={image} alt={name} width={100} height={100} />
        <figcaption>{`${name} ${cropType}`}</figcaption>
      </Figure>
    </Article>
  );
}
