import { Calendar, CalendarProvider } from "zaman";
import BarberCard from "../BarberCard";
import { Formik } from "formik";
import Button from "../Button";
import { useState } from "react";

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

export default function ReserveModal() {
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(-1);

  return (
    <Formik initialValues={{ date: new Date() }} onSubmit={(values) => {}}>
      {({ handleBlur, handleChange, values, setFieldValue, handleSubmit }) => (
        <div className="w-full flex flex-col gap-[6dvw]">
          <div className="w-full flex flex-col gap-[4dvw]">
            <BarberCard
              orientation="row"
              className="border border-gray_001 dark:border-gray_004"
            />
            <div className="flex flex-col gap-[2dvw]">
              <span className="text-[5.5dvw]">
                تاریخ رزرو خود را انتخاب کنید
              </span>
              <div className="overflow-hidden rounded-[4dvw] border border-gray_001 dark:border-gray_004">
                <CalendarProvider locale="fa" accentColor="#e09148">
                  <Calendar
                    className="!w-full"
                    defaultValue={values.date}
                    onChange={(e) => setFieldValue("date", new Date(e.value))}
                  />
                </CalendarProvider>
              </div>
            </div>
            <div className="w-full flex flex-col gap-[2dvw]">
              <span className="text-[5.5dvw]">
                زمان رزرو خود را انتخاب کنید
              </span>
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
          <div className="w-full flex flex-col gap-[1dvh]">
            <div className="w-full flex justify-between items-center">
              <span className="text-[5dvw]">مبلغ پرداختی:</span>
              <span className="text-[5dvw]">1,250,000 تومان</span>
            </div>
            <Button
              type="button"
              label="تایید و پرداخت"
              onClick={handleSubmit}
            />
          </div>
        </div>
      )}
    </Formik>
  );
}
