/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CommentComponent from "../components/Comment";
import { useOpenModal, useOpenToast } from "../hooks/popups";
import ReserveModal from "../components/modals/ReserveModal";
import { Comment } from "../lib/salon";
import { useGetBarberComments, useGetBarberData } from "../api/salon/hooks";
import { useEffect, useState } from "react";
import Skeleton from "../components/Skeleton";
import { useGalleryViewSetState } from "../providers/GalleryViewData";
import { Barber, BarberCategoryGallery, defaultBarber } from "../lib/barber";
import { useGetBarberCategoryGallery } from "../api/barber/hooks";

import BackLight from "../images/common/back-light.svg";
import BackDark from "../images/common/back-dark.svg";
import Star from "../images/common/star.svg";
import Button from "../components/Button";
import Arrow from "../images/common/arrow.svg";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Heart from "../images/common/heart.svg";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HeartActive from "../images/common/heart-active.svg";
import BarberPageSelectCategoryModal from "../components/modals/BarberPageSelectCategoryModal";

export default function BarberPage() {
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const url_array = pathname.split("/");
  const barber_slug = url_array[url_array.length - 1];
  const category_slug = searchParams.get("category");

  const navigate = useNavigate();
  const goBack = () =>
    state?.backlink ? navigate(state.backlink) : navigate("/");
  const navigateToComments = () => navigate("comments");

  const [posterLoading, setPosterLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const openModal = useOpenModal();
  const openReserveModal = () => {
    if (barber) {
      openModal(
        <ReserveModal
          data={barber || defaultBarber}
          barber_slug={barber_slug}
          service_category={category_slug || ""}
          reserved_orders={barber.reserved_orders}
        />
      );
    }
  };
  const openBarberPageSelectCategoryModal = () =>
    openModal(
      <BarberPageSelectCategoryModal
        pathname={pathname}
        barber_slug={barber_slug}
      />
    );

  const [barber, setBarber] = useState<Barber | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const openToast = useOpenToast();

  const getBarberData = useGetBarberData();
  const getBarberComments = useGetBarberComments();

  useEffect(() => {
    getBarberData({
      barber_slug,
      setBarber,
      customFunction() {
        setCommentsLoading(true);
        getBarberComments({
          barber_slug,
          filters: { limit: 1 },
          setComments,
          onError(error) {
            openToast(error.message);
          },
          onFinally() {
            setCommentsLoading(false);
          },
        });
      },
      onError(error) {
        openToast(error.message);
      },
    });
  }, []);

  const [gallery, setGallery] = useState<BarberCategoryGallery[]>([]);
  const getBarberCategoryGallery = useGetBarberCategoryGallery();
  useEffect(() => {
    if (barber) {
      setGalleryLoading(true);
      getBarberCategoryGallery({
        barber_slug: barber.slug,
        setGallery,
        onError(error) {
          openToast(error.message);
        },
        onFinally() {
          setGalleryLoading(false);
        },
      });
    }
  }, [barber]);

  const [activePhotoIndex, setActivePhotoIndex] = useState(-1);
  const setGalleryViewData = useGalleryViewSetState();
  const openGalleryView = () => {
    setGalleryViewData({
      data: gallery,
      isOpen: true,
      activePhotoIndex,
    });
    setActivePhotoIndex(-1);
  };
  useEffect(() => {
    if (activePhotoIndex !== -1) {
      openGalleryView();
    }
  }, [activePhotoIndex]);

  useEffect(() => {
    if (category_slug && barber) {
      openReserveModal();
    }
  }, [category_slug, barber]);

  return (
    <div className="w-screen h-[100dvh] overflow-y-auto flex flex-col gap-[3.5dvw]">
      <div className="w-full -mt-[0.1dvh] relative">
        <div className="w-full -mt-[0.1dvh] relative">
          <img
            alt="پوستر آرایشگر"
            className={`w-full h-[63dvw] object-cover ${
              posterLoading ? "hidden" : "block"
            }`}
            src={barber?.poster_url}
            onLoad={() => setPosterLoading(false)}
          />
          <Skeleton
            className={`h-[63dvw] rounded-none ${
              posterLoading ? "block" : "hidden"
            }`}
          />
          <div className="w-full h-full absolute left-0 top-0 z-[1] flex flex-col px-[4dvw] pt-[4dvw] bg-black/30"></div>
        </div>
        <div className="w-full h-full absolute left-0 top-0 z-[1] flex flex-col px-[4dvw] pt-[4dvw] bg-black/30">
          <div className="w-full flex justify-between">
            <div className="flex justify-end items-center">
              {/* <button
                onClick={() => {
                  const prev = window.localStorage.getItem(
                    "favorite-barbers"
                  ) as unknown as String[];

                  window.localStorage.setItem(
                    "favorite-barbers",
                    [...prev, barber?.slug].toString()
                  );
                }}
              >
                <img
                  alt="برشگت"
                  className="w-[6dvw] h-[6dvw] hidden dark:block"
                  src={
                    (
                      (window.localStorage.getItem(
                        "favorite-barbers"
                      ) as unknown as String[]) || []
                    ).find((e) => e === barber?.slug)
                      ? HeartActive
                      : Heart
                  }
                />
              </button> */}
            </div>
            <div className="flex justify-end items-center">
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
      </div>
      <div className="w-full flex flex-col px-[4dvw] pt-[4dvw] pb-[10dvw] gap-[4dvh] -mt-[1dvh]">
        <div className="flex flex-col gap-[3dvw]">
          <div className="w-full flex justify-between items-center gap-[2.5dvw] px-[1dvw]">
            {barber ? (
              <span className="text-[8dvw]">
                {barber.user_detail.full_name}
              </span>
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
                  {barber.order_comment_quantity} نظر
                </span>
              ) : (
                <Skeleton className="w-[16dvw] h-[5dvw]" />
              )}
            </div>
          </div>
          {category_slug ? (
            barber ? (
              <div className="w-full flex gap-[3dvw]">
                <Button
                  label="خدمات"
                  type="button"
                  onClick={openBarberPageSelectCategoryModal}
                  className="flex-1"
                />
                <Button
                  label="رزرو"
                  type="button"
                  onClick={openReserveModal}
                  className="flex-1 !border-primary text-primary hover:bg-primary hover:text-white"
                />
              </div>
            ) : (
              <Skeleton className="w-full h-[12.3dvw]" />
            )
          ) : (
            <Button
              label="خدمات"
              type="button"
              onClick={openBarberPageSelectCategoryModal}
              className="w-full !border-primary text-primary hover:bg-primary hover:text-white"
            />
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
        <div className="w-full flex flex-col gap-[1dvw]">
          <span className="text-[6dvw]">آدرس</span>
          {barber ? (
            <span className="text-gray_002">{barber?.address}</span>
          ) : (
            <div className="flex flex-col gap-[3dvw]">
              <Skeleton className="w-full h-[5dvw]" />
              <Skeleton className="w-full h-[5dvw]" />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-[2.5dvw]">
          <span className="text-[6dvw]">نمونه کار ها</span>
          <div className="w-full grid grid-cols-3 gap-[1dvw]">
            {!galleryLoading ? (
              gallery && gallery.length ? (
                gallery.slice(0, 8).map((photo, i) => (
                  <button
                    key={photo.slug}
                    onClick={() => setActivePhotoIndex(i)}
                    className="col-span-1"
                  >
                    <img
                      alt={photo.alt_image_name}
                      onLoad={(e) => (e.currentTarget.style.animation = "none")}
                      className="w-full h-[33dvw] object-cover bg-gray_001 dark:bg-gray_005 animate-pulse"
                      src={photo.image_url}
                    />
                  </button>
                ))
              ) : (
                <span className="text-gray_002 -mt-[2dvw] col-span-3">
                  نمونه کاری بارگذاری نشده است!
                </span>
              )
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
                <div className="col-span-1">
                  <Skeleton className="h-[33dvw] rounded-none" />
                </div>
              </>
            )}
            {gallery && gallery.length ? (
              <button
                onClick={() => setActivePhotoIndex(0)}
                className="col-span-1 flex justify-center items-center gap-[1.5dvw]"
              >
                <span>بیشتر</span>
                <img alt="فلش" className="w-[4dvw] h-[4dvw]" src={Arrow} />
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-[3dvw]">
          <span className="text-[6dvw]">نظرات</span>
          <div className="w-full flex flex-col gap-[2dvh]">
            {!commentsLoading ? (
              comments.length ? (
                <>
                  <CommentComponent data={comments[0]} />
                  <Button
                    label="بیشتر"
                    type="button"
                    onClick={navigateToComments}
                  />
                </>
              ) : (
                <span className="text-gray_002 -mt-[2dvw]">
                  هنوز نظری ثبت نشده است!
                </span>
              )
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
