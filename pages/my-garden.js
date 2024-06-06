import CardList from "@/components/CardList";
import SvgIcon from "@/components/StyledElements/SvgIcon";
import { CreateNewPlantButton } from "@/components/StyledElements/CreateEditDelete";
import useSWR from "swr";

export default function MyGarden({ favoriteIDs, onToggleFavorite }) {
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

  const favoritePlants = plants.filter((plant) =>
    favoriteIDs.includes(plant._id)
  );

  return (
    <>
      <h1>Your hottest crops!</h1>
      <br />
      {favoritePlants.length === 0 ? (
        <h2>
          No plants bookmarked yet.
          <br /> Add crops to your garden by clicking on a plant&apos;s favorite
          button <SvgIcon variant={"chili"} color={"#79af6e"} size={20} />.
        </h2>
      ) : (
        <CardList
          plants={favoritePlants}
          favoriteIDs={favoriteIDs}
          onToggleFavorite={onToggleFavorite}
        />
      )}
      <CreateNewPlantButton />
    </>
  );
}
