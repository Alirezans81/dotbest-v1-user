interface Props {
  type: "submit" | "reset" | "button" | undefined;
  label: string;
  onClick: (e?: any) => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  type,
  label,
  className,
  onClick,
  disabled,
}: Props) {
  return (
    <button
      type={type}
      className={`transition-all rounded-full py-[2.5dvw] border border-gray_001 dark:border-gray_004 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
