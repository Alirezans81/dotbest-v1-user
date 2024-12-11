import { useNavigate } from "react-router-dom";
import Temp from "../images/Login/image1.png";
import Square from "../images/Login/square.png";

import BackLight from "../images/common/back-light.svg";
import BackDark from "../images/common/back-dark.svg";
import Star from "../images/common/star.svg";
import Button from "../components/Button";
import Arrow from "../images/common/arrow.svg";
import BarberCard from "../components/BarberCard";
import Comment from "../components/Comment";
import { useOpenModal } from "../hooks/Modal";
import ReserveModal from "../components/modals/ReserveModal";

export default function Barber() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const openModal = useOpenModal();
  const openReserveModal = () => openModal(<ReserveModal />);

  return (
    <div className="w-screen h-[100dvh] overflow-y-auto flex flex-col">
      <div className="w-full -mt-[0.1dvh] relative">
        <img alt="" className="w-full" src={Temp} />
        <div className="w-full h-full absolute left-0 top-0 z-[1] flex flex-col px-[4dvw] pt-[4dvw] bg-black/30">
          <div className="w-full flex justify-end items-center">
            <button onClick={goBack}>
              <img
                alt="برشگت"
                className="w-[7dvw] h-[7dvw] hidden dark:block"
                src={BackLight}
              />
              <img
                alt="برشگت"
                className="w-[7dvw] h-[7dvw] block dark:hidden"
                src={BackDark}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col px-[4dvw] pt-[4dvw] pb-[10dvw] gap-[4dvh] -mt-[1dvh]">
        <div className="flex flex-col gap-[1dvw]">
          <div className="w-full flex justify-between items-center gap-[2.5dvw] px-[1dvw]">
            <span className="text-[8dvw]">ماهتیسا درویشی</span>
            <div
              className={`flex-1 flex justify-between items-center gap-[1.5dvw]`}
            >
              <div className="flex gap-[0.75dvw] items-center">
                <span className="text-gray_002">4.2</span>
                <img
                  alt="ستاره"
                  className="w-[4dvw] h-[4dvw] -mt-[1dvw]"
                  src={Star}
                />
              </div>
              <div className="w-[1.5px] h-full py-[1dvw] -mt-[1dvw]">
                <div className="w-full h-full bg-gray_001 dark:bg-white"></div>
              </div>
              <span className="text-gray_002">1,343 نظر</span>
            </div>
          </div>
          <Button
            label="رزرو"
            type="button"
            onClick={openReserveModal}
            className="w-full !border-primary text-primary hover:bg-primary hover:text-white"
          />
        </div>
        <div className="w-full flex flex-col">
          <span className="text-[6dvw]">درباره</span>
          <span className="text-gray_002">
            سلام! نام من ماهتیسا است. من یک آرایشگر، آرایشگر و فقط استاد کارم
            هستم. هدف من ایجاد یک ظاهر طراحی پیچیده طولانی مدت است. بعدا می
            بینمت!
          </span>
        </div>
        <div className="w-full flex flex-col gap-[2.5dvw]">
          <span className="text-[6dvw]">نمونه کار ها</span>
          <div className="w-full grid grid-cols-3 gap-[1dvw]">
            <button className="col-span-1">
              <img alt="" className="w-full" src={Square} />
            </button>
            <button className="col-span-1">
              <img alt="" className="w-full" src={Square} />
            </button>
            <button className="col-span-1">
              <img alt="" className="w-full" src={Square} />
            </button>
            <button className="col-span-1">
              <img alt="" className="w-full" src={Square} />
            </button>
            <button className="col-span-1">
              <img alt="" className="w-full" src={Square} />
            </button>
            <button className="col-span-1">
              <img alt="" className="w-full" src={Square} />
            </button>
            <button className="col-span-1">
              <img alt="" className="w-full" src={Square} />
            </button>
            <button className="col-span-1">
              <img alt="" className="w-full" src={Square} />
            </button>
            <button className="col-span-1 flex justify-center items-center gap-[1.5dvw]">
              <span>بیشتر</span>
              <img alt="فلش" className="w-[4dvw] h-[4dvw]" src={Arrow} />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[3dvw]">
          <span className="text-[6dvw]">نظرات</span>
          <div className="w-full flex flex-col gap-[2dvh]">
            <div className="w-full flex flex-col">
              <BarberCard orientation="row" type="comment" />
              <Comment className="border-t-0 rounded-t-none" />
            </div>
            <Button label="بیشتر" type="button" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}
