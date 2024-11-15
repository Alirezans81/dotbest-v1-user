import { ReactNode } from "react";
import {
  ModalDataSetStateType,
  ModalDataType,
  useModalDataSetState,
} from "../providers/ModalProvider";

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

export { useOpenModal };
