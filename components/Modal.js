import { useState, useEffect } from "react";
import { Background } from "@/components/ModalStyles/Background";
import { ModalBox } from "@/components/ModalStyles/ModalBox";
import {
  ModalContent,
  ModalInfo,
} from "@/components/ModalStyles/ModalContentAndInfo";
import { StyledButton } from "@/components/Buttons";
import ToastMessage from "@/components/ToastMessage";

export default function Modal({
  confirmButtonLabel,
  modalInfoText,
  toastMessageText,
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isActionConfirmed, setActionConfirmed] = useState(false);

  isModalOpen || isActionConfirmed
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  function handleCancel() {
    setIsModalOpen(false);
  }

  function handleConfirm() {
    setActionConfirmed(true);
    setIsModalOpen(false);
  }

  useEffect(() => {
    let timeoutId;
    if (isActionConfirmed) {
      timeoutId = setTimeout(() => {
        setActionConfirmed(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isActionConfirmed]);

  return (
    <>
      {isModalOpen && (
        <Background>
          <ModalBox $isActionConfirmed={isActionConfirmed}>
            <ModalContent>
              <ModalInfo>{modalInfoText}</ModalInfo>
              <StyledButton name="cancel" onClick={handleCancel}>
                Cancel
              </StyledButton>
              <StyledButton name="confirm" onClick={handleConfirm}>
                {confirmButtonLabel}
              </StyledButton>
            </ModalContent>
          </ModalBox>
        </Background>
      )}
      {isActionConfirmed && (
        <ToastMessage toastMessageText={toastMessageText} />
      )}
    </>
  );
}
