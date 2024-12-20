/* eslint-disable react-hooks/exhaustive-deps */
import { Formik } from "formik";
import Dropdown from "../Dropdown";
import Button from "../Button";
import {
  useCreateTicket,
  useGetTicketCategories,
} from "../../api/common/hooks";
import { useEffect, useState } from "react";
import { defaultTicket, Ticket, TicketCategory } from "../../lib/common";
import Skeleton from "../Skeleton";
import { useModalDataClose } from "../../providers/ModalProvider";
import { useOpenToast } from "../../hooks/popups";

export default function SupportModal() {
  const closeModal = useModalDataClose();
  const openToast = useOpenToast();
  const openSuccessToast = () => {
    openToast(
      "تیکت شما با موفقیت ثبت شد! گروه پشتیبانی ما در اسرع وقت باهاتون تماس خواهند گرفت."
    );
  };

  const [ticketCategories, setTicketCategories] = useState<TicketCategory[]>(
    []
  );
  const getTicketCategories = useGetTicketCategories();
  useEffect(() => {
    getTicketCategories({
      setTicketCategories,
      onError(error) {
        openToast(error.message);
      },
    });
  }, []);

  const createTicket = useCreateTicket();

  const validateForm = (values: { subject: string; message: string }) => {
    if (!values.subject || !values.message) {
      return false;
    }
    return true;
  };

  return (
    <div className="w-full flex flex-col gap-[4dvw]">
      <Formik
        initialValues={{ subject: "", message: "" }}
        onSubmit={(values) => {
          console.log(values);
          if (validateForm(values)) {
            let params: Ticket = defaultTicket;
            params.title =
              ticketCategories.find((e) => e.url === values.subject)?.title ||
              "";
            params.category = values.subject;
            params.description = values.message;

            createTicket({
              params,
              customFunction() {
                closeModal();
                openSuccessToast();
              },
            });
          }
        }}
      >
        {({
          handleBlur,
          handleChange,
          values,
          handleSubmit,
          setFieldValue,
        }) => (
          <>
            <div className="flex flex-col gap-[2dvw]">
              <span className="text-[5.5dvw]">مشکل خود را در زیر بنویسید</span>
              <div className="w-full flex flex-col gap-[3.5dvw]">
                {ticketCategories.length ? (
                  <>
                    <Dropdown
                      options={ticketCategories.map((e) => e.title)}
                      onChange={(e) =>
                        setFieldValue(
                          "subject",
                          ticketCategories.find(
                            (element) => element.title === e.value
                          )?.url
                        )
                      }
                      placeholder="موضوع"
                    />
                    <textarea
                      name="message"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.message}
                      className="w-full bg-transparent min-h-[40dvh] transition-all duration-100 border rounded-[5dvw] border-gray_001 px-[5dvw] dark:border-gray_004 py-[2.5dvw] focus:outline-black"
                      placeholder="بنویسید..."
                    />
                  </>
                ) : (
                  <>
                    <Skeleton className="w-full h-[13.25dvw] !rounded-full" />
                    <Skeleton className="w-full h-[40dvh]" />
                  </>
                )}
              </div>
            </div>
            <Button type="button" label="تایید" onClick={handleSubmit} />
          </>
        )}
      </Formik>
    </div>
  );
}
