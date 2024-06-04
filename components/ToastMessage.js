import { Background } from "@/components/ModalStyles/Background";
import { ModalBox } from "@/components/ModalStyles/ModalBox.js";
import {
  ModalContent,
  ModalInfo,
} from "@/components/ModalStyles/ModalContentAndInfo";

export default function ToastMessage({ toastMessageText }) {
  return (
    <Background>
      <ModalBox $isActionConfirmed={true}>
        <ModalContent>
          <ModalInfo>{toastMessageText}</ModalInfo>
        </ModalContent>
      </ModalBox>
    </Background>
  );
}
