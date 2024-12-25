import { Calendar, CalendarProvider } from "zaman";
import BarberCard from "../BarberCard";
import Button from "../Button";
import { useState } from "react";
import { Barber } from "../../lib/salon";

import Note from "../../images/common/note.svg";

interface TimeElementProps {
  onClick: () => void;
  selected?: boolean;
}
const TimeElement = ({ onClick, selected = false }: TimeElementProps) => {
  return (
    <button
      dir="ltr"
      onClick={onClick}
      className={`rounded-[4dvw] col-span-1 pt-[3dvw] pb-[2dvw] transition-all duration-100 ease-in flex justify-center items-center gap-[1.5dvw] ${
        selected
          ? "bg-primary text-white"
          : "border border-primary text-primary"
      }`}
    >
      <span>8:00</span>
      <span>-</span>
      <span>9:00</span>
    </button>
  );
};

interface Props {
  data: Barber;
}
export default function ReserveModal({ data }: Props) {
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(-1);

  const [date, setDate] = useState(new Date());

  return (
    <div className="w-full flex flex-col gap-[6dvw]">
      <div className="w-full flex flex-col gap-[4dvw]">
        <BarberCard
          data={data}
          orientation="row"
          className="border border-gray_001 dark:border-gray_004"
        />
        <div className="flex flex-col gap-[2dvw]">
          <span className="text-[5.5dvw]">تاریخ رزرو خود را انتخاب کنید</span>
          <div className="overflow-hidden rounded-[4dvw] border border-gray_001 dark:border-gray_004">
            <CalendarProvider locale="fa" accentColor="#e09148">
              <Calendar
                className="!w-full"
                defaultValue={date}
                onChange={(e) => setDate(new Date(e.value))}
              />
            </CalendarProvider>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[2dvw]">
          <span className="text-[5.5dvw]">زمان رزرو خود را انتخاب کنید</span>
          <div className="w-full grid grid-cols-3 gap-[2dvw]">
            <TimeElement
              onClick={() => setSelectedTimeIndex(1)}
              selected={selectedTimeIndex === 1}
            />
            <TimeElement
              onClick={() => setSelectedTimeIndex(2)}
              selected={selectedTimeIndex === 2}
            />
            <TimeElement
              onClick={() => setSelectedTimeIndex(3)}
              selected={selectedTimeIndex === 3}
            />
            <TimeElement
              onClick={() => setSelectedTimeIndex(4)}
              selected={selectedTimeIndex === 4}
            />
            <TimeElement
              onClick={() => setSelectedTimeIndex(5)}
              selected={selectedTimeIndex === 5}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-[2dvw]">
          <span className="text-[5.5dvw]">
            توضیحات لازم رزرو خود را بنویسید
          </span>
          <textarea
            className="w-full bg-transparent min-h-[20dvh] transition-all duration-100 border rounded-[5dvw] border-gray_001 px-[5dvw] dark:border-gray_004 py-[2.5dvw] focus:outline-black"
            placeholder="بنویسید..."
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-[2dvw]">
        <div className="w-full flex justify-between items-center">
          <span className="text-[5dvw]">مبلغ پرداختی:</span>
          <span className="text-[5dvw]">500,000 تومان</span>
        </div>
        <div className="w-full">
          <img
            alt="توجه"
            className="w-[5dvw] h-[5dvw] inline ml-[1dvw] -mt-[0.5dvw]"
            src={Note}
          />
          <span className="text-gray_002 inline">
            این مبلغ فقط به ازای رزرو وقت شما می‌باشد و شما می‌بایست تعرفه خدمات
            آرایشکاه را حضوری پرداخت نمایید.
          </span>
        </div>
        <Button type="button" label="تایید و پرداخت" onClick={() => {}} />
      </div>
    </div>
  );
}
