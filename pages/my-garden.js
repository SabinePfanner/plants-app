import CardList from "@/components/CardList";
import SvgIcon from "@/components/StyledElements/SvgIcon";
import { SvgLinkButton } from "@/components/StyledElements/CreateEditDelete";
import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";

const StyledInfo = styled.p`
  margin-top: -25px;
  margin-bottom: 20px;
  font-size: 0.7rem;
  text-align: center;
  color: #ffb53c;
`;

export default function MyGarden({ favoriteIDs, onToggleFavorite }) {
  const [filter, setFilter] = useState({
    cropType: [],
    placement: [],
    growingConditions: [],
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

  const favoritePlants = plants.filter((plant) =>
    favoriteIDs.includes(plant._id)
  );

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
    });
  }

  return (
    <>
      <h1>Your hottest crops!</h1>
      <br />
      <StyledInfo>
        Please note: Your favourite crops are only saved for this session!
      </StyledInfo>
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
          onToggleFilter={toggleFilter}
          onResetFilter={resetFilter}
          filter={filter}
        />
      )}
      <SvgLinkButton href="/create" variant="plus" color="#E23D28" />
    </>
  );
}
