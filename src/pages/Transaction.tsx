/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useReserveOrder } from "../api/user/hooks";

import Check from "../images/Transaction/check.svg";
import Cross from "../images/Transaction/cross.svg";
import Loading from "../components/Loading";

export default function Transaction() {
  const navigate = useNavigate();
  const navigateToReports = () => {
    window.localStorage.removeItem("payment_order_slug");
    navigate("/reports");
  };
  const navigateToHome = () => {
    navigate("/");
  };

  const [searchParams] = useSearchParams();
  const order_slug = window.localStorage.getItem("payment_order_slug");
  const Authority = searchParams.get("Authority");
  const Status = searchParams.get("Status");

  const [state, setState] = useState<"success" | "error" | "loading">(
    "loading"
  );
  const reserveOrder = useReserveOrder();
  useEffect(() => {
    if (Status && Authority && order_slug && state === "loading") {
      if (Status === "OK") {
        reserveOrder({
          order_slug,
          Authority,
          Status,
          customFunction() {
            window.localStorage.removeItem("payment_order_slug");
            setState("success");
          },
          onError() {
            setState("error");
          },
        });
      } else if (Status === "NOK") {
        setState("error");
      } else {
        setState("error");
      }
    }
  }, [Status, Authority, state]);

  return (
    <div className="w-[100dvw] h-[100dvh] flex justify-center items-center">
      <div className="flex flex-col gap-[4dvw] items-center">
        {state === "loading" && <Loading />}
        {state === "success" && (
          <>
            <div className="bg-gray_001/50 dark:bg-gray_004/50 rounded-full">
              <img alt="" className="w-[40dvw]" src={Check} />
            </div>
            <span className="text-[6dvw] font-bold">
              پرداخت با موفقیت انجام شد.
            </span>
            <div className="flex gap-[2dvw]">
              <Button
                className="w-[40dvw]"
                type="button"
                label="جزئیات رزرو"
                onClick={navigateToReports}
              />
              <Button
                className="w-[40dvw] !bg-primary"
                type="button"
                label="بازگشت به خانه"
                onClick={navigateToHome}
              />
            </div>
          </>
        )}
        {state === "error" && (
          <>
            <div className="bg-gray_001/50 dark:bg-gray_004/50 rounded-full">
              <img alt="" className="w-[40dvw]" src={Cross} />
            </div>
            <span className="text-[6dvw] font-bold">
              پرداخت ناموفق بود. لطفا دوباره تلاش نمایید.
            </span>
            <div className="flex gap-[2dvw]">
              <Button
                className="w-[40dvw] !bg-primary"
                type="button"
                label="بازگشت"
                onClick={navigateToReports}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
