/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Barber } from "../lib/barber";
import Carousel from "../components/Carousel";
import CategoryComponent from "../components/Category";
import { useCategoriesState } from "../providers/CategoriesProvider";
import Skeleton from "../components/Skeleton";
import { useGetBestBarbers } from "../api/salon/hooks";
import HomeBarberCard from "../components/HomeBarberCard";
import { useNavigate } from "react-router-dom";

import Banner from "../images/Home/banner.png";

export default function Home() {
  const categories = useCategoriesState();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [bestBarbers, setBestBarbers] = useState<Barber[]>([]);
  const getBestBarbers = useGetBestBarbers();

  const getUserLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {});
  };

  useEffect(() => {
    setLoading(true);
    getBestBarbers({
      setBestBarbers,
      onFinally() {
        setLoading(false);
      },
    });

    getUserLocation();
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col gap-[2dvw] px-[5dvw] py-[4dvw]">
      <div className="w-full flex justify-center items-center py-[3dvw] gap-[5dvw]">
        <span
          dir="ltr"
          className="font-sans text-[7dvw] text-primary font-eng relative ms-[3dvw]"
        >
          <div className="w-[1.75dvw] h-[1.75dvw] bg-primary rounded-full -left-[3dvw] bottom-[3dvw] absolute" />
          best
        </span>
        <div className="w-[1.5px] rounded-full h-[8dvw] bg-gray_001 dark:bg-gray_004 -mt-[2dvw]" />
        <span className="text-[5.5dvw]">بهترینی وجود ندارد...</span>
      </div>
      <div className="w-full flex flex-col gap-[2dvh]">
        <Carousel>
          <div className="grid grid-cols-4 gap-y-[3dvw]">
            {categories
              .filter((e) => e.parent === null)
              .map((category) => (
                <div
                  key={category.title}
                  className="col-span-1 flex justify-center items-center"
                >
                  <CategoryComponent
                    onClick={() => {
                      navigate("/category/" + category.slug, {
                        state: "search",
                      });
                    }}
                    data={category}
                  />
                </div>
              ))}
          </div>
        </Carousel>
        <button className="w-full">
          <img alt="" className="w-full rounded-[5dvw]" src={Banner} />
        </button>
        <div className="w-full flex flex-col gap-[2dvw]">
          <span className="text-[8dvw]">برترین های این هفته</span>
          <div className="flex gap-[6dvw] pb-[4dvw] overflow-x-auto">
            {!loading ? (
              bestBarbers.length ? (
                bestBarbers.map((salon) => (
                  <div
                    key={salon.slug}
                    className="w-[45dvw] flex justify-center"
                  >
                    <HomeBarberCard data={salon} className="w-[45dvw]" />
                  </div>
                ))
              ) : (
                <span className="text-gray_002">هیچ آرایشگری پیدا نشد</span>
              )
            ) : (
              <>
                <div>
                  <Skeleton className="w-[45dvw] h-[57dvw]" />
                </div>
                <div>
                  <Skeleton className="w-[45dvw] h-[57dvw]" />
                </div>
                <div>
                  <Skeleton className="w-[45dvw] h-[57dvw]" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
