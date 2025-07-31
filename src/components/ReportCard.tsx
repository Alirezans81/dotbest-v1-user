/* eslint-disable react-hooks/exhaustive-deps */
import BarberCard from "./BarberCard";
import CommentModal from "./modals/CommentModal";
import { useOpenModal } from "../hooks/popups";
import { Barber, defaultBarber } from "../lib/barber";
import { Order } from "../lib/common";
import { useConvertToPersianDateTime } from "../hooks/datetime";
import { useEffect, useState } from "react";
import { useGetBarberService } from "../api/user/hooks";
import { useGetBarberData } from "../api/salon/hooks";
import Skeleton from "./Skeleton";

import Comment from "../images/Reports/comment.svg";
import Button from "./Button";
import ReservationModal from "./modals/ReservationModal";
import { useGetStatus } from "../hooks/order";

interface Props {
  data: Order;
  refreshReports: () => void;
}
export default function ReportCard({ data, refreshReports }: Props) {
  const openModal = useOpenModal();
  const openCommnetModal = () =>
    openModal(<CommentModal barber_data={barber} order_url={data.url} order_slug={data.slug} />);
  const openReservationModal = () =>
    openModal(<ReservationModal data={data} refreshReports={refreshReports} />);

  const convertToPersianDateTime = useConvertToPersianDateTime();

  const getStatus = useGetStatus();

  const [loading, setLoading] = useState(false);
  const [barber, setBarber] = useState<Barber>(defaultBarber);
  const getBarberService = useGetBarberService();
  const getBarberData = useGetBarberData();
  useEffect(() => {
    if (data.service) {
      setLoading(true);
      getBarberService({
        service_url: data.service,
        setBarberService: () => {},
        customFunction(data) {
          getBarberData({
            barber_slug: data.barber.split("/").slice(-2)[0] || "",
            setBarber,
            onFinally() {
              setLoading(false);
            },
          });
        },
        onError() {
          setLoading(false);
        },
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col">
      {!loading ? (
        <BarberCard data={barber} orientation="row" type="comment" />
      ) : (
        <Skeleton className="w-full h-[42.54dvw] rounded-b-none border-x border-t border-gray_001 dark:border-gray_003" />
      )}
      <div
        className={`w-full border-x border-b border-gray_001 dark:border-gray_003 rounded-b-[6dvw] px-[5dvw] pt-[3.5dvw] pb-[4.5dvw] flex flex-col gap-[5dvw]`}
      >
        <div className="flex flex-col">
          <div className="w-full flex justify-between items-center">
            <span className="text-[7dvw]">{data.service_title + " "}</span>
            <span className="text-gray_002 text-[5dvw]">
              {(+data.final_price).toLocaleString()} تومان
            </span>
          </div>
          <span className="text-primary">
            {"(" + getStatus(data.status) + ")"}
          </span>
        </div>
        <div className="w-full flex justify-between items-center">
          <span className="text-gray_002 text-[4.5dvw]">
            {convertToPersianDateTime(data.date, data.time)}
          </span>

          {data.status === "done" ? (
            <button
              onClick={openCommnetModal}
              className="flex items-center gap-[1.5dvw] text-primary"
            >
              <img alt="نظر دادن" className="w-[5dvw] h-[5dvw]" src={Comment} />
              <span>نظر دادن</span>
            </button>
          ) : (
            <Button
              type="button"
              className="px-[5dvw] !py-[1dvw]"
              onClick={openReservationModal}
            >
              جزئیات
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
