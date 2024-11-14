import { useSwipeable } from "react-swipeable";
import {
  useModalDataClose,
  useModalDataState,
} from "../providers/ModalProvider";

export default function Modal() {
  const closeModal = useModalDataClose();
  const { isOpen, canClose, children, title } = useModalDataState();

  const config = {
    delta: 35, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: true, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
  };
  const handlers = useSwipeable({
    onSwipedDown: closeModal,
    ...config,
  });

  return (
    <button
      className={`absolute left-0 top-0 w-screen h-[100dvh] bg-black/50 transition-all duration-200 flex flex-col justify-end ${
        isOpen ? "z-40 opacity-100" : "z-[-10] opacity-0"
      }`}
      onClick={closeModal}
    >
      <div
        className={`w-full z-50 bg-white dark:bg-black ${
          canClose ? "pt-[3dvw]" : "pt-[5dvw]"
        }  pb-[6.5dvw] px-[5dvw] border-x border-t border-gray_001 dark:border-gray_004 rounded-t-[7dvw] transition-all duration-300 ${
          isOpen ? "translate-y-0 h-auto" : "translate-y-[100%] !p-0"
        }`}
      >
        {canClose && (
          <div {...handlers} className="w-full flex justify-center pb-[3dvw]">
            <div className="w-[45%] h-[1.25dvw] bg-gray_001 dark:bg-gray_004 rounded-full" />
          </div>
        )}
        {children}
      </div>
    </button>
  );
}
