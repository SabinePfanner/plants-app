import { Card } from "./card";
import useSWR from "swr";

export default function CardList() {
  const { data: plants, error, isLoading } = useSWR("/api/plants");

  if (error) {
    return <p>Could not fetch data!</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!plants) {
    return;
  }

  return (
    <>
      <ul>
        {plants.map((plant) => {
          return (
            <li key={plant._id}>
              <Card
                name={plant.name}
                cropType={plant.cropType}
                image={plant.image}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
