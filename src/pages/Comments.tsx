/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import NavigationLayout from "../components/NavigationLayout";
import { Comment } from "../lib/salon";
import { useOpenToast } from "../hooks/popups";
import CommentComponent from "../components/Comment";
import Skeleton from "../components/Skeleton";
import { useLocation } from "react-router-dom";
import { useGetBarberComments, useGetSalonComments } from "../api/salon/hooks";

export default function Comments() {
  const { pathname } = useLocation();
  const pathname_array = pathname.split("/");
  const openToast = useOpenToast();

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const getBarberComments = useGetBarberComments();
  const getSalonComments = useGetSalonComments();
  useEffect(() => {
    const type = pathname_array[1];
    const slug = pathname_array[2];

    if (type === "salon") {
      getSalonComments({
        salon_slug: slug,
        filters: { limit: 200 },
        setComments,
        customFunction() {
          setLoading(false);
        },
        onError(error) {
          setLoading(false);
          openToast(error.message);
        },
      });
    } else if (type === "barber") {
      getBarberComments({
        barber_slug: slug || "",
        filters: { limit: 200 },
        setComments,
        customFunction() {
          setLoading(false);
        },
        onError(error) {
          setLoading(false);
          openToast(error.message);
        },
      });
    } else {
      openToast("مشکلی پیش آمده است!");
    }
  }, []);

  return (
    <NavigationLayout
      label="کامنت ها"
      backlink={pathname_array.slice(0, pathname_array.length - 1).join("/")}
    >
      <div className="w-full flex flex-col gap-[2dvh]">
        {loading ? (
          <>
            <Skeleton className="w-full h-[30.81dvw] !rounded-[6dvw]" />
            <Skeleton className="w-full h-[30.81dvw] !rounded-[6dvw]" />
            <Skeleton className="w-full h-[30.81dvw] !rounded-[6dvw]" />
            <Skeleton className="w-full h-[30.81dvw] !rounded-[6dvw]" />
            <Skeleton className="w-full h-[30.81dvw] !rounded-[6dvw]" />
          </>
        ) : (
          comments.map((comment) => (
            <CommentComponent key={comment.slug} data={comment} />
          ))
        )}
      </div>
    </NavigationLayout>
  );
}
