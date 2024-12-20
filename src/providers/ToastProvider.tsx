import { createContext, useContext } from "react";
import { useState } from "react";

type ToastDataType = {
  message: string | null;
  isOpen: boolean;
};

const ToastDataState = createContext<ToastDataType>({
  message: null,
  isOpen: false,
});

type ToastDataSetStateType = (value: ToastDataType) => void;
const ToastDataSetState = createContext<ToastDataSetStateType>(
  (value: ToastDataType) => {}
);

type ToastDataCloseType = () => void;
const ToastDataClose = createContext<ToastDataCloseType>(() => {});

interface Props {
  children: React.ReactNode;
}
const ToastProvider = ({ children }: Props) => {
  const [data, setData] = useState<ToastDataType>({
    message: null,
    isOpen: false,
  });

  const closeToast = () => {
    setData({
      message: null,
      isOpen: false,
    });
  };

  return (
    <ToastDataState.Provider value={data}>
      <ToastDataSetState.Provider value={setData}>
        <ToastDataClose.Provider value={closeToast}>
          {children}
        </ToastDataClose.Provider>
      </ToastDataSetState.Provider>
    </ToastDataState.Provider>
  );
};

const useToastDataState = () => {
  return useContext(ToastDataState);
};
const useToastDataSetState = () => {
  return useContext(ToastDataSetState);
};
const useToastDataClose = () => {
  return useContext(ToastDataClose);
};

export type { ToastDataSetStateType };
export {
  ToastProvider,
  useToastDataState,
  useToastDataSetState,
  useToastDataClose,
};
