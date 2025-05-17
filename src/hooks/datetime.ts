import dayjs from "dayjs";
import jalaliday from "jalaliday";

function isJalaliLeapYear(year: number): boolean {
  return year % 4 === 0;
}
function validateJalaliDay(
  monthName: string,
  day: number,
  year: number
): boolean {
  const monthNames: { [key: string]: number } = {
    فروردین: 1,
    اردیبهشت: 2,
    خرداد: 3,
    تیر: 4,
    مرداد: 5,
    شهریور: 6,
    مهر: 7,
    آبان: 8,
    آذر: 9,
    دی: 10,
    بهمن: 11,
    اسفند: 12,
  };

  const month = monthNames[monthName];

  if (!month) {
    return false;
  }

  const daysInMonth: number[] = [
    0,
    31,
    31,
    31,
    31,
    31,
    31,
    30,
    30,
    30,
    30,
    30,
    30,
    isJalaliLeapYear(year) ? 30 : 29,
  ];

  if (day < 1 || day > daysInMonth[month]) {
    return false;
  } else {
    return true;
  }
}
export const useValidateJalaliDay = () => {
  return validateJalaliDay;
};

dayjs.extend(jalaliday);
const convertToPersianDateTime = (dateString: string, timeString: string) => {
  const combined = dayjs(`${dateString}T${timeString}`).startOf("minute");
  let tempArray = combined
    .calendar("jalali")
    .locale("fa")
    .format("D MMMM YYYY، HH:mm")
    .split(" ");
  tempArray[0] = +tempArray[0] - 1 + "";
  return tempArray.join(" ");
};
export const useConvertToPersianDateTime = () => {
  return convertToPersianDateTime;
};
