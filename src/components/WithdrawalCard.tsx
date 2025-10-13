import Temp from "../images/temp.png";

export default function WithdrawalCard() {
  return (
    <div className="w-full flex flex-col gap-[3.5dvw] border border-gray_001 dark:border-gray_004 rounded-[5dvw] px-[5dvw] pt-[4dvw] pb-[5dvw]">
      <div className="w-full flex justify-between items-center">
        <span className="text-error text-[5dvw]">
          <span dir="ltr">-500,000</span> تومان
        </span>
        <span className="text-gray_002">1400/01/01</span>
      </div>
      <div className="w-full h-[40dvw] relative rounded-[5dvw] overflow-hidden">
        <img alt="رسید" className="w-full h-full object-cover" src={Temp} />
        <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center bg-black/50">
          <div className="flex flex-col gap-y-[1dvw] items-center px-[5dvw] py-[4dvw] bg-black rounded-[5dvw] drop-shadow-lg">
            <span className="text-[7dvw]">تایید شد</span>
            <button className="border border-gray_001 rounded-[4dvw] px-[5dvw] pt-[1.5dvw] pb-[1dvw] transition-all duration-150 hover:bg-primary hover:text-white hover:border-primary">
              مشاهده
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
