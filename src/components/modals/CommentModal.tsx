import { Formik } from "formik";
import Button from "../Button";
import { useState } from "react";

import Star from "../../images/common/star.svg";
import StarOutline from "../../images/common/star-outline.svg";
import BarberCard from "../BarberCard";

export default function CommentModal() {
  const [starCount, setStarCount] = useState<number>(0);

  return (
    <div className="w-full flex flex-col gap-[4dvw]">
      <Formik initialValues={{ commnet: "" }} onSubmit={() => {}}>
        {({ handleBlur, handleChange, values, handleSubmit }) => (
          <>
            <div className="flex flex-col gap-[2dvw]">
              <span className="text-[5.5dvw]">نظر خود را ینویسید</span>
              <div className="w-full flex flex-col gap-[3.5dvw] relative">
                <div className="w-full flex flex-col">
                  <BarberCard orientation="row" type="comment" />
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
