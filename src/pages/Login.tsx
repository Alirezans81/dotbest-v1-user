import { useState } from "react";
import Step0 from "./Login/Step0";
import Step1 from "./Login/Step1";
import Step2 from "./Login/Step2";

export default function Login() {
  const [step, setStep] = useState(0);
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  if (step === 0) {
    return <Step0 nextStep={nextStep} />;
  } else if (step === 1) {
    return <Step1 nextStep={nextStep} />;
  } else if (step === 2) {
    return <Step2 />;
  } else {
    return <></>;
  }
}
