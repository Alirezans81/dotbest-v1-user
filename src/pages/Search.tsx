/* eslint-disable react-hooks/exhaustive-deps */
import Input from "../components/Input";
import FilterLight from "../images/common/filter-light.svg";
import FilterDark from "../images/common/filter-dark.svg";
import MapLight from "../images/common/map-light.svg";
import MapDark from "../images/common/map-dark.svg";
import SearchIcon from "../images/common/search.svg";
import SearchCard from "../components/SearchCard";
import SearchFilterModal from "../components/modals/SearchFilterModal";
import { useNavigate } from "react-router-dom";
import { useOpenModal, useOpenToast } from "../hooks/popups";
import { useGetSalons } from "../api/salon/hooks";
import { useEffect, useState } from "react";
import { Salon } from "../lib/salon";
import Skeleton from "../components/Skeleton";
import EmptyListMessage from "../components/EmptyListMessage";

export default function Search() {
  const openModal = useOpenModal();
  const openSearchFilterModal = () => openModal(<SearchFilterModal />);

  const navigate = useNavigate();
  const navigateToMap = () => {
    navigate("/map");
  };

  const openToast = useOpenToast();

  const [salons, setSalons] = useState<Salon[]>([]);
  const [salonsIsEmpty, setSalonsIsEmpty] = useState(false);
  const getSalons = useGetSalons();
  useEffect(() => {
    getSalons({
      setSalons,
      customFunction: (data) => !data.length && setSalonsIsEmpty(true),
      onError(error) {
        openToast(error.message);
      },
    });
  }, []);

  return (
    <div className="w-full max-h-full overflow-y-auto flex flex-col gap-[2dvh] px-[5dvw] py-[4dvw]">
      <div className="flex items-center gap-[4dvw]">
        <button onClick={navigateToMap}>
          <img
            alt="نقشه"
            className="w-[7dvw] h-[7dvw] block dark:hidden"
            src={MapDark}
          />
          <img
            alt="نقشه"
            className="w-[7dvw] h-[7dvw] hidden dark:block"
            src={MapLight}
          />
        </button>
        <div className="flex-1 relative">
          <Input
            className="w-full"
            attributes={{ placeholder: "نام سالن، آرایشگر..." }}
          />
          <button
            type="submit"
            className="absolute left-[4.5dvw] top-0 h-full flex items-center"
          >
            <img
              alt="جست و جو"
              className="w-[5dvw] h-[5dvw]"
              src={SearchIcon}
            />
          </button>
        </div>

        <button onClick={openSearchFilterModal}>
          <img
            alt="فیلتر"
            className="w-[6dvw] h-[6dvw] block dark:hidden"
            src={FilterLight}
          />
          <img
            alt="فیلتر"
            className="w-[6dvw] h-[6dvw] hidden dark:block"
            src={FilterDark}
          />
        </button>
      </div>
      <div className="flex flex-col gap-[2dvh]">
        {!salonsIsEmpty ? (
          salons.length ? (
            salons.map((salon, i) => (
              <>
                <SearchCard key={i} />
              </>
            ))
          ) : (
            <>
              <Skeleton className="h-[72.25dvw]" />
              <Skeleton className="h-[72.25dvw]" />
            </>
          )
        ) : (
          <EmptyListMessage className="h-[73dvh]" />
        )}
      </div>
    </div>
  );
}
