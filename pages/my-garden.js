import CardList from "@/components/CardList";

export default function MyGarden({ plants, favoriteIDs, onToggleFavorite }) {
  const favoritePlants = plants.filter((plant) =>
    favoriteIDs.includes(plant._id)
  );

  return (
    <>
      <CardList
        plants={favoritePlants}
        favoriteIDs={favoriteIDs}
        onToggleFavorite={onToggleFavorite}
      />
    </>
  );
}
