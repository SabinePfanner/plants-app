import { Background } from "@/components/ModalAndToast/ModalStyles/Background.js";
import { ModalBox } from "@/components/ModalAndToast/ModalStyles/ModalBox.js";
import {
  ModalContent,
  ModalInfo,
} from "@/components/ModalAndToast/ModalStyles/ModalContentAndInfo.js";
import { useEffect } from "react";

export default function ToastMessage({ toastSettings, onCloseToast }) {
  console.log(toastSettings);
  useEffect(() => {
    let timeoutId;

    if (toastSettings.isOpen) {
      timeoutId = setTimeout(() => {
        onCloseToast();
      }, toastSettings.duration);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [toastSettings.isOpen, toastSettings.duration, onCloseToast]);

  if (toastSettings.isOpen) {
    return (
      <Background>
        <ModalBox $isActionConfirmed={true}>
          <ModalContent>
            <ModalInfo>{toastSettings.toastMessage}</ModalInfo>
          </ModalContent>
        </ModalBox>
      </Background>
    );
  }
}
