import { useState, useEffect } from "react";
import { Background } from "@/components/ModalAndToast/ModalStyles/Background";
import { ModalBox } from "@/components/ModalAndToast/ModalStyles/ModalBox";
import {
  ModalContent,
  ModalInfo,
} from "@/components/ModalAndToast/ModalStyles/ModalContentAndInfo";
import { StyledButton, ButtonGroup } from "@/components/StyledElements/Buttons";
import ToastMessage from "@/components/ModalAndToast/ToastMessage";

export default function Modal({
  confirmButtonLabel,
  modalInfoText,
  toastMessageText,
  onModalOpen,
}) {
  const [actionConfirmed, setActionConfirmed] = useState(false);

  function handleCancel() {
    onModalOpen();
  }

  function handleConfirm() {
    setActionConfirmed(true);
  }

  useEffect(() => {
    let timeoutId;
    if (actionConfirmed) {
      timeoutId = setTimeout(() => {
        setActionConfirmed(false);
        onModalOpen();
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [actionConfirmed, onModalOpen]);

  return (
    <>
      <Background>
        <ModalBox $isActionConfirmed={actionConfirmed}>
          <ModalContent>
            <ModalInfo>{modalInfoText}</ModalInfo>
            <ButtonGroup>
              <StyledButton name="cancel" type="button" onClick={handleCancel}>
                Cancel
              </StyledButton>
              <StyledButton
                name="confirm"
                type="button"
                onClick={handleConfirm}
              >
                {confirmButtonLabel}
              </StyledButton>
            </ButtonGroup>
          </ModalContent>
        </ModalBox>
      </Background>
      {actionConfirmed && <ToastMessage toastMessageText={toastMessageText} />}
    </>
  );
}
