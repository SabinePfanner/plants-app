import CardList from "@/components/CardList.js";
import { CreateNewPlantButton } from "@/components/StyledElements/CreateEditDelete";
import useSWR from "swr";
import { useState } from "react";

export default function HomePage({ favoriteIDs, onToggleFavorite }) {
  // const [filter, setFilter] = useState([]);
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

  // function handleFilter({ title }) {
  //   setFilter((prevSelected) => {
  //     // if it's in, remove
  //     const newArray = [...prevSelected];
  //     if (newArray.includes(title)) {
  //       return newArray.filter((item) => item != title);
  //       // else, add
  //     } else {
  //       newArray.push(title);
  //       return newArray;
  //     }
  //   });
  // }

  // function handleResetFilter() {
  //   setFilter([]);
  // }

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
