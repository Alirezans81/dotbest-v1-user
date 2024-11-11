import {
  useModalDataClose,
  useModalDataState,
} from "../providers/ModalProvider";

export default function Modal() {
  const closeModal = useModalDataClose();
  const { isOpen, canClose, children, title } = useModalDataState();

  return (
    <button
      className={`absolute left-0 top-0 w-screen h-[100dvh] bg-black/50 transition-all duration-200 ${
        isOpen ? "z-40 opacity-100" : "z-[-10] opacity-0"
      }`}
      onClick={closeModal}
    >
      Modal
    </button>
  );
}
