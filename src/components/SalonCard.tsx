import { Salon } from "../lib/salon";
import Button from "./Button";

import Temp from "../images/temp.png";
import Pin from "../images/common/pin.svg";
import Star from "../images/common/star.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  data: Salon;
  className?: string;
}
export default function SalonCard({ data, className }: Props) {
  const navigate = useNavigate();
  const navigateToSalon = () => navigate("/salon/" + data.slug + "/");

  return (
    <div
      className={`rounded-[6dvw] overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${Temp})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="backdrop-blur-sm bg-black/70 py-[3.5dvw] px-[5dvw] flex flex-col gap-[12dvw] text-white">
        <div className="w-full flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[8dvw] drop-shadow-2xl shadow-black">
              {data.name}
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
          <Button
            type="button"
            label="خدمات"
            onClick={navigateToSalon}
            className="!border-primary text-primary px-[4dvw] !py-[0.5dvw] mt-[2dvw] hover:bg-primary hover:text-white"
          />
        </div>
        <div className="w-full flex justify-between items-end">
          <span className="text-gray_001">
            {data.order_comment_quantity} نظر
          </span>
          <div className="flex gap-[0.75dvw] items-center">
            <span>{(+data.rate).toFixed(2)}</span>
            <img
              alt="ستاره"
              className="w-[4dvw] h-[4dvw] -mt-[1dvw]"
              src={Star}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
