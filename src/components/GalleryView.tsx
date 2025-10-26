import { useEffect, useState } from "react";
import {
  useGalleryViewClose,
  useGalleryViewState,
} from "../providers/GalleryViewData";

import Close from "../images/common/close.svg";
import Arrow from "../images/common/back-light.svg";

export default function GalleryView() {
  const { isOpen, data, activePhotoIndex } = useGalleryViewState();
  const closeGalleryView = useGalleryViewClose();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(-1);
  useEffect(() => {
    setSelectedPhotoIndex(activePhotoIndex);
  }, [activePhotoIndex]);
  useEffect(() => {
    !isOpen && setSelectedPhotoIndex(-1);
  }, [isOpen]);

  const prev = () =>
    selectedPhotoIndex > 0 && setSelectedPhotoIndex((prev) => prev - 1);
  const next = () =>
    selectedPhotoIndex < data.length - 1 &&
    setSelectedPhotoIndex((prev) => prev + 1);

  return (
    <div
      className={`absolute left-0 top-0 w-screen h-[100dvh] bg-black/70 backdrop-blur-md transition-all duration-200 flex pb-[10dvw] ${
        isOpen ? "z-40 opacity-100" : "z-[-10] opacity-0"
      }`}
    >
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="w-full flex-1">
          <div className="w-full flex justify-between items-center px-[4dvw] py-[5dvw]">
            <button
              onClick={closeGalleryView}
              className="backdrop-blur-xl rounded-full p-[1.5dvw]"
            >
              <img alt="بستن" className="w-[8dvw] h-[8dvw]" src={Close} />
            </button>
            <div className="flex justify-center text-[7dvw]">
              <span>{data[selectedPhotoIndex]?.alt_image_name}</span>
            </div>
            <div className="w-[10dvw] h-[10dvw]"></div>
          </div>
        </div>
        <div className="w-full relative">
          {selectedPhotoIndex !== 0 && (
            <button
              onClick={prev}
              className="absolute top-0 right-[2dvw] h-full"
            >
              <div className="bg-black rounded-full p-[1.5dvw]">
                <img
                  alt=""
                  className="w-[5dvw] h-[5dvw] rotate-180"
                  src={Arrow}
                />
              </div>
            </button>
          )}
          <img
            alt={data[selectedPhotoIndex]?.alt_image_name}
            className="w-full max-h-full object-cover"
            src={data[selectedPhotoIndex]?.image_url}
          />
          {selectedPhotoIndex !== data.length - 1 && (
            <button
              onClick={next}
              className="absolute top-0 left-[2dvw] h-full"
            >
              <div className="bg-black rounded-full p-[1.5dvw]">
                <img alt="" className="w-[5dvw] h-[5dvw]" src={Arrow} />
              </div>
            </button>
          )}
        </div>
        <div className="w-full flex-1 flex flex-col justify-end">
          <span className="text-center text-[5.5dvw]">
            {data[selectedPhotoIndex]?.description}
          </span>
        </div>
      </div>
    </div>
  );
}
