import { Order } from "../../lib/common";
import { useConvertToPersianDateTime } from "../../hooks/datetime";
import { useState } from "react";
import Skeleton from "../Skeleton";
import Button from "../Button";
import { useOpenModal } from "../../hooks/popups";
import SubmitCancelOrderModal from "./SubmitCancelOrderModal";

interface Props {
  data: Order;
  refreshReports: () => void;
}
export default function ReservationModal({ data, refreshReports }: Props) {
  const convertToPersianDateTime = useConvertToPersianDateTime();

  const [imgLoading, setImgLoading] = useState(true);

  const openModal = useOpenModal();
  const openSubmitCancelOrder = () =>
    openModal(
      <SubmitCancelOrderModal order_slug={data.slug} onClose={refreshReports} />
    );

  return (
    <div className="w-full flex flex-col gap-[8dvw]">
      <div className="w-full flex items-center justify-between">
        <span className="text-white text-[7.5dvw] text-center z-[1]">
          {data.customer_full_name}
        </span>
        <span className="text-[5.5dvw] text-primary -mb-[0.5dvw]">
          {data.service_title}
        </span>
      </div>
      <div className="w-full flex flex-col gap-[4dvw]">
        <div className="w-full flex flex-col">
          <span className="text-[5.5dvw] text-gray_002">عکس/فیلم ارسالی</span>
          {data.image_url ? (
            <>
              <img
                alt=""
                src={data.image_url}
                className={`mt-[2dvw] rounded-[6dvw] object-cover ${
                  imgLoading ? "hidden" : "block"
                }`}
                onLoad={() => setImgLoading(false)}
              />
              <Skeleton
                className={`w-full mt-[2dvw] h-[50dvw] ${
                  imgLoading ? "blcok" : "hidden"
                }`}
              />
            </>
          ) : (
            <span className="text-[5.5dvw]">عکس/فیلم ارسالی وجود ندارد!</span>
          )}
        </div>
        <div className="w-full flex flex-col">
          <span className="text-[5.5dvw] text-gray_002">توضیحات</span>
          {data.description ? (
            <span className="border border-gray_001 dark:border-gray_004 py-[4dvw] px-[5dvw] rounded-[6dvw] mt-[2dvw]">
              {data.description}
            </span>
          ) : (
            <span className="text-[5.5dvw]">توضیحاتی وجود ندارد!</span>
          )}
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-[4dvw]">
        <div className="col-span-2">
          <div className="w-full flex items-center justify-between">
            <span className="text-[5.5dvw] text-gray_002">مبلغ دریافتی:</span>
            <span className="text-[5.5dvw] -mb-[0.5dvw]">
              {(+data.final_price).toLocaleString()} تومن
            </span>
          </div>
        </div>
        {data.status !== "cancel" && data.status !== "done" && (
          <Button
            type="button"
            className="col-span-2 !border-error text-error hover:!bg-error hover:!border-error"
            onClick={openSubmitCancelOrder}
            label="لفو رزرو"
          />
        )}
        <div className="col-span-2 flex justify-center">
          <span className="text-gray_002">
            {convertToPersianDateTime(data.date, data.time)}
          </span>
        </div>
      </div>
    </div>
  );
}
