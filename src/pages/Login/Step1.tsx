import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Formik } from "formik";
import Dropdown from "../../components/Dropdown";
import { useLoggedInSetState } from "../../providers/LoggedInProvider";

interface Props {
  nextStep: () => void;
}
export default function Step1({ nextStep }: Props) {
  const setLoggedIn = useLoggedInSetState();

  const [newUser, setNewUser] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [melliCodeError, setMelliCodeError] = useState("");
  const [birthdayError, setBirthdayError] = useState("");

  const validatePhone = (value: string) => {
    if (!value) {
      setPhoneError("شماره موبایل خود را وارد کنید!");
      return false;
    }
    return true;
  };
  const validateMelliCode = (value: string) => {
    if (!value) {
      setMelliCodeError("کد ملی خود را وارد کنید!");
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
      console.log("day: ", day);
      console.log("month: ", month);
      console.log("daysInMonth[month]: ", daysInMonth[month]);
      return false;
    } else {
      return true;
    }
  }

  const validateBirthday = (year: string, month: string, day: string) => {
    if (!year || !month || !day) {
      setBirthdayError("تاریخ تولد خود را وارد کنید!");
      return false;
    } else if (!validateJalaliDay(month, +day, +year)) {
      setBirthdayError("تاریخ تولد خود را صحیح وارد کنید!");
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

  return (
    <div className="w-full h-[100dvh] px-[6dvw] pt-[5dvw] pb-[10dvw] flex flex-col gap-y-[4dvw] justify-between">
      <Formik
        initialValues={{
          phone: "",
          melli_code: "",
          birthday_year: "",
          birthday_month: "",
          birthday_day: "",
        }}
        onSubmit={(values) => {
          setPhoneError("");
          setMelliCodeError("");

          if (!newUser) {
            if (validatePhone(values.phone)) {
              setNewUser(true);
              // nextStep()
            }
          } else {
            if (
              validatePhone(values.phone) &&
              validateMelliCode(values.melli_code) &&
              validateBirthday(
                values.birthday_year,
                values.birthday_month,
                values.birthday_day
              )
            ) {
              setLoggedIn(true);
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
                    style: { width: "100%" },
                    disabled: newUser,
                  }}
                />
                <span
                  className={`text-error transition-all duration-100 ${
                    phoneError ? "opacity-100 z-[-10]" : "opacity-0 z-0"
                  }`}
                >
                  {phoneError}
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
                    placeholder: "کد ملی",
                    inputMode: "decimal",
                  }}
                />
                <span
                  className={`text-error transition-all duration-100 ${
                    melliCodeError ? "opacity-100 z-[-10]" : "opacity-0 z-0"
                  }`}
                >
                  {melliCodeError}
                </span>

                <div
                  className={`flex flex-col gap-y-[2dvw] duration-100 mt-[2dvw] ${
                    newUser ? "opacity-100 z-0" : "opacity-0 z-[-10]"
                  }`}
                >
                  <span className="text-[5dvw]">تاریخ تولد</span>
                  <div className="flex items-center gap-x-[3dvw]">
                    <Input
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
                    birthdayError ? "opacity-100 z-[-10]" : "opacity-0 z-0"
                  }`}
                >
                  {birthdayError}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-y-[3dvw]">
              <Button
                label="ورود دوباره شماره موبایل"
                type="button"
                onClick={() => setNewUser(false)}
                className={`transition-all duration-100 ${
                  newUser ? "opacity-100 z-0" : "opacity-0 z-[-10]"
                }`}
              />
              <Button label="تایید" type="submit" onClick={handleSubmit} />
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
