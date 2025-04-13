import { Barber } from "../lib/salon";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

import Star from "../images/common/star.svg";
import FakeAvatar from "../images/common/fake-avatar.svg";

interface Props {
  data: Barber;
  className?: string;
}
export default function HomeBarberCard({ data, className }: Props) {
  const navigate = useNavigate();
  const navigateToBarber = () =>
    navigate("/barber/" + data.slug, { state: { backlink: "/" } });

  return (
    <div
      className={`border border-gray_001 dark:border-gray_004 px-[5dvw] py-[4dvw] rounded-[5dvw] ${className}`}
    >
      <div className="w-full flex flex-col items-center gap-[3dvw]">
        <img
          alt="آواتار"
          className="w-[14dvw] h-[14dvw] rounded-full"
          src={data.user_detail.avatar_url || FakeAvatar}
        />
        <span className="text-[6dvw]">{data.user_detail.full_name}</span>
        <Button
          type="button"
          label="رزرو"
          onClick={navigateToBarber}
          className="w-full !py-[1.5dvw]"
        />
        <div className="w-full flex justify-between items-center px-[1dvw]">
          <span className="text-gray_002">
            <span className="text-black dark:text-white">
              {data.order_comment_quantity}
            </span>{" "}
            {"نظر"}
          </span>
          <div className="h-[4dvw] w-[0.5dvw] bg-gray_001 dark:bg-gray_004" />
          <div className="flex gap-[1dvw] items-center">
            <span className="-mb-[1dvw]">{data.rate}</span>
            <img alt="ستاره" className="w-[4dvw] h-[4dvw]" src={Star} />
          </div>
        </div>
      </div>
    </div>
  );
}
