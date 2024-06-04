import styled from "styled-components";
import PlantDetails from "@/components/PlantDetails.js";
import Link from "next/link";
import { useRouter } from "next/router";
import ToastMessage from "@/components/ModalAndToast/ToastMessage";
import { useEffect, useState } from "react";

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: black;
`;

export default function DetailsPage({ favoriteIDs, onToggleFavorite }) {
  const router = useRouter();
  const query = router.query;
  const [showToastMessage, setShowToastMessage] = useState(true);

  useEffect(() => {
    let timeoutId;
    if (query.isnew) {
      timeoutId = setTimeout(() => {
        setShowToastMessage(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [query.isnew]);

  return (
    <>
      <StyledLink href="/">←</StyledLink>
      <PlantDetails
        favoriteIDs={favoriteIDs}
        onToggleFavorite={onToggleFavorite}
      />
      {query.isnew && showToastMessage && (
        <ToastMessage toastMessageText="New Crop successfully created" />
      )}
    </>
  );
}
