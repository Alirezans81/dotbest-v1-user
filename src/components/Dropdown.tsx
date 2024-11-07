import ReactDropdown, { Group, Option } from "react-dropdown";

interface Props {
  options: (string | Group | Option)[];
  onChange: (arg: Option) => void;
  className?: string;
  placeholder?: string;
}
export default function Dropdown({
  options,
  onChange,
  className,
  placeholder,
}: Props) {
  return (
    <ReactDropdown
      className={className + " text-center"}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      controlClassName="!bg-transparent !rounded-full !pl-[6dvw] !pr-[10dvw] !h-full !py-[3dvw] !border-gray_001 dark:!border-gray_004"
      arrowClassName="!top-[45%] !right-[17%]"
      menuClassName="!min-w-fit !mt-[3dvw] !rounded-[5dvw] !bg-white dark:!bg-black !border-gray_001 dark:!border-gray_004 !max-h-[35.5dvh]"
      placeholderClassName="!text-gray_002"
    />
  );
}
