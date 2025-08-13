/* eslint-disable react-hooks/exhaustive-deps */
import Input from "../components/Input";
import FilterLight from "../images/common/filter-light.svg";
import FilterDark from "../images/common/filter-dark.svg";
import SearchIcon from "../images/common/search.svg";
import ReportCard from "../components/ReportCard";
import ReportFilterModal from "../components/modals/ReportFilterModal";
import { useOpenModal } from "../hooks/popups";
import { useEffect, useRef, useState } from "react";
import { Order } from "../lib/common";
import { useGetReports } from "../api/user/hooks";
import Skeleton from "../components/Skeleton";
import EmptyListMessage from "../components/EmptyListMessage";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

export default function Reports() {
  const [searchParams] = useSearchParams();

  const openModal = useOpenModal();
  const openReportFilterModal = () => openModal(<ReportFilterModal />);

  const pageRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [reports, setReports] = useState<Order[]>([]);
  const getReports = useGetReports();

  const [page, setPage] = useState(0); // offset index
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchReports = (append = false, pageNum = 0) => {
    if (append) setIsFetchingMore(true);
    else setLoading(true);

    getReports({
      setReports: (newReports) => {
        if (append) {
          setReports((prev) => [...prev, ...newReports]);
        } else {
          setReports(newReports);
        }
      },
      filtersObject: {
        category: searchParams.get("category"),
        search,
        limit: 10,
        offset: pageNum * 10,
      },
      customFunction(data, { count }) {
        // If fewer than limit received, no more data
        if (reports.length + data.length >= count) setHasMore(false);
      },
      onFinnally() {
        if (append) setIsFetchingMore(false);
        else setLoading(false);
      },
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(0);
      setHasMore(true);
      fetchReports(false, 0);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        (pageRef.current?.scrollTop || 0) >=
        (pageRef.current?.scrollHeight || 0) - (window.innerHeight || 0) * 1.1;

      if (bottomReached && hasMore && !isFetchingMore && !loading) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchReports(true, nextPage);
      }
    };

    pageRef.current?.addEventListener("scroll", handleScroll);
    return () => pageRef.current?.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, isFetchingMore, loading]);

  const isNowAfterEnd = (
    dateString: string,
    timeString: string,
    duration: string
  ) => {
    const now = dayjs();

    // Combine given date and time to get the start time
    const startTime = dayjs(`${dateString}T${timeString}`);

    // Parse duration into milliseconds
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    const durationMs = (hours * 3600 + minutes * 60 + seconds) * 1000;

    // Calculate end time
    const endTime = startTime.add(durationMs, "millisecond");

    // Check if now is after end time
    return now.isAfter(endTime);
  };

  return (
    <div
      ref={pageRef}
      className="w-full max-h-full overflow-y-auto flex flex-col gap-[2dvh] px-[5dvw] py-[4dvw]"
    >
      <div className="flex items-center gap-[4dvw]">
        <div className="flex-1 relative">
          <Input
            className="w-full"
            attributes={{
              placeholder: "نام سالن، آرایشگر، خدمت...",
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
        {!loading ? (
          reports.length ? (
            <>
              {reports.map((report) => (
                <ReportCard
                  key={report.slug}
                  data={report}
                  refreshReports={fetchReports}
                  hasPassed={isNowAfterEnd(
                    report.date,
                    report.time,
                    report.duration
                  )}
                />
              ))}
              {hasMore && <Skeleton className="w-full h-[72.75dvw]" />}
            </>
          ) : (
            <EmptyListMessage className="h-[73dvh]" />
          )
        ) : (
          <>
            <Skeleton className="w-full h-[72.75dvw]" />
            <Skeleton className="w-full h-[72.75dvw]" />
            <Skeleton className="w-full h-[72.75dvw]" />
          </>
        )}
      </div>
    </div>
  );
}
