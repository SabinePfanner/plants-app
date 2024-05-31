import { Background } from "@/components/ModalStyles/Background.js";
import { ModalBox } from "@/components/ModalStyles/ModalBox.js";
import {
  ModalContent,
  ModalInfo,
} from "@/components/ModalStyles/ModalContentAndInfo.js";

export default function ToastMessage({ toastMessageText }) {
  return (
    <>
      <Background>
        <ModalBox $isActionConfirmed={true}>
          <ModalContent>
            <ModalInfo>{toastMessageText}</ModalInfo>
          </ModalContent>
        </ModalBox>
      </Background>
    </>
  );
}
