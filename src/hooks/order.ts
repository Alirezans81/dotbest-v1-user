const getStatus = (value: string) => {
  switch (value) {
    case "request":
      return "منتظر تایید";
    case "reserved":
      return "رزرو شده";
    case "awaiting_payment":
      return "منتظر پرداخت";
    case "is_paid":
      return "پرداخت شده";
    case "cancel":
      return "لغو شده";
    case "done":
      return "به اتمام رسیده";
    default:
      return "";
  }
};
export const useGetStatus = () => {
  return getStatus;
};
