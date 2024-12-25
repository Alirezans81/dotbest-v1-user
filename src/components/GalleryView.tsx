import { useEffect, useState } from "react";
import {
  GalleryViewType,
  useGalleryViewClose,
} from "../providers/GalleryViewData";

import Close from "../images/common/close.svg";

interface Props {
  data: GalleryViewType;
}
export default function GalleryView({ data }: Props) {
  const { isOpen, data: d, activePhotoIndex } = data;
  console.log(d);
  const closeGalleryView = useGalleryViewClose();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(-1);
  useEffect(() => {
    setSelectedPhotoIndex(activePhotoIndex);
  }, [activePhotoIndex]);

  return (
    <div
      className={`absolute left-0 top-0 w-screen h-[100dvh] bg-black/70 backdrop-blur-md transition-all duration-200 flex ${
        isOpen ? "z-40 opacity-100" : "z-[-10] opacity-0"
      }`}
    >
      <div className="w-full h-full flex justify-center items-center relative">
        <div className="absolute top-0 w-full flex justify-center">
          <span>{d[selectedPhotoIndex]?.alt_name}</span>
        </div>
        <button
          onClick={closeGalleryView}
          className="absolute right-[4dvw] top-[5dvw] backdrop-blur-xl rounded-full p-[1.5dvw]"
        >
          <img alt="بستن" className="w-[8dvw] h-[8dvw]" src={Close} />
        </button>
        <img
          alt={d[selectedPhotoIndex]?.alt_name}
          className="w-full max-h-full object-cover"
          src={d[selectedPhotoIndex]?.image}
        />
      </div>
    </div>
  );
}
