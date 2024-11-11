import Temp from "../images/Login/image2.png";

import Button from "./Button";

import Star from "../images/common/star.svg";

interface Props {
  orientation?: "col" | "row";
  className?: string;
}
export default function BarberCard({ orientation = "col", className }: Props) {
  return (
    <div
      className={`w-full flex bg-white dark:bg-black ${
        orientation === "col" && "flex-col"
      } rounded-[5dvw] overflow-hidden ${className}`}
    >
      <img
        alt=""
        className={`${
          orientation === "row" ? "w-[32.5dvw] h-[32.5dvw]" : ""
        } object-cover`}
        src={Temp}
      />
      <div
        className={`flex-1 flex flex-col items-center px-[5dvw] ${
          orientation === "row"
            ? "rounded-l-[5dvw]"
            : " rounded-b-[5dvw] pt-[4dvw] pb-[5dvw]"
        } flex flex-col justify-center items-center`}
      >
        <div className="w-full flex flex-col items-center gap-[1dvh]">
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between items-center px-[1.5dvw]">
              <div className="flex gap-[0.75dvw] items-center">
                <span className="text-gray_002">5</span>
                <img
                  alt="ستاره"
                  className="w-[4dvw] h-[4dvw] -mt-[1dvw]"
                  src={Star}
                />
              </div>
              <div className="w-[1px] h-full py-[1dvw] -mt-[1dvw]">
                <div className="w-full h-full bg-gray_001 dark:bg-gray_004"></div>
              </div>
              <span className="text-gray_002">1,343 نظر</span>
            </div>
            <span className="text-black dark:text-white">سوگول احمدی</span>
          </div>
          <Button
            label="رزرو"
            type="button"
            onClick={() => {}}
            className="w-full !py-[0.5dvh] !border-primary text-primary hover:bg-primary hover:text-white"
          />
        </div>
      </div>
    </div>
  );
}
