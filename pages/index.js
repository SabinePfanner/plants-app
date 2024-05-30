import CardList from "@/components/CardList.js";

export default function HomePage({ plants, favoriteIDs, onToggleFavorite }) {
  return (
    <>
      <h1>Discover the hottest crops!</h1>
      <CardList
        plants={plants}
        favoriteIDs={favoriteIDs}
        onToggleFavorite={onToggleFavorite}
      />
    </>
  );
}
