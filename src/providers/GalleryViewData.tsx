import { createContext, useContext } from "react";
import { useState } from "react";
import { Photo } from "../lib/salon";

export type GalleryViewType = {
  activePhotoIndex: number;
  data: Photo[];
  isOpen: boolean;
};

const GalleryViewState = createContext<GalleryViewType>({
  activePhotoIndex: -1,
  data: [],
  isOpen: false,
});

export type GalleryViewSetStateType = (value: GalleryViewType) => void;
const GalleryViewSetState = createContext<GalleryViewSetStateType>(
  (value: GalleryViewType) => {}
);

type GalleryViewCloseType = () => void;
const GalleryViewClose = createContext<GalleryViewCloseType>(() => {});

interface Props {
  children: React.ReactNode;
}
const GalleryViewProvider = ({ children }: Props) => {
  const [data, setData] = useState<GalleryViewType>({
    activePhotoIndex: -1,
    data: [],
    isOpen: false,
  });

  const closeGalleryView = () => {
    setData({
      activePhotoIndex: -1,
      data: [],
      isOpen: false,
    });
  };

  return (
    <GalleryViewState.Provider value={data}>
      <GalleryViewSetState.Provider value={setData}>
        <GalleryViewClose.Provider value={closeGalleryView}>
          {children}
        </GalleryViewClose.Provider>
      </GalleryViewSetState.Provider>
    </GalleryViewState.Provider>
  );
};

const useGalleryViewState = () => {
  return useContext(GalleryViewState);
};
const useGalleryViewSetState = () => {
  return useContext(GalleryViewSetState);
};
const useGalleryViewClose = () => {
  return useContext(GalleryViewClose);
};

export {
  GalleryViewProvider,
  useGalleryViewState,
  useGalleryViewSetState,
  useGalleryViewClose,
};
