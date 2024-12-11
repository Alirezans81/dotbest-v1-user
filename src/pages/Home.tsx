import Carousel from "../components/Carousel";
import BarberCard from "../components/BarberCard";
import CategoryComponent from "../components/Category";
import { useCategoriesState } from "../providers/CategoriesProvider";

import Temp from "../images/Home/temp.png";

import Pin from "../images/common/pin.svg";

export default function Home() {
  const categories = useCategoriesState();

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col gap-[2dvw] px-[5dvw] py-[4dvw]">
      <div className="w-full flex flex-row-reverse justify-center items-center py-[3dvw] gap-[5dvw]">
        <span
          dir="ltr"
          className="font-sans text-[7dvw] text-primary font-bold"
        >
          .Best
        </span>
        <div className="w-[1.5px] rounded-full h-[8dvw] bg-gray_001 dark:bg-gray_004 -mt-[2dvw]" />
        <span className="text-[7dvw]">بهترین زیبایی ها</span>
      </div>
      <div className="w-full flex flex-col gap-[2dvh]">
        <Carousel>
          <div className="grid grid-cols-4 gap-y-[3dvw]">
            {categories.map((category) => (
              <div
                key={category.title}
                className="col-span-1 flex justify-center items-center"
              >
                <CategoryComponent onClick={() => {}} data={category} />
              </div>
            ))}
          </div>
        </Carousel>
        <button className="w-full">
          <img alt="" className="w-full rounded-[5dvw]" src={Temp} />
        </button>
        <div className="w-full flex flex-col gap-[2dvw]">
          <span className="text-[8dvw]">حرفه ای ترین ها</span>
          <div className="flex gap-[4dvw] overflow-x-auto">
            <div className="!w-[45dvw]">
              <BarberCard className="!w-[45dvw]" />
            </div>
            <div className="!w-[45dvw]">
              <BarberCard className="!w-[45dvw]" />
            </div>
            <div className="!w-[45dvw]">
              <BarberCard className="!w-[45dvw]" />
            </div>
            <div className="!w-[45dvw]">
              <BarberCard className="!w-[45dvw]" />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[2dvw]">
          <div className="w-full flex justify-between items-center">
            <span className="text-[8dvw]">نزدیک ترین ها</span>
            <button className="flex items-center gap-[1dvw]">
              <img alt="لوکیشن" className="w-[5dvw] h-[5dvw]" src={Pin} />
              <span className="text-primary">مشهد، هاشمیه</span>
            </button>
          </div>
          <div className="flex gap-[4dvw] overflow-x-auto">
            <div className="!w-[45dvw]">
              <BarberCard className="!w-[45dvw]" />
            </div>
            <div className="!w-[45dvw]">
              <BarberCard className="!w-[45dvw]" />
            </div>
            <div className="!w-[45dvw]">
              <BarberCard className="!w-[45dvw]" />
            </div>
            <div className="!w-[45dvw]">
              <BarberCard className="!w-[45dvw]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[2dvw]">
          <span className="text-[8dvw]">منصف ترین ها</span>
          <div className="flex gap-[4dvw] overflow-x-auto">
            <div className="!w-[45dvw]">
              <BarberCard className="!w-[45dvw]" />
            </div>
            <div className="!w-[45dvw]">
              <BarberCard className="!w-[45dvw]" />
            </div>
            <div className="!w-[45dvw]">
              <BarberCard className="!w-[45dvw]" />
            </div>
            <div className="!w-[45dvw]">
              <BarberCard className="!w-[45dvw]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
