import { useState } from "react";
import { useOpenToast } from "../../hooks/popups";
import { useModalDataClose } from "../../providers/ModalProvider";
import Button from "../Button";
import { useCancelUserOrder } from "../../api/user/hooks";

interface Props {
  order_slug: string;
  onClose?: () => void;
}
export default function SubmitCancelOrderModal({ order_slug, onClose }: Props) {
  const closeModal = useModalDataClose();
  const openToast = useOpenToast();

  const [loading, setLoading] = useState(false);

  const cancelUserOrder = useCancelUserOrder();
  const handleCancelOrder = () => {
    setLoading(true);
    cancelUserOrder({
      order_slug,
      customFunction() {
        openToast("رزور با موفقیت لغو شد");
        closeModal();
        onClose && onClose();
      },
      onFinally() {
        setLoading(false);
      },
    });
  };

  return (
    <div className="w-full flex flex-col gap-[4dvw]">
      <span>آیا از لغو این رزور مطمعن هستید؟!</span>
      <Button
        type="button"
        label={loading ? "در حال بارگذاری..." : "بله! لغو"}
        className="text-error !border-error py-[3dvw]"
        disabled={loading}
        onClick={handleCancelOrder}
      />
    </div>
  );
}
