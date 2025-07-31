/* eslint-disable react-hooks/exhaustive-deps */
import { Calendar, CalendarProvider } from "zaman";
import BarberCard from "../BarberCard";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";
import { Barber, BarberService, ReservedOrder } from "../../lib/barber";
import dayjs from "dayjs";
import { useGetBarberServiceByCategory } from "../../api/barber/hooks";
import { useCreateOrder } from "../../api/user/hooks";
import { defaultOrder, Order } from "../../lib/common";
import { useUserState } from "../../providers/UserProvider";
import { useModalDataClose } from "../../providers/ModalProvider";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Note from "../../images/common/note.svg";

interface TimeElementProps {
  start: string;
  end: string;
  onClick: () => void;
  selected?: boolean;
}
const TimeElement = ({
  start,
  end,
  onClick,
  selected = false,
}: TimeElementProps) => {
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
      <span>{start}</span>
      <span>-</span>
      <span>{end}</span>
    </button>
  );
};

interface TimeSlot {
  start: string;
  end: string;
}
interface Props {
  data: Barber;
  barber_slug: string;
  service_category: string;
  reserved_orders: ReservedOrder[];
}
export default function ReserveModal({
  data,
  barber_slug,
  service_category,
  reserved_orders,
}: Props) {
  const closeModal = useModalDataClose();
  const user = useUserState();
  const navigate = useNavigate();
  const navigateToReports = () => navigate("/reports");

  const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] =
    useState<number>(-1);

  const [service, setService] = useState<BarberService | null>(null);
  const getBarberServicesByCategory = useGetBarberServiceByCategory();
  useEffect(() => {
    getBarberServicesByCategory({
      barber_slug,
      service_category,
      setBarberService: setService,
    });
  }, [service_category]);

  const generateAvailableTimeSlots = (
    startTime: string,
    endTime: string,
    service_duration: string,
    selectedDate: string,
    reserved_orders: ReservedOrder[]
  ): TimeSlot[] => {
    const start = dayjs(`${selectedDate}T${startTime}`);
    const end = dayjs(`${selectedDate}T${endTime}`);

    const [hours, minutes, seconds] = service_duration.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + seconds / 60;

    const isToday = dayjs().isSame(selectedDate, "day");
    const now = dayjs();

    const slots: TimeSlot[] = [];
    let current = start;

    // Extract reserved ranges for the selected date
    const reservedForDate = reserved_orders.find(
      (order) => order.date === selectedDate
    );

    const reservedRanges = reservedForDate
      ? Object.entries(reservedForDate.times).map(([startStr, value]) => {
          const reservedStart = dayjs(`${selectedDate}T${startStr}`);
          const [rh, rm, rs] = value.duration.split(":").map(Number);
          const reservedEnd = reservedStart.add(
            rh * 60 + rm + rs / 60,
            "minute"
          );
          return { start: reservedStart, end: reservedEnd };
        })
      : [];

    const isOverlappingWithReserved = (
      slotStart: dayjs.Dayjs,
      slotEnd: dayjs.Dayjs
    ) => {
      return reservedRanges.some(
        ({ start, end }) => slotStart.isBefore(end) && slotEnd.isAfter(start)
      );
    };

    while (
      current.add(totalMinutes, "minute").isSame(end) ||
      current.add(totalMinutes, "minute").isBefore(end)
    ) {
      const next = current.add(totalMinutes, "minute");

      if (
        (!isToday || current.isAfter(now)) &&
        !isOverlappingWithReserved(current, next)
      ) {
        slots.push({
          start: current.format("HH:mm"),
          end: next.format("HH:mm"),
        });
      }

      current = next;
    }

    return slots;
  };

  const [slots, setSlots] = useState<TimeSlot[]>([]);

  const initSelectedDate = new Date();
  initSelectedDate.setHours(23);
  initSelectedDate.setMinutes(59);
  initSelectedDate.setSeconds(59);

  const [selectedDate, setSelectedDate] = useState(initSelectedDate);
  useEffect(() => {
    if (service) {
      setSlots(
        generateAvailableTimeSlots(
          data.working_time_start,
          data.working_time_end,
          service.duration,
          dayjs(selectedDate).format("YYYY-MM-DD"),
          reserved_orders
        )
      );
    }
  }, [selectedDate, service]);

  const imgRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const createOrder = useCreateOrder();
  const handleSubmit = () => {
    if (service && slots[selectedTimeSlotIndex]) {
      let data: Order = defaultOrder;
      data.customer = user.url;
      data.service = service.url;
      data.image = img;
      data.date = dayjs(selectedDate).format("YYYY-MM-DD");
      data.datetime_request = dayjs(selectedDate).format("YYYY-MM-DD");
      data.time = slots[selectedTimeSlotIndex].start + ":00";
      data.description = description;
      data.status = "request";

      setLoading(true);
      createOrder({
        data,
        customFunction() {
          closeModal();
          navigateToReports();
        },
        onFinally() {
          setLoading(false);
        },
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-[6dvw]">
      <div className="w-full flex flex-col gap-[4dvw]">
        {/* <BarberCard
          data={data}
          orientation="row"
          className="border border-gray_001 dark:border-gray_004"
        /> */}
        <div className="flex flex-col gap-[2dvw]">
          <span className="text-[5.5dvw]">تاریخ رزرو خود را انتخاب کنید</span>
          <div className="overflow-hidden rounded-[4dvw] border border-gray_001 dark:border-gray_004">
            <CalendarProvider locale="fa" accentColor="#e09148">
              <Calendar
                className="!w-full"
                defaultValue={selectedDate}
                onChange={(e) => {
                  const temp = e.value;

                  temp.setHours(23);
                  temp.setMinutes(59);
                  temp.setSeconds(59);

                  setSelectedDate(new Date(temp));
                }}
              />
            </CalendarProvider>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[2dvw]">
          <span className="text-[5.5dvw]">زمان رزرو خود را انتخاب کنید</span>
          {selectedDate >= new Date() ? (
            data.working_days.find(
              (e) =>
                selectedDate
                  .toLocaleString("en-US", { weekday: "long" })
                  .toLocaleLowerCase() === e
            ) ? (
              <div className="w-full grid grid-cols-3 gap-[2dvw]">
                {slots.map((slot, i) => (
                  <TimeElement
                    key={"slot" + i}
                    start={slot.start}
                    end={slot.end}
                    selected={i === selectedTimeSlotIndex}
                    onClick={() => setSelectedTimeSlotIndex(i)}
                  />
                ))}
              </div>
            ) : (
              <span className="text-gray_002">زمانی برای رزرو وجود ندارد!</span>
            )
          ) : (
            <span className="text-gray_002">زمانی برای رزرو وجود ندارد!</span>
          )}
        </div>
        <div className="w-full flex flex-col gap-[2dvw]">
          <span className="text-[5.5dvw]">
            عکس/فیلم درخواستی خود را آپلود کنید
          </span>
          <div className="w-full relative h-[40dvw] rounded-[6dvw] overflow-hidden bg-gray_001 dark:bg-gray_005">
            {imgUrl && (
              <img
                alt="عکس سالن"
                className="w-full h-[40dvw] rounded-[6dvw] object-cover"
                src={imgUrl}
              />
            )}
            <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center bg-black/50">
              <div className="flex flex-col gap-y-[1dvw] items-center px-[5dvw] py-[4dvw] rounded-[5dvw]">
                <button
                  onClick={() => imgRef.current?.click()}
                  className="bg-black rounded-[4dvw] px-[5dvw] pt-[2.5dvw] pb-[2dvw] drop-shadow-lg transition-all duration-150 hover:bg-primary hover:text-white"
                >
                  آپلود عکس/فیلم
                </button>
                <input
                  ref={imgRef}
                  alt="تغییر عکس"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setImgUrl(URL.createObjectURL(e.target.files[0]));
                      setImg(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[2dvw]">
          <span className="text-[5.5dvw]">
            توضیحات لازم رزرو خود را بنویسید
          </span>
          <textarea
            className="w-full bg-transparent min-h-[20dvh] transition-all duration-100 border rounded-[5dvw] border-gray_001 px-[5dvw] dark:border-gray_004 py-[2.5dvw] focus:outline-black"
            placeholder="بنویسید..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-[2dvw]">
        <div className="w-full flex justify-between items-center">
          <span className="text-[5dvw]">مبلغ پرداختی:</span>
          <span className="text-[5dvw]">
            {(+(service?.price || "")).toLocaleString()} تومان
          </span>
        </div>
        {/* <div className="w-full">
          <img
            alt="توجه"
            className="w-[5dvw] h-[5dvw] inline ml-[1dvw] -mt-[0.5dvw]"
            src={Note}
          />
          <span className="text-gray_002 inline">
            این مبلغ فقط به ازای خدمات پایه می‌باشد و مبلغ نهایی بعد از اتمام
            کار مشخص میشود.
          </span>
          <span className="text-gray_002 block">
            شما می‌بایست باقی مبلغ را در آرایشگاه پرداخت کنید.
          </span>
        </div> */}
        {/* <Button
          type="button"
          disabled={loading}
          label={loading ? "در حال بارگذاری..." : "تایید و پرداخت"}
          onClick={handleSubmit}
        /> */}
        <Button
          type="button"
          className="!border-primary text-primary hover:bg-primary hover:text-white"
          disabled={loading}
          label={loading ? "در حال بارگذاری..." : "تایید"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
