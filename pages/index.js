import CardList from "@/components/CardList.js";
import { SvgLinkButton } from "@/components/StyledElements/CreateEditDelete";
import useSWR from "swr";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function HomePage({
  favoriteIDsLocal,
  favoriteIDsOwner,
  onToggleFavorite,
}) {
  const [filter, setFilter] = useState({
    cropType: [],
    placement: [],
    growingConditions: [],
    owner: [],
  });

  const { status } = useSession();
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

  function toggleFilter(category, option) {
    setFilter((prevFilters) => {
      // if it's in, remove
      const newCategoryFilters = prevFilters[category].includes(option)
        ? prevFilters[category].filter((item) => item !== option)
        : [...prevFilters[category], option];
      return { ...prevFilters, [category]: newCategoryFilters };
    });
  }

  function resetFilter() {
    setFilter({
      cropType: [],
      placement: [],
      growingConditions: [],
      owner: [],
    });
  }

  return (
    <>
      <h1>Discover the hottest crops!</h1>
      <CardList
        plants={plants}
        favoriteIDsLocal={favoriteIDsLocal}
        favoriteIDsOwner={favoriteIDsOwner}
        onToggleFavorite={onToggleFavorite}
        onToggleFilter={toggleFilter}
        onResetFilter={resetFilter}
        filter={filter}
        session={status === "authenticated"}
      />
      <SvgLinkButton href="/create" variant="plus" color="var(--secondary)" />
    </>
  );
}
