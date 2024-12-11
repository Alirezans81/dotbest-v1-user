import { Formik } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useLoggedInSetState } from "../../providers/LoggedInProvider";
import { useVerifyCode } from "../../api/auth/hooks";
import { UserInitParams } from "../../lib/user";
import { useCustomSetUser } from "../../hooks/auth";
import { useUpdatePersonalInfo } from "../../api/user/hooks";
import { CommonUser, defaultUser } from "../../lib/common";

interface Props {
  prevStep: () => void;
  tempCode: string;
  userInitParams: UserInitParams | null;
}
export default function Step2({ prevStep, tempCode, userInitParams }: Props) {
  const setUser = useCustomSetUser();
  const setLoggedIn = useLoggedInSetState();

  const validateCode = (code: string, setError: (value: string) => void) => {
    if (!code) {
      setError("کد را وارد کنید!");
      return false;
    }
    return true;
  };

  const verifyCode = useVerifyCode();
  const updatePersonalInfo = useUpdatePersonalInfo();

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
            verifyCode({
              code: values.code,
              setUser,
              customFunction(data) {
                if (userInitParams) {
                  let params: CommonUser = defaultUser;
                  params.first_name = userInitParams.name.split(" ")[0];
                  params.last_name = userInitParams.name.split(" ")[1];
                  updatePersonalInfo({
                    user_url: data.user.url,
                    setUser,
                    params,
                    customFunction: () => setLoggedIn(true),
                  });
                } else {
                  setLoggedIn(true);
                }
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
                label="ورود دوباره شماره موبایل"
                type="button"
                onClick={prevStep}
              />
              <Button label="تایید" type="submit" onClick={handleSubmit} />
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
