const getStatus = (value: string) => {
  switch (value) {
    case "request":
      return "منتظر تایید";
    case "rejected":
      return "رد شده";
    case "awaiting_payment":
      return "منتظر پرداخت";
    case "reserved":
      return "رزرو شده";
    case "admin_canceled":
      return "لغو شده توسط ادمین";
    case "barber_canceled":
      return "لغو شده توسط آرایشگر";
    case "customer_canceled":
      return "لغو شده توسط مشتری";
    case "completed":
      return "به اتمام رسیده";
    default:
      return "";
  }
};
export const useGetStatus = () => {
  return getStatus;
};
