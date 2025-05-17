import { Formik } from "formik";
import Button from "../Button";
import { useState } from "react";
import BarberCard from "../BarberCard";
import { Barber } from "../../lib/barber";

import Star from "../../images/common/star.svg";
import StarOutline from "../../images/common/star-outline.svg";
import { useCreateOrderComment } from "../../api/user/hooks";
import { defaultOrderComment, OrderComment } from "../../lib/common";
import { useModalDataClose } from "../../providers/ModalProvider";
import { useOpenToast } from "../../hooks/popups";

interface Props {
  barber_data: Barber;
  order_url: string;
}
export default function CommentModal({ barber_data, order_url }: Props) {
  const openToast = useOpenToast();
  const closeModal = useModalDataClose();

  const [starCount, setStarCount] = useState<number>(-1);

  const createOrderComment = useCreateOrderComment();
  const handleSubmit = (values: { comment: string }) => {
    let data: OrderComment = defaultOrderComment;

    data.barber = barber_data.url;
    data.order = order_url;
    data.message = values.comment;
    data.rate = starCount;

    createOrderComment({
      data,
      customFunction() {
        closeModal();
        openToast("نظر شما با موفقیت ثبت شد");
      },
    });
  };

  return (
    <div className="w-full flex flex-col gap-[4dvw]">
      <Formik initialValues={{ comment: "" }} onSubmit={handleSubmit}>
        {({ handleBlur, handleChange, values, handleSubmit }) => (
          <>
            <div className="flex flex-col gap-[2dvw]">
              <span className="text-[5.5dvw]">نظر خود را ینویسید</span>
              <div className="w-full flex flex-col gap-[3.5dvw] relative">
                <div className="w-full flex flex-col">
                  <BarberCard
                    data={barber_data}
                    orientation="row"
                    type="comment"
                  />
                  <textarea
                    className="w-full bg-transparent min-h-[30dvh] transition-all duration-100 border-x border-b rounded-b-[5dvw] rounded-t-none border-gray_001 px-[5dvw] dark:border-gray_003 py-[2.5dvw] focus:outline-black"
                    placeholder="بنویسید..."
                  />
                </div>
                <div
                  dir="ltr"
                  className="absolute left-[4dvw] bottom-[4dvw] flex justify-center items-center gap-[1dvw]"
                >
                  <button
                    className="w-[5dvw] h-[5dvw] relative"
                    onClick={() =>
                      starCount !== 1 ? setStarCount(1) : setStarCount(0)
                    }
                  >
                    <img
                      alt="ستاره"
                      className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ${
                        starCount >= 1 ? "opacity-0" : "opacity-100"
                      }`}
                      src={StarOutline}
                    />
                    <img
                      alt="ستاره"
                      className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ${
                        starCount >= 1 ? "opacity-100" : "opacity-0"
                      }`}
                      src={Star}
                    />
                  </button>
                  <button
                    className="w-[5dvw] h-[5dvw] relative"
                    onClick={() =>
                      starCount !== 2 ? setStarCount(2) : setStarCount(0)
                    }
                  >
                    <img
                      alt="ستاره"
                      className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ${
                        starCount >= 2 ? "opacity-0" : "opacity-100"
                      }`}
                      src={StarOutline}
                    />
                    <img
                      alt="ستاره"
                      className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ${
                        starCount >= 2 ? "opacity-100" : "opacity-0"
                      }`}
                      src={Star}
                    />
                  </button>
                  <button
                    className="w-[5dvw] h-[5dvw] relative"
                    onClick={() =>
                      starCount !== 3 ? setStarCount(3) : setStarCount(0)
                    }
                  >
                    <img
                      alt="ستاره"
                      className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ${
                        starCount >= 3 ? "opacity-0" : "opacity-100"
                      }`}
                      src={StarOutline}
                    />
                    <img
                      alt="ستاره"
                      className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ${
                        starCount >= 3 ? "opacity-100" : "opacity-0"
                      }`}
                      src={Star}
                    />
                  </button>
                  <button
                    className="w-[5dvw] h-[5dvw] relative"
                    onClick={() =>
                      starCount !== 4 ? setStarCount(4) : setStarCount(0)
                    }
                  >
                    <img
                      alt="ستاره"
                      className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ${
                        starCount >= 4 ? "opacity-0" : "opacity-100"
                      }`}
                      src={StarOutline}
                    />
                    <img
                      alt="ستاره"
                      className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ${
                        starCount >= 4 ? "opacity-100" : "opacity-0"
                      }`}
                      src={Star}
                    />
                  </button>
                  <button
                    className="w-[5dvw] h-[5dvw] relative"
                    onClick={() =>
                      starCount !== 5 ? setStarCount(5) : setStarCount(0)
                    }
                  >
                    <img
                      alt="ستاره"
                      className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ${
                        starCount >= 5 ? "opacity-0" : "opacity-100"
                      }`}
                      src={StarOutline}
                    />
                    <img
                      alt="ستاره"
                      className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ${
                        starCount >= 5 ? "opacity-100" : "opacity-0"
                      }`}
                      src={Star}
                    />
                  </button>
                </div>
              </div>
            </div>
            <Button type="button" label="تایید" onClick={handleSubmit} />
          </>
        )}
      </Formik>
    </div>
  );
}
