import { Formik } from "formik";
import Input from "../Input";
import Button from "../Button";
import { useAddComma } from "../../hooks/number";
import { useState } from "react";
import {
  defaultWalletCard,
  defaultWithdrawal,
  WalletCard,
  Withdrawal,
} from "../../lib/common";
import {
  useCreateWalletCard,
  useCreateWithdrawal,
  useGetWalletCards,
} from "../../api/common/hooks";
import { useEffect } from "react";
import Skeleton from "../Skeleton";
import { useWalletState } from "../../providers/WalletProvider";
import { useModalDataClose } from "../../providers/ModalProvider";

import Note from "../../images/common/note.svg";

interface Props {
  refresh: () => void;
}
export default function WithdrawModal({ refresh }: Props) {
  const addComma = useAddComma();
  const wallet = useWalletState();
  const closeModal = useModalDataClose();

  const [walletCards, setWalletCards] = useState<WalletCard[]>([]);
  const [walletCardsLoading, setWalletCardsLoading] = useState(false);
  const getWalletCards = useGetWalletCards();
  const [search, setSearch] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setWalletCardsLoading(true);
      getWalletCards({
        search,
        setWalletCards,
        onFinally() {
          setWalletCardsLoading(false);
        },
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const [loading, setLoading] = useState(false);
  const createWalletCard = useCreateWalletCard();
  const createWithdrawal = useCreateWithdrawal();
  const handleSubmit = (values: { amount: string; bank_info: string }) => {
    const foundWalletCard = walletCards.find(
      (card) => card.shaba_number === "IR" + values.bank_info
    );

    if (foundWalletCard) {
      let data: Withdrawal = defaultWithdrawal;

      data.wallet_card = foundWalletCard.url;
      data.amount = values.amount.replaceAll(",", "");

      setLoading(true);
      createWithdrawal({
        data,
        customFunction() {
          refresh();
          closeModal();
        },
        onFinally() {
          setLoading(false);
        },
      });
    } else {
      let walletCardData: WalletCard = defaultWalletCard;

      walletCardData.wallet = wallet.url;
      walletCardData.shaba_number = "IR" + values.bank_info;

      setLoading(true);
      createWalletCard({
        data: walletCardData,
        customFunction(data) {
          let withdrawalData: Withdrawal = defaultWithdrawal;

          withdrawalData.wallet_card = data.url;
          withdrawalData.amount = values.amount.replaceAll(",", "");

          createWithdrawal({
            data: withdrawalData,
            customFunction() {
              refresh();
              closeModal();
            },
            onFinally() {
              setLoading(false);
            },
          });
        },
        onError() {
          setLoading(false);
        },
      });
    }
  };

  return (
    <Formik
      initialValues={{ amount: "", bank_info: "" }}
      validate={(values) => {
        const errors: any = {};
        if (!values.amount) {
          errors.amount = "مقدار برداشت خود را وارد کنید!";
        }
        if (!values.bank_info) {
          errors.bank_info = "شماره شبا را وارد کنید!";
        }
        if (!/^\d{24}$/.test(values.bank_info)) {
          errors.bank_info = "شماره شبا صحیح نیست!";
        }
        return errors;
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({
        handleBlur,
        handleChange,
        values,
        setFieldValue,
        handleSubmit,
        errors,
      }) => (
        <div className={`w-full relative flex flex-col gap-[4dvw]`}>
          <div className={`flex flex-col gap-[2dvw]`}>
            <span className="text-[5.5dvw]">اطلاعات را تکمیل کنید</span>
            <div className="w-full flex flex-col gap-[2dvw]">
              <div className="w-full relative">
                <Input
                  attributes={{
                    name: "amount",
                    onChange: handleChange,
                    onBlur: handleBlur,
                    value: addComma(values.amount),
                    placeholder: "مبلغ",
                    inputMode: "decimal",
                  }}
                  className="w-full"
                />
                <button
                  onClick={() => setFieldValue("amount", wallet.balance)}
                  className={`absolute left-[5.5dvw] top-[3.75dvw] text-[4.5dvw] transition-all duration-200 ${
                    values.amount !== wallet.balance && "text-gray_002"
                  }`}
                >
                  حداکثر
                </button>
              </div>
              {errors.amount && (
                <span className="text-error text-[4.5dvw]">
                  {errors.amount}
                </span>
              )}
              <div className="w-full relative">
                <Input
                  attributes={{
                    name: "bank_info",
                    onChange: handleChange,
                    onInput: (e) => setSearch(e.currentTarget.value),
                    onBlur: handleBlur,
                    value: values.bank_info,
                    placeholder: "شماره شبا",
                    maxLength: 24,
                  }}
                  className="w-full"
                />
                <span
                  className={`absolute left-[5.5dvw] top-[3.5dvw] text-[3.75dvw] font-eng`}
                >
                  IR
                </span>
              </div>
              {errors.bank_info && (
                <span className="text-error text-[4.5dvw]">
                  {errors.bank_info}
                </span>
              )}
              {walletCardsLoading ? (
                <Skeleton className="w-full h-[12dvw]" />
              ) : (
                <div
                  className={`w-full flex flex-col gap-[4dvw] ${
                    walletCards.filter(
                      (card) => card.shaba_number !== "IR" + values.bank_info
                    ).length !== 0
                      ? "mt-[2dvw]"
                      : ""
                  }`}
                >
                  {walletCards.map(
                    (card) =>
                      card.shaba_number !== "IR" + values.bank_info && (
                        <div
                          key={card.slug}
                          className="flex items-center justify-between bg-gray_001/50 dark:bg-gray_004/50 pl-[2dvw] pr-[4dvw] py-[2dvw] rounded-full"
                        >
                          <span>{card.shaba_number}</span>
                          <Button
                            type="button"
                            label="انتخاب"
                            className="px-[5dvw] !py-[1.5dvw] text-[4.5dvw] !bg-white dark:!bg-black"
                            onClick={() =>
                              setFieldValue(
                                "bank_info",
                                card.shaba_number.replace("IR", "").trim()
                              )
                            }
                          />
                        </div>
                      )
                  )}
                </div>
              )}
              <div className="w-full">
                <img
                  alt="توجه"
                  className="w-[5dvw] h-[5dvw] inline ml-[1dvw] -mt-[0.5dvw]"
                  src={Note}
                />
                <span className="text-gray_002 inline">
                  شماره شبا وارد شده می‌بایست به نام خودتان باشد.
                </span>
              </div>
            </div>
          </div>
          <Button
            type="button"
            disabled={loading}
            label={loading ? "در حال بارگذاری..." : "تایید"}
            onClick={handleSubmit}
          />
        </div>
      )}
    </Formik>
  );
}
