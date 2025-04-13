import Temp from "../images/Login/image1.png";
import BarberCard from "./BarberCard";

import Pin from "../images/common/pin.svg";
import Arrow from "../images/common/arrow.svg";
import { useNavigate } from "react-router-dom";
import { defaultBarber } from "../lib/salon";

export default function SearchSalonCard() {
  const navigate = useNavigate();
  const navigateToSalon = () => navigate("/salon/1");

  return (
    <div
      className="w-full rounded-[6dvw] overflow-hidden"
      style={{ backgroundImage: `url(${Temp})`, backgroundSize: "cover" }}
    >
      <div className="backdrop-blur-sm bg-gray_003/70 dark:bg-black/70 pt-[3dvw] pb-[6dvw] px-[6dvw] text-white flex flex-col gap-[3dvw]">
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
        <BarberCard
          data={defaultBarber}
          orientation="row"
          className="shadow-2xl shadow-black"
        />
      </div>
    </div>
  );
}
