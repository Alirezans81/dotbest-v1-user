import { InputHTMLAttributes } from "react";

interface Props {
  attributes?: InputHTMLAttributes<HTMLInputElement>;
}
export default function Input({ attributes }: Props) {
  return (
    <input
      className="bg-transparent flex-1 w-[20dvw] transition-all duration-250 border rounded-full border-gray_001 px-[5dvw] dark:border-gray_004 py-[2.5dvw] focus:outline-black"
      {...attributes}
    />
  );
}
