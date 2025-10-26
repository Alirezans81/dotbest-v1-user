/* eslint-disable react-hooks/exhaustive-deps */
import NavigationLayout from "../components/NavigationLayout";
import BarberCard from "../components/BarberCard";
import { Barber } from "../lib/barber";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetSalonBarbersByCategory } from "../api/salon/hooks";
import { useOpenToast } from "../hooks/popups";
import Skeleton from "../components/Skeleton";

export default function Barbers() {
  const { pathname, search } = useLocation();

  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [barbersLoaded, setBarbersLoaded] = useState(false);

  const openToast = useOpenToast();

  const getSalonBarbersByCategory = useGetSalonBarbersByCategory();
  useEffect(() => {
    const url_array = pathname.split("/");
    const salon_slug = url_array[url_array.length - 3];
    const category_slug = new URLSearchParams(search).get("category") || "";
    getSalonBarbersByCategory({
      salon_slug,
      category_slug,
      setBarbers,
      customFunction() {
        setBarbersLoaded(true);
      },
      onError(error) {
        openToast(error.message);
      },
    });
  }, []);

  return (
    <NavigationLayout
      label={barbersLoaded ? "آرایشگران مو" : "در حال بارگذاری"}
    >
      <div className="flex flex-col gap-[2dvh]">
        <div className="w-full grid grid-cols-2 gap-[4dvw]">
          {barbersLoaded ? (
            barbers.map((barber, i) => (
              <div key={i} className="col-span-1">
                <BarberCard data={barber} />
              </div>
            ))
          ) : (
            <>
              <div className="col-span-1">
                <Skeleton className="w-full h-[73dvw]" />
              </div>
              <div className="col-span-1">
                <Skeleton className="w-full h-[73dvw]" />
              </div>
              <div className="col-span-1">
                <Skeleton className="w-full h-[73dvw]" />
              </div>
              <div className="col-span-1">
                <Skeleton className="w-full h-[73dvw]" />
              </div>
              <div className="col-span-1">
                <Skeleton className="w-full h-[73dvw]" />
              </div>
              <div className="col-span-1">
                <Skeleton className="w-full h-[73dvw]" />
              </div>
            </>
          )}
        </div>
      </div>
    </NavigationLayout>
  );
}
