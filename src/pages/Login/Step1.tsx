import { Dispatch, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Formik } from "formik";
import Dropdown from "../../components/Dropdown";
import { useSendCode } from "../../api/auth/hooks";
import { UserInitParams } from "../../lib/user";

interface Props {
  nextStep: () => void;
  setTempCode: (value: string) => void;
  setUserInitParams: Dispatch<React.SetStateAction<UserInitParams | null>>;
}
export default function Step1({
  nextStep,
  setTempCode,
  setUserInitParams,
}: Props) {
  const [newUser, setNewUser] = useState(false);

  const validatePhone = (value: string, setError: (value: string) => void) => {
    if (!value) {
      setError("شماره موبایل خود را وارد کنید!");
      return false;
    }
    return true;
  };
  const validateName = (value: string, setError: (value: string) => void) => {
    if (!value) {
      setError("نام و نام خانوادگی خود را وارد کنید!");
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
    return true;
  };
  function isJalaliLeapYear(year: number): boolean {
    return year % 4 === 0;
  }
  function validateJalaliDay(
    monthName: string,
    day: number,
    year: number
  ): boolean {
    const monthNames: { [key: string]: number } = {
      فروردین: 1,
      اردیبهشت: 2,
      خرداد: 3,
      تیر: 4,
      مرداد: 5,
      شهریور: 6,
      مهر: 7,
      آبان: 8,
      آذر: 9,
      دی: 10,
      بهمن: 11,
      اسفند: 12,
    };

    const month = monthNames[monthName];

    if (!month) {
      return false;
    }

    const daysInMonth: number[] = [
      0,
      31,
      31,
      31,
      31,
      31,
      31,
      30,
      30,
      30,
      30,
      30,
      30,
      isJalaliLeapYear(year) ? 30 : 29,
    ];

    if (day < 1 || day > daysInMonth[month]) {
      return false;
    } else {
      return true;
    }
  }
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

  const monthes = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const sendCode = useSendCode();

  return (
    <div className="w-full h-[100dvh] px-[6dvw] pt-[5dvw] pb-[10dvw] flex flex-col gap-y-[4dvw] justify-between">
      <Formik
        initialValues={{
          phone: "",
          name: "",
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
              sendCode({
                phone: values.phone,
                customFunction: (data) => {
                  process.env.REACT_APP_MODE === "DEVELOPMENT" &&
                    setTempCode(data.code);
                  if (data.new_user) {
                    setNewUser(true);
                  } else {
                    nextStep();
                  }
                },
              });
            }
          } else {
            if (
              validateName(values.name, (value) =>
                setFieldError("name", value)
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
              setUserInitParams({ ...values });
              nextStep();
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

                <Input
                  attributes={{
                    style: {
                      opacity: newUser ? 100 : 0,
                      zIndex: newUser ? 0 : -10,
                      width: "100%",
                    },
                    name: "name",
                    onBlur: handleBlur,
                    onChange: handleChange,
                    value: values.name,
                    placeholder: "نام و نام خانوادگی",
                  }}
                />
                <span
                  className={`text-error transition-all duration-100 ${
                    errors.name ? "opacity-100 z-[-10]" : "opacity-0 z-0"
                  }`}
                >
                  {errors.name}
                </span>

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
                  <div className="flex items-center gap-x-[3dvw]">
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
                    <Dropdown
                      options={monthes}
                      onChange={(e) => setFieldValue("birthday_month", e.value)}
                      placeholder="ماه"
                      className="w-[32dvw]"
                    />
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
            <Button label="تایید" type="submit" onClick={handleSubmit} />
          </>
        )}
      </Formik>
    </div>
  );
}
