import { createContext, useContext } from "react";
import { useState } from "react";

export type ModalDataType = {
  title: string;
  children: React.ReactNode | null;
  canClose: boolean;
  isOpen: boolean;
};

const ModalDataState = createContext<ModalDataType>({
  title: "",
  children: null,
  canClose: false,
  isOpen: false,
});

export type ModalDataSetStateType = (value: ModalDataType) => void;
const ModalDataSetState = createContext<ModalDataSetStateType>(
  (value: ModalDataType) => {}
);

type ModalDataCloseType = () => void;
const ModalDataClose = createContext<ModalDataCloseType>(() => {});

interface Props {
  children: React.ReactNode;
}
const ModalProvider = ({ children }: Props) => {
  const [data, setData] = useState<ModalDataType>({
    title: "",
    children: null,
    canClose: false,
    isOpen: false,
  });

  const closeModal = () => {
    setData({
      title: "",
      children: null,
      isOpen: false,
      canClose: false,
    });
  };

  return (
    <ModalDataState.Provider value={data}>
      <ModalDataSetState.Provider value={setData}>
        <ModalDataClose.Provider value={closeModal}>
          {children}
        </ModalDataClose.Provider>
      </ModalDataSetState.Provider>
    </ModalDataState.Provider>
  );
};

const useModalDataState = () => {
  return useContext(ModalDataState);
};
const useModalDataSetState = () => {
  return useContext(ModalDataSetState);
};
const useModalDataClose = () => {
  return useContext(ModalDataClose);
};

export {
  ModalProvider,
  useModalDataState,
  useModalDataSetState,
  useModalDataClose,
};
