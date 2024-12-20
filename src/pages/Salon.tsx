/* eslint-disable react-hooks/exhaustive-deps */
import { defaultBarber, Salon } from "../lib/salon";
import { useLocation, useNavigate } from "react-router-dom";
import BarberCard from "../components/BarberCard";
import Button from "../components/Button";
import Comment from "../components/Comment";
import NavigationLayout from "../components/NavigationLayout";
import Service from "../components/Service";

import Pin from "../images/common/pin.svg";
import { useEffect, useState } from "react";
import Skeleton from "../components/Skeleton";
import { useGetSalonData } from "../api/salon/hooks";
import { Category } from "../lib/common";
import { useGetCategoriesByUrlArray } from "../hooks/filters";
import { useOpenToast } from "../hooks/popups";

export default function SalonPage() {
  const { pathname } = useLocation();

  const [salon, setSalon] = useState<Salon | null>(null);
  const [salonCategories, setSalonCategories] = useState<Category[]>([]);

  const openToast = useOpenToast();

  const getSalonData = useGetSalonData();
  const getCategoriesByUrlArray = useGetCategoriesByUrlArray();
  useEffect(() => {
    const url_array = pathname.split("/");
    const salon_slug = url_array[url_array.length - 1];
    getSalonData({
      salon_slug,
      setSalon,
      customFunction(data) {
        setSalonCategories(getCategoriesByUrlArray(data.categories));
      },
      onError(error) {
        openToast(error.message);
      },
    });
  }, []);

  const navigate = useNavigate();
  const navigateToBarbers = (category_slug: string) =>
    navigate(`barbers/?category=${category_slug}`);

  const [posterLoaded, setPosterLoaded] = useState(false);

  return (
    <NavigationLayout label={salon ? "سالن " + salon.name : "در حال بارگزاری"}>
      <div className="w-full h-full flex flex-col gap-[4dvh]">
        {salon ? (
          salon.poster_url && (
            <>
              <div className="w-full relative rounded-[6dvw] overflow-hidden">
                <img
                  alt="پوستر آرایشگاه"
                  onLoad={() => setPosterLoaded(true)}
                  className={`w-full h-[60dvw] object-cover ${
                    posterLoaded ? "block" : "hidden"
                  }`}
                  src={salon.poster_url}
                />
              </div>
              <Skeleton
                className={`w-full h-[53dvw] ${
                  posterLoaded ? "hidden" : "block"
                }`}
              />
            </>
          )
        ) : (
          <Skeleton className={`w-full h-[53dvw]`} />
        )}
        <div className="w-full flex flex-col gap-[2dvw] -mb-[1dvh]">
          <div className="flex flex-col">
            {salon ? (
              <>
                <h2 className="text-[8dvw]">خوش اومدید!</h2>
                <span className="text-gray_002">{salon.summery}</span>
              </>
            ) : (
              <div className="flex flex-col gap-[4dvw]">
                <Skeleton className="w-[50dvw] h-[10dvw]" />
                <div className="flex flex-col gap-[3dvw]">
                  <Skeleton className="w-full h-[5dvw]" />
                  <Skeleton className="w-full h-[5dvw]" />
                  <Skeleton className="w-full h-[5dvw]" />
                  <Skeleton className="w-full h-[5dvw]" />
                </div>
              </div>
            )}
          </div>
          <div>
            {salon ? (
              <>
                <img
                  alt="لوکیشن"
                  className="w-[6dvw] h-[6dvw] -mt-[1dvw] inline ml-[1dvw]"
                  src={Pin}
                />
                <span className="text-[5dvw]">{salon.address}</span>
              </>
            ) : (
              <Skeleton />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-[3dvw]">
          <span className="text-[6dvw]">خدمات</span>
          <div className="flex flex-col gap-[1.5dvh]">
            {salon ? (
              salonCategories.map((category, i) => (
                <Service
                  key={i}
                  label={category.title}
                  onClick={() => navigateToBarbers(category.slug)}
                />
              ))
            ) : (
              <>
                <Skeleton className="w-full h-[14.5dvw] !rounded-[5dvw]" />
                <Skeleton className="w-full h-[14.5dvw] !rounded-[5dvw]" />
                <Skeleton className="w-full h-[14.5dvw] !rounded-[5dvw]" />
              </>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-[3dvw]">
          <span className="text-[6dvw]">نظرات</span>
          <div className="w-full flex flex-col gap-[2dvh]">
            {salon ? (
              <>
                <div className="w-full flex flex-col">
                  <BarberCard
                    data={defaultBarber}
                    orientation="row"
                    type="comment"
                  />
                  <Comment className="border-t-0 rounded-t-none" />
                </div>
                <Button label="بیشتر" type="button" onClick={() => {}} />
              </>
            ) : (
              <>
                <Skeleton className="w-full h-[98dvw]" />
                <Skeleton className="w-full h-[14dvw] !rounded-full" />
              </>
            )}
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
}
