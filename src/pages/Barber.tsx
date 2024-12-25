/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from "react-router-dom";
import Temp from "../images/Login/image1.png";
import BackLight from "../images/common/back-light.svg";
import BackDark from "../images/common/back-dark.svg";
import Star from "../images/common/star.svg";
import Button from "../components/Button";
import Arrow from "../images/common/arrow.svg";
import BarberCard from "../components/BarberCard";
import Comment from "../components/Comment";
import { useOpenModal, useOpenToast } from "../hooks/popups";
import ReserveModal from "../components/modals/ReserveModal";
import { Barber, defaultBarber, Photo } from "../lib/salon";
import { useGetBarberData, useGetBarberGallery } from "../api/salon/hooks";
import { useEffect, useState } from "react";
import Skeleton from "../components/Skeleton";
import {
  defaultGalleryViewType,
  GalleryViewType,
  useGalleryViewSetState,
} from "../providers/GalleryViewData";
import GalleryView from "../components/GalleryView";

export default function BarberPage() {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const openModal = useOpenModal();
  const openReserveModal = () =>
    openModal(<ReserveModal data={barber || defaultBarber} />);

  const [barber, setBarber] = useState<Barber | null>(null);

  const openToast = useOpenToast();

  const getBarberData = useGetBarberData();
  useEffect(() => {
    const url_array = pathname.split("/");
    const barber_slug = url_array[url_array.length - 2];
    getBarberData({
      barber_slug,
      setBarber,
      onError(error) {
        openToast(error.message);
      },
    });
  }, []);

  const [gallery, setGallery] = useState<any[]>(["1"]);
  const getBarberGallery = useGetBarberGallery();
  useEffect(() => {
    if (barber) {
      getBarberGallery({
        barber_slug: barber.slug,
        setGallery,
        onError(error) {
          openToast(error.message);
        },
      });
    }
  }, [barber]);

  const [galleryViewData, setGalleryViewData] = useState<GalleryViewType>(
    defaultGalleryViewType
  );
  const openGalleryView = (activePhotoIndex: number) =>
    setGalleryViewData({
      data: gallery,
      isOpen: true,
      activePhotoIndex,
    });

  // const [activePhotoIndex, setActivePhotoIndex] = useState(-1);
  // const setGalleryViewData = useGalleryViewSetState();
  // useEffect(() => {
  //   if (activePhotoIndex !== -1) {
  //     openGalleryView();
  //   }
  //   console.log("activePhotoIndex: ", activePhotoIndex);
  // }, [activePhotoIndex]);

  return (
    <div className="w-screen h-[100dvh] overflow-y-auto flex flex-col gap-[3.5dvw]">
      <GalleryView data={galleryViewData} />

      <div className="w-full -mt-[0.1dvh] relative">
        {barber ? (
          <img
            alt="پوستر آرایشگر"
            className="w-full h-[63dvw] object-cover"
            src={barber?.poster_url || Temp}
          />
        ) : (
          <Skeleton className="h-[63dvw] rounded-none" />
        )}
        <div className="w-full h-full absolute left-0 top-0 z-[1] flex flex-col px-[4dvw] pt-[4dvw] bg-black/30">
          <div className="w-full flex justify-end items-center">
            <button onClick={goBack}>
              <img
                alt="برشگت"
                className="w-[7dvw] h-[7dvw] hidden dark:block"
                src={BackLight}
              />
              <img
                alt="برشگت"
                className="w-[7dvw] h-[7dvw] block dark:hidden"
                src={BackDark}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col px-[4dvw] pt-[4dvw] pb-[10dvw] gap-[4dvh] -mt-[1dvh]">
        <div className="flex flex-col gap-[3dvw]">
          <div className="w-full flex justify-between items-center gap-[2.5dvw] px-[1dvw]">
            {barber ? (
              <span className="text-[8dvw]">{barber?.nick_name}</span>
            ) : (
              <Skeleton className="w-[40dvw] h-[10dvw]" />
            )}
            <div
              className={`flex-1 flex justify-between items-center gap-[1.5dvw]`}
            >
              <div className="flex gap-[1dvw] items-center">
                {barber ? (
                  <span className="text-gray_002">{barber.rate}</span>
                ) : (
                  <Skeleton className="w-[10dvw] h-[5dvw]" />
                )}
                <img
                  alt="ستاره"
                  className="w-[4dvw] h-[4dvw] -mt-[1dvw]"
                  src={Star}
                />
              </div>
              <div className="w-[1.5px] h-full py-[1dvw] -mt-[1dvw]">
                <div className="w-full h-full bg-gray_001 dark:bg-white"></div>
              </div>
              {barber ? (
                <span className="text-gray_002">
                  {barber.comment_quantity} نظر
                </span>
              ) : (
                <Skeleton className="w-[16dvw] h-[5dvw]" />
              )}
            </div>
          </div>
          {barber ? (
            <Button
              label="رزرو"
              type="button"
              onClick={openReserveModal}
              className="w-full !border-primary text-primary hover:bg-primary hover:text-white"
            />
          ) : (
            <Skeleton className="w-full h-[12.3dvw]" />
          )}
        </div>
        <div className="w-full flex flex-col gap-[1dvw]">
          <span className="text-[6dvw]">درباره</span>
          {barber ? (
            <span className="text-gray_002">{barber?.description}</span>
          ) : (
            <div className="flex flex-col gap-[3dvw]">
              <Skeleton className="w-full h-[5dvw]" />
              <Skeleton className="w-full h-[5dvw]" />
              <Skeleton className="w-full h-[5dvw]" />
              <Skeleton className="w-full h-[5dvw]" />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-[2.5dvw]">
          <span className="text-[6dvw]">نمونه کار ها</span>
          <div className="w-full grid grid-cols-3 gap-[1dvw]">
            {gallery.length ? (
              gallery.slice(0, 8).map((photo, i) => (
                <button
                  key={i}
                  onClick={() => openGalleryView(i)}
                  className="col-span-1"
                >
                  <img
                    alt={photo.alt_name}
                    onLoad={(e) => (e.currentTarget.style.animation = "none")}
                    className="w-full h-[33dvw] object-cover bg-gray_001 dark:bg-gray_005 animate-pulse"
                    src={photo.image}
                  />
                </button>
              ))
            ) : (
              <>
                <div className="col-span-1">
                  <Skeleton className="h-[33dvw] rounded-none" />
                </div>
                <div className="col-span-1">
                  <Skeleton className="h-[33dvw] rounded-none" />
                </div>
                <div className="col-span-1">
                  <Skeleton className="h-[33dvw] rounded-none" />
                </div>
                <div className="col-span-1">
                  <Skeleton className="h-[33dvw] rounded-none" />
                </div>
                <div className="col-span-1">
                  <Skeleton className="h-[33dvw] rounded-none" />
                </div>
                <div className="col-span-1">
                  <Skeleton className="h-[33dvw] rounded-none" />
                </div>
                <div className="col-span-1">
                  <Skeleton className="h-[33dvw] rounded-none" />
                </div>
                <div className="col-span-1">
                  <Skeleton className="h-[33dvw] rounded-none" />
                </div>
              </>
            )}
            <button
              onClick={() => openGalleryView(0)}
              className="col-span-1 flex justify-center items-center gap-[1.5dvw]"
            >
              <span>بیشتر</span>
              <img alt="فلش" className="w-[4dvw] h-[4dvw]" src={Arrow} />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[3dvw]">
          <span className="text-[6dvw]">نظرات</span>
          <div className="w-full flex flex-col gap-[2dvh]">
            {barber ? (
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
    </div>
  );
}
