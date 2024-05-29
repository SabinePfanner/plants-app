import Link from "next/link.js";
import { StyledImage } from "./image.js";
import styled from "styled-components";

const Figure = styled.figure`
  margin: 1rem;
`;

export function Card({ image, name, cropType, id }) {
  return (
    <article>
      <Link href={`/${id}`} legacyBehavior>
        <Figure>
          <StyledImage src={image} alt={name} width={150} height={150} />
          <figcaption>{`${name} -- ${cropType}`}</figcaption>
        </Figure>
      </Link>
    </article>
  );
}
