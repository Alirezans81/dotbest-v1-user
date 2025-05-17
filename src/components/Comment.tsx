/* eslint-disable react-hooks/exhaustive-deps */
import Star from "../images/common/star.svg";
import Like from "../images/Comment/like.svg";
import LikeActive from "../images/Comment/like-active.svg";
import Dislike from "../images/Comment/dislike.svg";
import DislikeActive from "../images/Comment/dislike-active.svg";
import { useEffect, useState } from "react";
import { Comment } from "../lib/salon";
import { useConvertToPersianDateTime } from "../hooks/datetime";
import { useDisikeComment, useLikeComment } from "../api/user/hooks";

interface Props {
  data: Comment;
  className?: string;
}
export default function CommentComponent({ className, data }: Props) {
  const convertToPersianDateTime = useConvertToPersianDateTime();

  const likeComment = useLikeComment();
  const dislikeComment = useDisikeComment();

  const [activeButton, setActiveButton] = useState<"like" | "dislike" | "">("");
  useEffect(() => {
    if (activeButton === "like") {
      likeComment({
        comment_url: data.url,
        like_count: data.like + 1,
      });
    } else if (activeButton === "dislike") {
      dislikeComment({
        comment_url: data.url,
        dislike_count: data.dislike + 1,
      });
    }
  }, [activeButton]);

  return (
    <div
      className={`w-full border border-gray_001 dark:border-gray_003 rounded-[6dvw] px-[5dvw] py-[4.5dvw] flex flex-col gap-[5dvw] ${className}`}
    >
      <div className="w-full flex justify-between items-center -mb-[2dvw]">
        <span className="text-[7dvw]">
          {data.is_anonymous_user ? "کاربر ناشناس" : "فهیمه آزاد"}
        </span>
        <div className="flex gap-[0.75dvw] items-center">
          <span className="text-gray_002">{data.rate}</span>
          <img
            alt="ستاره"
            className="w-[4dvw] h-[4dvw] -mt-[1dvw]"
            src={Star}
          />
        </div>
      </div>
      <span className="text-[5dvw]">{data.message}</span>
      <div className="w-full flex justify-between items-center">
        <span className="text-gray_002 text-[4.5dvw]">
          {convertToPersianDateTime("", "")}
        </span>
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
            <span className="text-gray_002">{data.dislike}</span>
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
            <span className="text-gray_002">{data.like}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
