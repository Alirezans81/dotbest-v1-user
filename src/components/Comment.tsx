import Star from "../images/common/star.svg";
import Like from "../images/Comment/like.svg";
import LikeActive from "../images/Comment/like-active.svg";
import Dislike from "../images/Comment/dislike.svg";
import DislikeActive from "../images/Comment/dislike-active.svg";
import { useState } from "react";

interface Props {
  className?: string;
}
export default function Comment({ className }: Props) {
  const [activeButton, setActiveButton] = useState<"like" | "dislike" | "">("");

  return (
    <div
      className={`w-full border border-gray_001 dark:border-gray_003 rounded-[6dvw] px-[5dvw] py-[4.5dvw] flex flex-col gap-[5dvw] ${className}`}
    >
      <div className="w-full flex justify-between items-center -mb-[2dvw]">
        <span className="text-[7dvw]">فهیمه آزاد</span>
        <div className="flex gap-[0.75dvw] items-center">
          <span className="text-gray_002">4.2</span>
          <img
            alt="ستاره"
            className="w-[4dvw] h-[4dvw] -mt-[1dvw]"
            src={Star}
          />
        </div>
      </div>
      <span className="text-[5dvw]">
        من اصلا راضی نبودم چون بسیار منو معطل کردن زیادم حرف میزدن باهام چون من
        آدم درونگرایی ام دوس ندارم باهام زیاد حرف بزنن
      </span>
      <div className="w-full flex justify-between items-center">
        <span className="text-gray_002 text-[4.5dvw]">13 اردیبهشت 1403</span>
        <div className="flex items-center gap-[2dvw]">
          <div className="flex items-center gap-[0.5dvw]">
            <button
              onClick={() =>
                setActiveButton((prev) => (prev === "dislike" ? "" : "dislike"))
              }
              className="w-[6dvw] h-[6dvw] relative -mb-[1dvw]"
            >
              <img
                alt="لایک"
                className={`absolute left-0 top-0 w-full h-full transition-all duration-200 ${
                  activeButton === "dislike" ? "opacity-0" : "opacity-100"
                }`}
                src={Dislike}
              />
              <img
                alt="لایک"
                className={`absolute left-0 top-0 w-full h-full transition-all duration-200 ${
                  activeButton === "dislike" ? "opacity-100" : "opacity-0"
                }`}
                src={DislikeActive}
              />
            </button>
            <span className="text-gray_002">24</span>
          </div>
          <div className="flex items-center gap-[0.5dvw]">
            <button
              onClick={() =>
                setActiveButton((prev) => (prev === "like" ? "" : "like"))
              }
              className="w-[6dvw] h-[6dvw] relative -mt-[1dvw]"
            >
              <img
                alt="لایک"
                className={`absolute left-0 top-0 w-full h-full transition-all duration-200 ${
                  activeButton === "like" ? "opacity-0" : "opacity-100"
                }`}
                src={Like}
              />
              <img
                alt="لایک"
                className={`absolute left-0 top-0 w-full h-full transition-all duration-200 ${
                  activeButton === "like" ? "opacity-100" : "opacity-0"
                }`}
                src={LikeActive}
              />
            </button>
            <span className="text-gray_002">107</span>
          </div>
        </div>
      </div>
    </div>
  );
}
