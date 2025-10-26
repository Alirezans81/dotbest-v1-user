import { Barber } from "../lib/barber";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

import Star from "../images/common/star.svg";
import Heart from "../images/common/heart.svg";
import HeartAtive from "../images/common/heart-active.svg";

interface Props {
  orientation?: "col" | "row";
  className?: string;
  type?: "normal" | "comment";
  data: Barber;
  category?: string;
}
export default function BarberCard({
  orientation = "col",
  className,
  type = "normal",
  data,
  category,
}: Props) {
  const navigate = useNavigate();
  const navigateToBarber = () =>
    navigate(
      "/barber/" + (category ? data.slug + "?category=" + category : data.slug),
      { state: { backlink: "/search" } }
    );

  const [isFavorited, setIsFavorite] = useState(false);

  return (
    <div
      className={`w-full flex bg-white dark:bg-black ${
        orientation === "col" && "flex-col"
      } ${
        type === "comment" ? "rounded-[5dvw] rounded-b-none" : "rounded-[5dvw]"
      } overflow-hidden ${className}`}
    >
      <div
        className={`relative ${
          orientation === "row" && "w-[35dvw] h-[42.5dvw]"
        }`}
      >
        <img
          alt=""
          className={`w-full h-full object-cover`}
          src={data.poster_url}
        />
        {orientation === "col" && (
          <div className="absolute left-0 top-0 w-full h-full bg-black/30 px-[10%] py-[7%]">
            <button
              onClick={() => setIsFavorite((prev) => !prev)}
              className="w-[5dvw] h-[5dvw] relative"
            >
              <img
                alt="علاقه‌مندی"
                className={`absolute left-0 top-0 w-full h-full transition-all duration-200 ${
                  isFavorited ? "opacity-100" : "opacity-0"
                }`}
                src={HeartAtive}
              />
              <img
                alt="علاقه‌مندی"
                className={`absolute left-0 top-0 w-full h-full transition-all duration-200 ${
                  isFavorited ? "opacity-0" : "opacity-100"
                }`}
                src={Heart}
              />
            </button>
          </div>
        )}
      </div>
      <div
        className={`flex-1 flex flex-col items-center px-[5dvw] ${
          orientation === "row"
            ? type === "comment"
              ? "rounded-tl-[5dvw] border-y border-l"
              : "rounded-l-[5dvw]"
            : "border-x border-b rounded-b-[5dvw] pt-[4dvw] pb-[5dvw]"
        } border-gray_001 dark:border-gray_003 flex flex-col justify-center items-center`}
      >
        <div className="w-full flex flex-col items-center gap-[1dvh]">
          <div className="w-full flex flex-col items-center">
            <span className="text-[6dvw] text-black dark:text-white">
              {data.user_detail.full_name}
            </span>
            <div
              className={`w-full flex justify-between items-center px-[1.5dvw]`}
            >
              <div className="flex gap-[0.75dvw] items-center">
                <span className="text-gray_002">{(+data.rate).toFixed(2)}</span>
                <img
                  alt="ستاره"
                  className="w-[4dvw] h-[4dvw] -mt-[1dvw]"
                  src={Star}
                />
              </div>
              <div className="w-[1.5px] rounded-full h-[5dvw] bg-gray_001 dark:bg-gray_004 mb-[1dvw]" />
              <span className="text-gray_002">
                {data.order_comment_quantity} نظر
              </span>
            </div>
          </div>
          <Button
            label="رزرو"
            type="button"
            onClick={navigateToBarber}
            className="w-full !py-[0.5dvh] !border-primary text-primary hover:bg-primary hover:text-white"
          />
        </div>
      </div>
    </div>
  );
}
