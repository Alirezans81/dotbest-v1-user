import BarberCard from "./BarberCard";

import Comment from "../images/Reports/comment.svg";
import CommentModal from "./modals/CommentModal";
import { useOpenModal } from "../hooks/popups";
import { defaultBarber } from "../lib/salon";

export default function ReportCard() {
  const openModal = useOpenModal();
  const openCommnetModal = () => openModal(<CommentModal />);

  return (
    <div className="flex flex-col">
      <BarberCard data={defaultBarber} orientation="row" type="comment" />
      <div
        className={`w-full border-x border-b border-gray_001 dark:border-gray_003 rounded-b-[6dvw] px-[5dvw] pt-[3.5dvw] pb-[4.5dvw] flex flex-col gap-[5dvw]`}
      >
        <div className="w-full flex justify-between items-center">
          <span className="text-[7dvw]">مو</span>
          <span className="text-gray_002 text-[5dvw]">1,500,000 تومان</span>
        </div>
        <div className="w-full flex justify-between items-center">
          <span className="text-gray_002 text-[4.5dvw]">13 اردیبهشت 1403</span>
          <button
            onClick={openCommnetModal}
            className="flex items-center gap-[1.5dvw] text-primary"
          >
            <img alt="نظر دادن" className="w-[5dvw] h-[5dvw]" src={Comment} />
            <span>نظر دادن</span>
          </button>
        </div>
      </div>
    </div>
  );
}
