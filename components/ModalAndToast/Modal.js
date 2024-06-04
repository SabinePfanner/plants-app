import { useState, useEffect } from "react";
import { Background } from "@/components/ModalAndToast/ModalStyles/Background";
import { ModalBox } from "@/components/ModalAndToast/ModalStyles/ModalBox";
import {
  ModalContent,
  ModalInfo,
} from "@/components/ModalAndToast/ModalStyles/ModalContentAndInfo";
import { StyledButton, ButtonGroup } from "@/components/StyledElements/Buttons";
import ToastMessage from "@/components/ModalAndToast/ToastMessage";
import { useRouter } from "next/router";

export default function Modal({
  confirmButtonLabel,
  modalInfoText,
  toastMessageText,
  onModalOpen,
}) {
  //Confirm action and show toast message

  const [actionConfirmed, setActionConfirmed] = useState(false);

  function handleConfirm() {
    setActionConfirmed(true);
  }

  const router = useRouter();

  useEffect(() => {
    let timeoutId;
    if (actionConfirmed) {
      timeoutId = setTimeout(() => {
        setActionConfirmed(false);
        onModalOpen();
        router.push(`/`);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [actionConfirmed, onModalOpen, router]);

  //Quit action
  function handleCancel() {
    onModalOpen();
  }

  return (
    <>
      {!actionConfirmed && (
        <Background>
          <ModalBox $isActionConfirmed={actionConfirmed}>
            <ModalContent>
              <ModalInfo>{modalInfoText}</ModalInfo>
              <ButtonGroup>
                <StyledButton
                  name="cancel"
                  type="button"
                  onClick={handleCancel}
                >
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
      )}
      {actionConfirmed && <ToastMessage toastMessageText={toastMessageText} />}
    </>
  );
}
