import { Card } from "./card";
import useSWR from "swr";

export default function CardList() {
  const { data: plants, error, isLoading } = useSWR("/api/plants");
  console.log("plants in cardList: ", plants);

  if (error) {
    return <p>Could not fetch data!</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!plants) {
    return;
  }

  console.log("plants in cardList: ", plants);

  return (
    <>
      <ul>
        {plants.map((plant) => {
          console.log(plant);
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
