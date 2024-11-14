import Temp from "../images/Login/image1.png";
import BarberCard from "./BarberCard";

import Pin from "../images/common/pin.svg";
import Arrow from "../images/common/arrow.svg";
import { useNavigate } from "react-router-dom";

export default function SearchCard() {
  const navigate = useNavigate();
  const navigateToSalon = () => {
    navigate("/salon/1");
  };

  return (
    <div className="w-full h-fit relative rounded-[6dvw] overflow-hidden">
      <img alt="" className="w-full h-full object-cover" src={Temp} />
      <div className="absolute left-0 top-0 w-full h-full backdrop-blur-sm bg-gray_003/70 dark:bg-black/70 py-[3dvw] px-[6dvw] text-white flex flex-col gap-[2dvw]">
        <div className="w-full flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[8dvw] drop-shadow-2xl shadow-black">
              سالن ماهتیسا
            </span>
            <div className="flex items-center gap-[1dvw] -mt-[1.5dvw]">
              <img
                alt="لوکیشن"
                className="w-[6dvw] h-[6dvw] -mt-[1dvw]"
                src={Pin}
              />
              <span className="text-gray_001 text-[5dvw]">هاشمیه</span>
            </div>
          </div>
          <button onClick={navigateToSalon} className="mt-[3dvw]">
            <img alt="فلش" className="w-[6dvw] h-[6dvw]" src={Arrow} />
          </button>
        </div>
        <BarberCard orientation="row" className="shadow-2xl shadow-black" />
      </div>
    </div>
  );
}
