import { Order } from "../../lib/common";
import { useConvertToPersianDateTime } from "../../hooks/datetime";
import { useState } from "react";
import Skeleton from "../Skeleton";
import Button from "../Button";
import { Barber } from "../../lib/barber";
import { usePayOrder } from "../../api/user/hooks";
import { useWalletState } from "../../providers/WalletProvider";
import { useModalDataClose } from "../../providers/ModalProvider";

import Note from "../../images/common/note.svg";

interface Props {
  data: Order;
  barber: Barber;
  onSuccess?: () => void;
}
export default function ReservationModal({ data, barber, onSuccess }: Props) {
  const convertToPersianDateTime = useConvertToPersianDateTime();
  const closeModal = useModalDataClose();

  const wallet = useWalletState();

  const [imgLoading, setImgLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [walletEnabled, setWalletEnabled] = useState(false);

  const payOrder = usePayOrder();

  const handleSubmit = () => {
    setLoading(true);
    payOrder({
      order_slug: data.slug,
      use_balance: walletEnabled,
      customFunction(payment_url) {
        if (payment_url) {
          window.localStorage.setItem("payment_order_slug", data.slug);
          window.location.href = payment_url;
        } else {
          onSuccess?.();
          closeModal();
        }
      },
      onFinally() {
        setLoading(false);
      },
    });
  };

  return (
    <div className="w-full flex flex-col gap-[8dvw]">
      <div className="w-full flex items-center justify-between">
        <span className="text-white text-[7.5dvw] text-center z-[1]">
          {barber.user_detail.full_name}
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
      <div className="w-full flex flex-col gap-[4dvw]">
        <div className="w-full flex flex-col gap-[2dvw]">
          <div className="w-full flex justify-between items-center">
            <span className="text-[6dvw]">مبلغ خدمت:</span>
            <span className="text-[6dvw]">
              {(+(data.final_price || "")).toLocaleString()} تومان
            </span>
          </div>
          <div className="w-full">
            <img
              alt="توجه"
              className="w-[5dvw] h-[5dvw] inline ml-[1dvw] -mt-[0.5dvw]"
              src={Note}
            />
            <span className="text-gray_002 inline">
              این مبلغ فقط به ازای خدمات پایه می‌باشد و مبلغ نهایی بعد از{" "}
              <span className="text-primary">اتمام کار</span> مشخص میشود.
            </span>
          </div>
          <div className="w-full flex justify-between items-center text-gray_002 mt-[3dvw]">
            <span className="text-[5dvw]">مبلغ ثابت بیعانه:</span>
            <span className="text-[5dvw]">
              {(+"200000").toLocaleString()} تومان
            </span>
          </div>
          <div className="w-full flex justify-between items-center text-gray_002">
            <span className="text-[5dvw]">هزینه‌ی رزرو:</span>
            <span className="text-[5dvw]">
              {(+"29000").toLocaleString()} تومان
            </span>
          </div>
          <div className="w-full h-[0.5dvw] bg-gray_001 dark:bg-gray_004 mt-[2dvw]" />

          <div className="w-full flex justify-between items-center mt-[2dvw] mb-[1dvw]">
            <span className="text-[6dvw]">مجموع پرداختی:</span>
            <span className="text-[6dvw] text-primary">
              {(+"229000").toLocaleString()} تومان
            </span>
          </div>
          <div className="w-full flex flex-col border border-gray_001 dark:border-gray_004 rounded-[4.5dvw] px-[5dvw] py-[4dvw] mb-[0.5dvw] mt-[1dvw]">
            <div className="w-full flex justify-between items-center">
              <span className="text-[6dvw]">برداشت از کیف پول</span>
              <button
                onClick={() => setWalletEnabled((prev) => !prev)}
                className="relative"
              >
                <div className="w-[8dvw] h-[3dvw] bg-gray_001 dark:bg-gray_004 rounded-full">
                  <div
                    className={`w-[4.5dvw] h-[4.5dvw] rounded-full transition-all duration-200 absolute left-0 top-[-0.75dvw] ${
                      walletEnabled
                        ? "bg-primary translate-x-[100%]"
                        : "bg-gray_002"
                    }`}
                  ></div>
                </div>
              </button>
            </div>
            <div className="w-full flex items-center gap-[2dvw] text-gray_002">
              <span className="text-[5dvw]">موجودی:</span>
              <span className="text-[5dvw]">
                {(+wallet.balance).toLocaleString()} تومان
              </span>
            </div>
          </div>

          <Button
            type="button"
            className="!border-success text-success hover:bg-success hover:!border-success hover:text-white mt-[1dvw]"
            disabled={loading}
            label={loading ? "در حال بارگذاری..." : "پرداخت"}
            onClick={handleSubmit}
          />
        </div>
        <div className="col-span-2 flex justify-center">
          <span className="text-gray_002">
            {convertToPersianDateTime(data.date, data.time)}
          </span>
        </div>
      </div>
    </div>
  );
}
