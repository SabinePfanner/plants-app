import { Background } from "@/components/ModalAndToast/ModalStyles/Background";
import { ModalBox } from "@/components/ModalAndToast/ModalStyles/ModalBox";
import {
  ModalContent,
  ModalInfo,
} from "@/components/ModalAndToast/ModalStyles/ModalContentAndInfo";
import {
  StyledButton,
  StyledButtonCancel,
  ButtonGroup,
} from "@/components/StyledElements/Buttons";

export default function Modal({ modalSettings, onCloseModal }) {
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
              <StyledButtonCancel
                name="cancel"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </StyledButtonCancel>
              <StyledButton
                name="confirm"
                type="button"
                onClick={modalSettings.onClick}
              >
                {modalSettings.confirmButtonLabel}
              </StyledButton>
            </ButtonGroup>
          </ModalContent>
        </ModalBox>
      </Background>
    );
}
