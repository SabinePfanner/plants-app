import CardList from "@/components/CardList.js";
import { CreateNewPlantButton } from "@/components/StyledElements/CreateEditDelete";
import useSWR from "swr";

export default function HomePage({ favoriteIDs, onToggleFavorite }) {
  const { data: plants, error, isLoading } = useSWR(`/api/plants`);

  if (error) {
    return <p>Could not fetch data!</p>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!plants) {
    return;
  }

  return (
    <>
      <h1>Discover the hottest crops!</h1>
      <CardList
        plants={plants}
        favoriteIDs={favoriteIDs}
        onToggleFavorite={onToggleFavorite}
      />
      <CreateNewPlantButton />
    </>
  );
}
