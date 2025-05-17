/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Close from "../images/common/close.svg";
import {
  useToastDataClose,
  useToastDataState,
} from "../providers/ToastProvider";

export default function Toast() {
  const ToastData = useToastDataState();
  const closeToast = useToastDataClose();

  useEffect(() => {
    if (ToastData.isOpen) {
      const timeout = setTimeout(() => closeToast(), 4000);
      return () => clearTimeout(timeout);
    }
  }, [ToastData]);

  return (
    <div
      className={`absolute top-0 w-screen px-[3dvw] pt-[3.5dvw] z-[6] transition-all duration-300 ${
        ToastData.isOpen ? "-translate-y-0" : "-translate-y-[20dvw]"
      }`}
    >
      <div
        className={`w-full bg-black shadow-mine flex items-center py-[3.5dvw] pl-[3.5dvw] pr-[4.5dvw] rounded-full`}
      >
        <span className="flex-1">{ToastData.message || ""}</span>
        <button onClick={closeToast}>
          <img alt="بستن" className="w-[5dvw] h-[5dvw]" src={Close} />
        </button>
      </div>
    </div>
  );
}
