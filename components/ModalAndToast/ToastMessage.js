import { Background } from "@/components/ModalAndToast/ModalStyles/Background.js";
import { ModalBox } from "@/components/ModalAndToast/ModalStyles/ModalBox.js";
import {
  ModalContent,
  ModalInfo,
} from "@/components/ModalAndToast/ModalStyles/ModalContentAndInfo.js";

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
