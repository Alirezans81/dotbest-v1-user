/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetBarberComments, useGetSalonComments } from "../api/salon/hooks";
import { Comment } from "../lib/salon";
import { useOpenToast } from "../hooks/popups";
import NavigationLayout from "../components/NavigationLayout";
import CommentComponent from "../components/Comment";
import Skeleton from "../components/Skeleton";

export default function Comments() {
  const { pathname } = useLocation();

  const [comments, setComments] = useState<Comment[]>([]);

  const getSalonComments = useGetSalonComments();
  const getBarberComments = useGetBarberComments();

  const openToast = useOpenToast();

  useEffect(() => {
    const pathnameArray = pathname.split("/");

    if (pathnameArray[pathnameArray.length - 4] === "salon") {
      const salon_slug = pathnameArray[pathnameArray.length - 3];
      getSalonComments({
        salon_slug,
        setComments,
        onError(error) {
          openToast(error.message);
        },
      });
    } else {
      const barber_slug = pathnameArray[pathnameArray.length - 3];
      getBarberComments({
        barber_slug,
        setComments,
        onError(error) {
          openToast(error.message);
        },
      });
    }
  }, []);

  return (
    <NavigationLayout label="نظرات">
      <div className="w-full h-full flex flex-col gap-[2dvh]">
        {comments.length ? (
          comments.map((comment, i) => (
            <CommentComponent key={i} data={comment} />
          ))
        ) : (
          <>
            <Skeleton className="w-full h-[43dvw]" />
            <Skeleton className="w-full h-[43dvw]" />
            <Skeleton className="w-full h-[43dvw]" />
            <Skeleton className="w-full h-[43dvw]" />
          </>
        )}
      </div>
    </NavigationLayout>
  );
}
