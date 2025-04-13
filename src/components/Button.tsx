import { ReactNode } from "react";

interface Props {
  type: "submit" | "reset" | "button" | undefined;
  label?: string;
  children?: ReactNode;
  onClick: (e?: any) => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  type,
  label,
  children,
  className,
  onClick,
  disabled,
}: Props) {
  return (
    <button
      type={type}
      className={`transition-all duration-200 rounded-full py-[2.5dvw] border border-gray_001 dark:border-gray_004 hover:bg-primary hover:border-primary hover:text-white ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label || children || ""}
    </button>
  );
}
