/* eslint-disable react-hooks/exhaustive-deps */
import { Formik } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useLoggedInSetState } from "../../providers/LoggedInProvider";
import { useGetUserData, useVerifyCode } from "../../api/auth/hooks";
import { UserInitParams } from "../../lib/user";
import { TokenType } from "../../providers/TokenProvider";
import { useGetCategories } from "../../api/common/hooks";
import { useShowSplashScreenSetState } from "../../providers/ShowSplashScreen";
import { useEffect } from "react";

interface Props {
  prevStep: () => void;
  phone: string;
  tempCode: string;
  userInitParams: UserInitParams | null;
}
export default function Step2({
  prevStep,
  phone,
  tempCode,
  userInitParams,
}: Props) {
  const setShowSplashScreen = useShowSplashScreenSetState();
  const setLoggedIn = useLoggedInSetState();

  const validateCode = (code: string, setError: (value: string) => void) => {
    if (!code) {
      setError("کد را وارد کنید!");
      return false;
    }
    return true;
  };

  const verifyCode = useVerifyCode();
  const getUserData = useGetUserData();
  const getCategories = useGetCategories();

  const initApp = (token: TokenType) => {
    getUserData({
      received_access_token: token.access,
      customFunction() {
        getCategories({
          received_access_token: token.access,
          customFunction() {
            setLoggedIn(true);
          },
          onFinally() {
            setShowSplashScreen(false);
          },
        });
      },
      onError() {
        setShowSplashScreen(false);
      },
    });
  };

  useEffect(() => {
    if (tempCode) {
      setShowSplashScreen(true);
      verifyCode({
        phone: phone.slice(1),
        code: tempCode,
        customFunction(data) {
          initApp(data);
        },
        onError() {
          setShowSplashScreen(false);
        },
      });
    }
  }, [tempCode]);

  return (
    <div className="w-full h-[100dvh] px-[6dvw] pt-[5dvw] pb-[10dvw] flex flex-col gap-y-[4dvw] justify-between">
      <Formik
        initialValues={{
          code: process.env.REACT_APP_MODE === "DEVELOPMENT" ? tempCode : "",
        }}
        onSubmit={(values, { setFieldError }) => {
          if (
            validateCode(values.code, (value) => setFieldError("code", value))
          ) {
            setShowSplashScreen(true);
            verifyCode({
              phone: phone,
              code: values.code,
              customFunction(data) {
                initApp(data);
              },
              onError() {
                setShowSplashScreen(false);
              },
            });
          }
        }}
      >
        {({ values, handleBlur, handleChange, handleSubmit, errors }) => (
          <>
            <div className="w-full flex flex-col gap-y-[4dvw]">
              <span className="w-full text-[6dvw]">
                کد ارسال شده به شماره خود را وارد کنید
              </span>
              <div className="w-full flex flex-col gap-y-[2dvw]">
                <Input
                  attributes={{
                    name: "code",
                    onBlur: handleBlur,
                    onChange: handleChange,
                    value: values.code,
                    maxLength: 6,
                    placeholder: "کد 6 رقمی",
                    inputMode: "decimal",
                    pattern: "[0-9]",
                    style: { width: "100%" },
                  }}
                />

                <span
                  className={`text-error transition-all duration-100 ${
                    errors.code ? "opacity-100 z-[-10]" : "opacity-0 z-0"
                  }`}
                >
                  {errors.code}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-y-[3dvw]">
              <Button
                className="!bg-primary"
                label="تایید"
                type="submit"
                onClick={handleSubmit}
              />
              <Button
                label="ورود دوباره شماره موبایل"
                type="button"
                onClick={prevStep}
              />
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
