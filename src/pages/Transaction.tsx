/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useSearchParams } from "react-router-dom";
import { useShowSplashScreenSetState } from "../providers/ShowSplashScreen";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useReserveOrder } from "../api/user/hooks";

import Check from "../images/Transaction/check.svg";
import Cross from "../images/Transaction/cross.svg";

export default function Transaction() {
  const setShowSplashScreen = useShowSplashScreenSetState();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setShowSplashScreen(loading);
  }, [loading]);

  const navigate = useNavigate();
  const navigateToReports = () => {
    navigate("/reports");
  };
  const navigateToHome = () => {
    navigate("/");
  };

  const [searchParams] = useSearchParams();
  const order_slug = window.localStorage.getItem("payment_order_slug");
  const Authority = searchParams.get("Authority");
  const Status = searchParams.get("Status");

  const [success, setSuccess] = useState(false);
  const reserveOrder = useReserveOrder();
  useEffect(() => {
    if (Status && Authority && order_slug) {
      if (Status === "OK") {
        setLoading(true);
        reserveOrder({
          order_slug,
          Authority,
          Status,
          customFunction() {
            window.localStorage.removeItem("payment_order_slug");
            setSuccess(true);
          },
        });
      }
      if (Status === "NOK") {
        setLoading(false);
      }
    }
  }, [Status, Authority]);

  return (
    <div className="w-[100dvw] h-[100dvh] flex justify-center items-center">
      <div className="flex flex-col gap-[4dvw] items-center">
        {success ? (
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
        ) : (
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
