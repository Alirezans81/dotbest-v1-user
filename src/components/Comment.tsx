/* eslint-disable react-hooks/exhaustive-deps */
import { Comment } from "../lib/salon";

import Star from "../images/common/star.svg";

interface Props {
  data: Comment;
  className?: string;
}
export default function CommentComponent({ className, data }: Props) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="border border-gray_001 dark:border-gray_003 rounded-[5dvw] px-[5dvw] py-[4dvw]">
        <div className="w-full flex flex-col gap-[4dvw]">
          <div className="w-full flex flex-col">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-[2dvw]">
                <span className="text-white text-[7.5dvw] text-center z-[1]">
                  {data.user_fullname}
                </span>
                <span className="text-[5dvw] text-primary -mb-[0.5dvw]">
                  {"(کوتاهی مو)"}
                </span>
              </div>
              <div className="flex gap-[0.75dvw] items-center">
                <span className="text-gray_002">{(+data.rate).toFixed(2)}</span>
                <img
                  alt="ستاره"
                  className="w-[4dvw] h-[4dvw] -mt-[1dvw]"
                  src={Star}
                />
              </div>
            </div>
          </div>
          <span>{data.message}</span>
        </div>
      </div>
    </div>
  );
}
