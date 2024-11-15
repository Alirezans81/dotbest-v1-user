import { Formik } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useLoggedInSetState } from "../../providers/LoggedInProvider";

interface Props {
  prevStep: () => void;
}
export default function Step2({ prevStep }: Props) {
  const setLoggedIn = useLoggedInSetState();

  const validateCode = (code: string, setError: (value: string) => void) => {
    if (!code) {
      setError("کد را وارد کنید!");
      return false;
    }
    return true;
  };

  return (
    <div className="w-full h-[100dvh] px-[6dvw] pt-[5dvw] pb-[10dvw] flex flex-col gap-y-[4dvw] justify-between">
      <Formik
        initialValues={{
          code: "",
        }}
        onSubmit={(values, { setFieldError }) => {
          if (
            validateCode(values.code, (value) => setFieldError("code", value))
          ) {
            setLoggedIn(true);
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
