/* eslint-disable react-hooks/exhaustive-deps */
import Input from "../components/Input";
import FilterLight from "../images/common/filter-light.svg";
import FilterDark from "../images/common/filter-dark.svg";
import SearchIcon from "../images/common/search.svg";
import ReportCard from "../components/ReportCard";
import ReportFilterModal from "../components/modals/ReportFilterModal";
import { useOpenModal, useOpenToast } from "../hooks/popups";
import { useEffect, useState } from "react";
import { Reservation } from "../lib/common";
import { useGetReports } from "../api/user/hooks";
import Skeleton from "../components/Skeleton";
import EmptyListMessage from "../components/EmptyListMessage";

export default function Reports() {
  const openModal = useOpenModal();
  const openReportFilterModal = () => openModal(<ReportFilterModal />);

  const [reports, setReports] = useState<Reservation[]>([]);
  const [reportsIsEmpty, setReportsIsEmpty] = useState(false);
  const getReports = useGetReports();

  const openToast = useOpenToast();

  useEffect(() => {
    getReports({
      setReports,
      customFunction: (data) => !data.length && setReportsIsEmpty(true),
      onError(error) {
        openToast(error.message);
      },
    });
  }, []);

  return (
    <div className="w-full max-h-full overflow-y-auto flex flex-col gap-[2dvh] px-[5dvw] py-[4dvw]">
      <div className="flex items-center gap-[4dvw]">
        <div className="flex-1 relative">
          <Input
            className="w-full"
            attributes={{ placeholder: "نام سالن، آرایشگر، خدمت..." }}
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
        <button onClick={openReportFilterModal}>
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
        {!reportsIsEmpty ? (
          reports.length ? (
            reports.map((report, i) => <ReportCard key={i} />)
          ) : (
            <>
              <Skeleton className="w-full h-[72.75dvw]" />
              <Skeleton className="w-full h-[72.75dvw]" />
            </>
          )
        ) : (
          <EmptyListMessage className="h-[73dvh]" />
        )}
      </div>
    </div>
  );
}
