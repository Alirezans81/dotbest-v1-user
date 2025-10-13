import { Formik } from "formik";
import Input from "../Input";
import Button from "../Button";
import { useAddComma } from "../../hooks/number";

import Note from "../../images/common/note.svg";

export default function WithdrawModal() {
  const addComma = useAddComma();

  return (
    <Formik
      initialValues={{ amount: "", bank_info: "" }}
      onSubmit={(values) => {}}
    >
      {({ handleBlur, handleChange, values, setFieldValue, handleSubmit }) => (
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
                  onClick={() => setFieldValue("amount", "17580000")}
                  className={`absolute left-[5.5dvw] top-[3.75dvw] text-[4.5dvw] transition-all duration-200 ${
                    values.amount !== "17580000" && "text-gray_002"
                  }`}
                >
                  حداکثر
                </button>
              </div>
              <Input
                attributes={{
                  name: "bank_info",
                  onChange: handleChange,
                  onBlur: handleBlur,
                  value: values.bank_info,
                  placeholder: "شماره کارت/شماره شبا",
                }}
                className="w-full"
              />
              <div className="w-full">
                <img
                  alt="توجه"
                  className="w-[5dvw] h-[5dvw] inline ml-[1dvw] -mt-[0.5dvw]"
                  src={Note}
                />
                <span className="text-gray_002 inline">
                  شماره کارت/شماره شبا وارد شده می‌بایست به نام خودتان باشد.
                </span>
              </div>
            </div>
          </div>
          <Button type="button" label="تایید" onClick={handleSubmit} />
        </div>
      )}
    </Formik>
  );
}
