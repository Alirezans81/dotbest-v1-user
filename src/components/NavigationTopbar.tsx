import { useNavigate } from "react-router-dom";

import BackLight from "../images/common/back-light.svg";
import BackDark from "../images/common/back-dark.svg";

interface Props {
  label: string;
  backlink?: string;
}
export default function NavigationTopbar({ label, backlink }: Props) {
  const navigate = useNavigate();
  const goBack = () => (backlink ? navigate(backlink) : navigate(-1));

  return (
    <div className="w-full flex justify-between items-center">
      <span className="text-[7dvw]">{label}</span>
      <button onClick={goBack}>
        <img
          alt="برشگت"
          className="w-[7dvw] h-[7dvw] hidden dark:block"
          src={BackLight}
        />
        <img
          alt="برشگت"
          className="w-[7dvw] h-[7dvw] block dark:hidden"
          src={BackDark}
        />
      </button>
    </div>
  );
}
