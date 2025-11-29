import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Formik } from "formik";
import Dropdown from "../../components/Dropdown";
import { useRegister, useSendCode } from "../../api/auth/hooks";
import { UserInitParams } from "../../lib/user";
import { useOpenToast } from "../../hooks/popups";
import { useValidateJalaliDay } from "../../hooks/datetime";
import {
  useValidateMelliCodePattern,
  useValidatePersonalInfo,
} from "../../hooks/auth";
import { monthes } from "../../lib/datetime";

interface Props {
  nextStep: () => void;
  setPhone: (value: string) => void;
  setTempCode: (value: string) => void;
  setUserInitParams: (value: UserInitParams | null) => void;
}
export default function Step1({
  nextStep,
  setPhone,
  setTempCode,
  setUserInitParams,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(false);

  const validateJalaliDay = useValidateJalaliDay();
  const validateMelliCodePattern = useValidateMelliCodePattern();
  const validatePersonalInfo = useValidatePersonalInfo();

  const validatePhone = (value: string, setError: (value: string) => void) => {
    if (!value) {
      setError("شماره موبایل خود را وارد کنید!");
      return false;
    }

    const regex = /^09[0-9]{9}$/;
    if (!regex.test(value)) {
      setError("شماره موبایل معتبر نمی‌باشد!");
      return false;
    }

    return true;
  };
  const validateFirstName = (
    value: string,
    setError: (value: string) => void
  ) => {
    if (!value) {
      setError("نام خود را وارد کنید!");
      return false;
    }
    return true;
  };
  const validateLastName = (
    value: string,
    setError: (value: string) => void
  ) => {
    if (!value) {
      setError("نام خانوادگی خود را وارد کنید!");
      return false;
    }
    return true;
  };
  const validateMelliCode = (
    value: string,
    setError: (value: string) => void
  ) => {
    if (!value) {
      setError("کد ملی خود را وارد کنید!");
      return false;
    }
    if (!validateMelliCodePattern(value)) {
      setError("کد ملی صحیح نمی‌باشد!");
      return false;
    }
    return true;
  };
  const validateBirthday = (
    {
      year,
      month,
      day,
    }: {
      year: string;
      month: string;
      day: string;
    },
    setError: (value: string) => void
  ) => {
    if (!year || !month || !day) {
      setError("تاریخ تولد خود را وارد کنید!");
      return false;
    } else if (!validateJalaliDay(month, +day, +year)) {
      setError("تاریخ تولد خود را صحیح وارد کنید!");
      return false;
    }
    return true;
  };

  const openToast = useOpenToast();

  const sendCode = useSendCode();

  const register = useRegister();

  const navigateToPrivacyPolicy = () => {
    console.log(1);
    window.location.href = "/privacy-policy";
  };

  return (
    <div className="w-full h-[100dvh] px-[6dvw] pt-[5dvw] pb-[10dvw] flex flex-col gap-y-[4dvw] justify-between">
      <Formik
        initialValues={{
          phone: "",
          first_name: "",
          last_name: "",
          melli_code: "",
          birthday_year: "",
          birthday_month: "",
          birthday_day: "",
        }}
        onSubmit={(values, { setFieldError }) => {
          if (!newUser) {
            if (
              validatePhone(values.phone, (value) =>
                setFieldError("phone", value)
              )
            ) {
              setLoading(true);
              sendCode({
                phone: values.phone.slice(1),
                customFunction: (data) => {
                  process.env.REACT_APP_MODE === "DEVELOPMENT" &&
                    setTempCode(data.code);
                  if (data.new_user) {
                    setNewUser(true);
                  } else {
                    setPhone(values.phone);
                    nextStep();
                  }
                },
                onError(error) {
                  openToast(error.message);
                },
                onFinally() {
                  setLoading(false);
                },
              });
            }
          } else {
            if (
              validateFirstName(values.first_name, (value) =>
                setFieldError("first_name", value)
              ) &&
              validateLastName(values.last_name, (value) =>
                setFieldError("last_name", value)
              ) &&
              validateMelliCode(values.melli_code, (value) =>
                setFieldError("melli_code", value)
              ) &&
              validateBirthday(
                {
                  year: values.birthday_year,
                  month: values.birthday_month,
                  day: values.birthday_day,
                },
                (value) => setFieldError("birthday_year", value)
              )
            ) {
              setPhone(values.phone);

              const temp: UserInitParams = {
                phone: values.phone.slice(1),
                first_name: values.first_name,
                last_name: values.last_name,
                melli_code: values.melli_code,
                birthday_year: values.birthday_year,
                birthday_month: values.birthday_month,
                birthday_day: values.birthday_day,
                account_type: "customer",
              };
              setUserInitParams(temp);

              setLoading(true);
              register({
                phone: values.phone.slice(1),
                userParams: temp,
                customFunction(data) {
                  process.env.REACT_APP_MODE === "DEVELOPMENT" &&
                    setTempCode(data.code);
                  nextStep();
                },
                onFinally() {
                  setLoading(false);
                },
              });
            }
          }
        }}
      >
        {({
          handleBlur,
          handleChange,
          values,
          handleSubmit,
          setFieldValue,
          errors,
        }) => (
          <>
            <div className="w-full flex flex-col gap-y-[4dvw]">
              <span className="w-full text-[6dvw]">
                اطلاعات خود را کامل کنید
              </span>
              <div className="w-full flex flex-col gap-y-[2dvw]">
                <Input
                  attributes={{
                    name: "phone",
                    onBlur: handleBlur,
                    onChange: handleChange,
                    value: values.phone,
                    placeholder: "شماره موبایل",
                    inputMode: "decimal",
                    maxLength: 11,
                    style: { width: "100%" },
                  }}
                />
                <span
                  className={`text-error transition-all duration-100 ${
                    errors.phone ? "opacity-100 z-[-10]" : "opacity-0 z-0"
                  }`}
                >
                  {errors.phone}
                </span>

                <div
                  style={{
                    opacity: newUser ? 100 : 0,
                    zIndex: newUser ? 0 : -10,
                    width: "100%",
                  }}
                  className="w-full grid grid-cols-2 gap-[2dvw]"
                >
                  <div className="col-span-1">
                    <Input
                      className="w-full"
                      attributes={{
                        name: "first_name",
                        onBlur: handleBlur,
                        onChange: handleChange,
                        value: values.first_name,
                        placeholder: "نام",
                      }}
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      className="w-full"
                      attributes={{
                        name: "last_name",
                        onBlur: handleBlur,
                        onChange: handleChange,
                        value: values.last_name,
                        placeholder: "نام خانوادگی",
                      }}
                    />
                  </div>
                  <span
                    className={`text-error col-span-2 transition-all duration-100 ${
                      errors.first_name || errors.last_name
                        ? "opacity-100 z-[-10]"
                        : "opacity-0 z-0"
                    }`}
                  >
                    {errors.first_name || errors.last_name}
                  </span>
                </div>

                <Input
                  attributes={{
                    style: {
                      opacity: newUser ? 100 : 0,
                      zIndex: newUser ? 0 : -10,
                      width: "100%",
                    },
                    name: "melli_code",
                    onBlur: handleBlur,
                    onChange: handleChange,
                    value: values.melli_code,
                    maxLength: 10,
                    placeholder: "کد ملی",
                    inputMode: "decimal",
                  }}
                />
                <span
                  className={`text-error transition-all duration-100 ${
                    errors.melli_code ? "opacity-100 z-[-10]" : "opacity-0 z-0"
                  }`}
                >
                  {errors.melli_code}
                </span>

                <div
                  className={`flex flex-col gap-y-[2dvw] duration-100 mt-[2dvw] ${
                    newUser ? "opacity-100 z-0" : "opacity-0 z-[-10]"
                  }`}
                >
                  <span className="text-[5dvw]">تاریخ تولد</span>
                  <div className="flex items-start gap-x-[3dvw]">
                    <Input
                      className="!flex-1"
                      attributes={{
                        name: "birthday_day",
                        onBlur: handleBlur,
                        onChange: handleChange,
                        value: values.birthday_day,
                        inputMode: "decimal",
                        placeholder: "روز",
                        style: {
                          flex: "1 1 0%",
                        },
                        maxLength: 2,
                      }}
                    />
                    <Dropdown
                      options={monthes}
                      onChange={(e) => setFieldValue("birthday_month", e.value)}
                      placeholder="ماه"
                      className="w-[32dvw] h-[12.5dvw]"
                    />
                    <div className="!flex-1 flex flex-col gap-[2dvw]">
                      <Input
                        className="!flex-1"
                        attributes={{
                          name: "birthday_year",
                          onBlur: handleBlur,
                          onChange: handleChange,
                          value: values.birthday_year,
                          inputMode: "decimal",
                          placeholder: "سال",
                          style: {
                            flex: "1 1 0%",
                          },
                          maxLength: 4,
                        }}
                      />
                      <span className="text-gray_002">مثال: 1385</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`text-error transition-all duration-100 ${
                    errors.birthday_year
                      ? "opacity-100 z-[-10]"
                      : "opacity-0 z-0"
                  }`}
                >
                  {errors.birthday_year}
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-[2dvw]">
              <span className="text-center dark:text-gray_001 text-gray_006 z-50">
                با ثبت‌نام در این اپلیکیشن، شما{" "}
                <button
                  type="button"
                  onClick={navigateToPrivacyPolicy}
                  className="text-primary underline underline-offset-2"
                >
                  قوانین و مفاد سیاست حفظ حریم خصوصی
                </button>{" "}
                را می‌پذیرید.
              </span>
              <Button
                disabled={loading}
                label={loading ? "در حال تایید..." : "تایید"}
                type="submit"
                onClick={handleSubmit}
              />
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
