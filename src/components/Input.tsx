import { InputHTMLAttributes } from "react";

interface Props {
  className?: string
  attributes?: InputHTMLAttributes<HTMLInputElement>;
}
export default function Input({ attributes, className }: Props) {
  return (
    <input
      className={`bg-transparent flex-1 w-[20dvw] transition-all duration-100 border rounded-full border-gray_001 px-[5dvw] dark:border-gray_004 py-[2.5dvw] focus:outline-black ${className}`}
      {...attributes}
    />
  );
}
