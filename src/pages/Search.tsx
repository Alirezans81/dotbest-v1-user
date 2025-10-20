/* eslint-disable react-hooks/exhaustive-deps */
import Input from "../components/Input";
import FilterLight from "../images/common/filter-light.svg";
import FilterDark from "../images/common/filter-dark.svg";
// import MapLight from "../images/common/map-light.svg";
// import MapDark from "../images/common/map-dark.svg";
import SearchIcon from "../images/common/search.svg";
import SearchBarberCard from "../components/SearchBarberCard";
import SearchFilterModal from "../components/modals/SearchFilterModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useOpenModal } from "../hooks/popups";
import { useGetBarbers } from "../api/salon/hooks";
import { useEffect, useState } from "react";
import { Barber } from "../lib/barber";
import Skeleton from "../components/Skeleton";
import EmptyListMessage from "../components/EmptyListMessage";

export default function Search() {
  const [searchParams] = useSearchParams();

  const openModal = useOpenModal();
  const openSearchFilterModal = () => openModal(<SearchFilterModal />);

  // const navigate = useNavigate();
  // const navigateToMap = () => navigate("/map");

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [barbers, setBarbers] = useState<Barber[]>([]);
  const getBarbers = useGetBarbers();

  useEffect(() => {
    setLoading(true);
    getBarbers({
      filtersObject: {
        category: searchParams.get("category"),
        search,
      },
      setBarbers,
      onFinally() {
        setLoading(false);
      },
    });
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      getBarbers({
        filtersObject: {
          category: searchParams.get("category"),
          search,
        },
        setBarbers,
        onFinally() {
          setLoading(false);
        },
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="w-full max-h-full overflow-y-auto flex flex-col gap-[2dvh] px-[5dvw] py-[4dvw]">
      <div className="flex items-center gap-[4dvw]">
        {/* <button onClick={navigateToMap}>
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
        </button> */}
        <div className="flex-1 relative">
          <Input
            className="w-full"
            attributes={{
              placeholder: "نام سالن، آرایشگر...",
              value: search,
              onChange: (e) => {
                setSearch(e.target.value);
              },
            }}
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
        {!loading ? (
          barbers.length ? (
            barbers.map((barber) => (
              <>
                <SearchBarberCard
                  key={barber.slug}
                  data={barber}
                  category={searchParams.get("category") || ""}
                />
              </>
            ))
          ) : searchParams.get("category") ? (
            <EmptyListMessage className="h-[73dvh]" />
          ) : (
            <EmptyListMessage className="h-[73dvh]" message="چیزی یافت نشد!" />
          )
        ) : (
          <>
            <Skeleton className="h-[42.54dvw]" />
            <Skeleton className="h-[42.54dvw]" />
            <Skeleton className="h-[42.54dvw]" />
          </>
        )}
      </div>
    </div>
  );
}
