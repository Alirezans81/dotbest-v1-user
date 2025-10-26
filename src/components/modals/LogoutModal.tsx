import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/auth";
import { useModalDataClose } from "../../providers/ModalProvider";
import Button from "../Button";

export default function LogoutModal() {
  const logout = useLogout();
  const closeModal = useModalDataClose();
  const navigate = useNavigate();
  const goToIndex = () => navigate("/");

  return (
    <div className="w-full flex flex-col gap-[4dvw]">
      <span>آیا از خروج از حساب کاربری خود مطمعن هستید؟!</span>
      <Button
        type="button"
        label="بله. خروج!"
        className="text-error !border-error py-[3dvw]"
        onClick={() => {
          closeModal();
          logout();
          goToIndex();
        }}
      />
    </div>
  );
}
