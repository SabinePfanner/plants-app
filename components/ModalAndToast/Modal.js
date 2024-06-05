import { Background } from "@/components/ModalAndToast/ModalStyles/Background";
import { ModalBox } from "@/components/ModalAndToast/ModalStyles/ModalBox";
import {
  ModalContent,
  ModalInfo,
} from "@/components/ModalAndToast/ModalStyles/ModalContentAndInfo";
import { StyledButton, ButtonGroup } from "@/components/StyledElements/Buttons";
import { useRouter } from "next/router";

export default function Modal({ modalSettings, onCloseModal, onOpenToast }) {
  const router = useRouter();

  //Close modal and quit action
  function handleCancel() {
    onCloseModal();
  }

  if (modalSettings.isOpen)
    return (
      <Background>
        <ModalBox $isActionConfirmed={false}>
          <ModalContent>
            <ModalInfo>{modalSettings.modalInfoText}</ModalInfo>
            <ButtonGroup>
              <StyledButton name="cancel" type="button" onClick={handleCancel}>
                Cancel
              </StyledButton>
              <StyledButton
                name="confirm"
                type="button"
                onClick={() => {
                  onCloseModal();
                  onOpenToast(modalSettings.toastMessageText);
                  router.push(modalSettings.toastMessageRouter);
                }}
              >
                {modalSettings.confirmButtonLabel}
              </StyledButton>
            </ButtonGroup>
          </ModalContent>
        </ModalBox>
      </Background>
    );
}
