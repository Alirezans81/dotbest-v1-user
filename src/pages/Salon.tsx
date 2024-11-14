import { useNavigate } from "react-router-dom";
import BarberCard from "../components/BarberCard";
import Button from "../components/Button";
import Carousel from "../components/Carousel";
import Comment from "../components/Comment";
import NavigationLayout from "../components/NavigationLayout";
import Service from "../components/Service";

import Temp1 from "../images/Login/image1.png";
import Temp2 from "../images/Login/image2.png";
import Temp3 from "../images/Login/image3.png";

export default function Salon() {
  const navigate = useNavigate();
  const navigateToBarbers = () => {
    navigate("/salon/1/barbers");
  };

  return (
    <NavigationLayout label="سالن ماهتیسا درویشی">
      <div className="w-full h-full flex flex-col gap-[4dvh]">
        <Carousel>
          <div className="w-full relative rounded-[6dvw] overflow-hidden">
            <img alt="" className="w-full" src={Temp1} />
            <div className="absolute w-full h-full"></div>
          </div>
          <div className="w-full relative rounded-[6dvw] overflow-hidden">
            <img alt="" className="w-full" src={Temp2} />
            <div className="absolute w-full h-full"></div>
          </div>
          <div className="w-full relative rounded-[6dvw] overflow-hidden">
            <img alt="" className="w-full" src={Temp3} />
            <div className="absolute w-full h-full"></div>
          </div>
        </Carousel>
        <div className="w-full flex flex-col -mb-[1dvh]">
          <h2 className="text-[8dvw]">خوش اومدید!</h2>
          <span className="text-gray_002">
            به شادترین سالن دنیا خوش آمدید. امیدواریم برداشت شما از سالن ما عالی
            باشد.
          </span>
        </div>
        <div className="w-full flex flex-col gap-[3dvw]">
          <span className="text-[6dvw]">خدمات</span>
          <div className="flex flex-col gap-[1.5dvh]">
            <Service
              label="مو"
              onClick={navigateToBarbers}
              desc={{
                value: "تخفیف",
                theme: "primary",
              }}
            />
            <Service label="فیشیال" onClick={navigateToBarbers} />
            <Service
              label="ناخن"
              onClick={navigateToBarbers}
              desc={{
                value: "جدید",
                theme: "gray",
              }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-[3dvw]">
          <span className="text-[6dvw]">نظرات</span>
          <div className="w-full flex flex-col gap-[2dvh]">
            <div className="w-full flex flex-col">
              <BarberCard orientation="row" type="comment" />
              <Comment className="border-t-0 rounded-t-none" />
            </div>
            <Button label="بیشتر" type="button" onClick={() => {}} />
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
}
