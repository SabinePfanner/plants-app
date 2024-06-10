import Card from "@/components/Card";
import styled from "styled-components";

const StyledListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  width: 100%;
  gap: 1rem;
`;

const StyledListElement = styled.li`
  flex: 1 1 calc(50% - 1rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
  @media (max-width: 768px) {
    flex: 1 1 calc(100% - 1rem);
  }

  @media (max-width: 375px) {
    // iPhone SE
    flex: 1 1 calc(100% - 0.5rem);
    margin: 0.25rem;
  }

  @media (min-width: 1024px) {
    // Desktop (3-column layout)
    flex: 1 1 calc(33.33% - 1rem);
  }

  @media (min-width: 1440px) {
    // Larger screen (4-column layout)
    flex: 1 1 calc(25% - 1rem);
  }
`;

export default function CardList({ plants, favoriteIDs, onToggleFavorite }) {
  return (
    <StyledListContainer>
      <StyledList>
        {plants.map((plant) => {
          return (
            <StyledListElement key={plant._id}>
              <Card
                name={plant.name}
                cropType={plant.cropType}
                image={plant.image}
                isFavorite={favoriteIDs.includes(plant._id)}
                onToggleFavorite={onToggleFavorite}
                id={plant._id}
              />
            </StyledListElement>
          );
        })}
      </StyledList>
    </StyledListContainer>
  );
}
