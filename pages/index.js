import CardList from "@/components/CardList.js";
import { SvgLinkButton } from "@/components/StyledElements/CreateEditDelete";

export default function HomePage({ plants, favoriteIDs, onToggleFavorite }) {
  return (
    <>
      <h1>Discover the hottest crops!</h1>
      <CardList
        plants={plants}
        favoriteIDs={favoriteIDs}
        onToggleFavorite={onToggleFavorite}
      />
      <SvgLinkButton
        href="/create"
        variant="plus"
        color="#E23D28"
      />
    </>
  );
}
