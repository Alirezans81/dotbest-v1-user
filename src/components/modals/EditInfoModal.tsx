import { Formik } from "formik";
import Button from "../Button";
import Input from "../Input";
import { useState } from "react";

export default function EditInfoModal() {
  const [step, setStep] = useState<"info" | "code">("info");

  return (
    <Formik
      initialValues={{
        phone: "09386127081",
        name: "ماهتیسا درویشی",
        code: "",
      }}
      onSubmit={() => {
        if (step === "info") {
          setStep("code");
        }
      }}
    >
      {({ handleBlur, handleChange, values, handleSubmit, setFieldValue }) => (
        <div className={`w-full relative flex flex-col gap-[4dvw]`}>
          <div
            className={`flex flex-col gap-[2dvw] ${
              step === "info" ? "opacity-100" : "opacity-0 z-[-1]"
            }`}
          >
            <span className="text-[5.5dvw]">مشخصات خود را وارد کنید</span>
            <div className="w-full flex flex-col gap-[2dvw]">
              <Input
                attributes={{
                  name: "phone",
                  onChange: handleChange,
                  onBlur: handleBlur,
                  value: values.phone,
                  placeholder: "شماره موبایل",
                  inputMode: "decimal",
                }}
                className="w-full"
              />
              <Input
                attributes={{
                  name: "name",
                  onChange: handleChange,
                  onBlur: handleBlur,
                  value: values.name,
                  placeholder: "نام و نام خانوادگی",
                }}
                className="w-full"
              />
            </div>
          </div>
          <div
            className={`w-full absolute flex flex-col gap-[2dvw] top-[1.5dvw] ${
              step === "info" ? "opacity-0 z-[-1]" : "opacity-100"
            }`}
          >
            <span>کد ارسال شده به شماره خود را وارد کنید</span>
            <div className="w-full flex flex-col gap-[2dvw]">
              <Input
                attributes={{
                  name: "code",
                  onChange: handleChange,
                  onBlur: handleBlur,
                  value: values.code,
                  placeholder: "کد",
                  inputMode: "decimal",
                  maxLength: 6,
                }}
                className="w-full"
              />
            </div>
          </div>
          <Button type="button" label="تایید" onClick={handleSubmit} />
        </div>
      )}
    </Formik>
  );
}
