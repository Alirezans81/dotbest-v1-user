import { ReactNode } from "react";
import {
  ModalDataSetStateType,
  ModalDataType,
  useModalDataSetState,
} from "../providers/ModalProvider";
import {
  ToastDataSetStateType,
  useToastDataSetState,
} from "../providers/ToastProvider";

const openModal = ({
  setModalData,
  modal,
  options,
}: {
  setModalData: ModalDataSetStateType;
  modal: ReactNode;
  options?: ModalDataType;
}) => {
  if (options) {
    setModalData({
      title: options?.title,
      children: modal,
      canClose: options?.canClose,
      isOpen: options?.isOpen,
    });
  } else {
    setModalData({
      title: "",
      children: modal,
      canClose: true,
      isOpen: true,
    });
  }
};
const useOpenModal = () => {
  const setModalData = useModalDataSetState();

  return (modal: ReactNode, options?: ModalDataType) =>
    openModal({ setModalData, modal, options });
};

const openToast = (setToastData: ToastDataSetStateType, message: string) => {
  setToastData({
    isOpen: true,
    message,
  });
};
const useOpenToast = () => {
  const setToastData = useToastDataSetState();

  return (message: string) => openToast(setToastData, message);
};

export { useOpenModal, useOpenToast };
