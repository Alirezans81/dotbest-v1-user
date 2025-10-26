import { Withdrawal } from "../lib/common";

export default function WithdrawalCard({ data }: { data: Withdrawal }) {
  const getStatus = (status: Withdrawal["status"]) => {
    switch (status) {
      case "request":
        return "در حال بررسی";
      case "in_payment_queue":
        return "در صف پرداخت";
      case "completed":
        return "پرداخت شده";
      case "payment_error":
        return "خطا در پرداخت";
      case "user_canceled":
        return "لغو شده توسط کاربر";
      default:
        return "وضعیت نامشخص";
    }
  };

  return (
    <div className="w-full flex justify-between border border-gray_001 dark:border-gray_004 rounded-[5dvw] px-[5dvw] pt-[3dvw] pb-[4dvw]">
      <div className="flex flex-col">
        <span className="text-error text-[5dvw]">
          <span dir="ltr">-{(+data.amount).toLocaleString()}</span> تومان
        </span>
        <span className="text-[6dvw]">{getStatus(data.status)}</span>
      </div>
      <div className="text-gray_002">
        <span>
          {new Date(data.datetime_create).toLocaleDateString("fa-IR")}
        </span>
      </div>
    </div>
  );
}
