import CardList from "@/components/CardList.js";
import { SvgLinkButton } from "@/components/StyledElements/CreateEditDelete";
import useSWR from "swr";
import { useState } from "react";
import { getActiveTasksByPlant, months } from "@/utils/TaskPeriodUtils";

export default function HomePage({ favoriteIDs, onToggleFavorite }) {
  const [filter, setFilter] = useState({
    cropType: [],
    placement: [],
    growingConditions: [],
    activePeriods: [],
    owner: [],
  });

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

  const activeTasksByPlant = getActiveTasksByPlant(plants, months);

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
      activePeriods: [],
      owner: [],
    });
  }

  return (
    <>
      <h1>Discover the hottest crops!</h1>
      <CardList
        plants={plants}
        favoriteIDs={favoriteIDs}
        onToggleFavorite={onToggleFavorite}
        onToggleFilter={toggleFilter}
        onResetFilter={resetFilter}
        filter={filter}
        activeTasksByPlant={activeTasksByPlant}
      />
      <SvgLinkButton
        href="/create"
        variant="plus"
        color="var(--secondary)"
        bottom="4.5rem"
      />
    </>
  );
}
