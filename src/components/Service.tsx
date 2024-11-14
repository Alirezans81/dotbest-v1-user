interface Props {
  label: string;
  className?: string;
  desc?: {
    theme: "primary" | "gray";
    value: string;
  };
  onClick: () => void;
}
export default function Service({
  label,
  onClick,
  className,
  desc = {
    theme: "gray",
    value: "",
  },
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex justify-between items-center border border-gray_001 dark:border-gray_003 rounded-[5dvw] px-[5.5dvw] py-[3.5dvw] ${className}`}
    >
      <span>{label}</span>
      <span
        className={`${
          desc.theme === "primary" ? "text-primary" : "text-gray_002"
        }`}
      >
        {desc.value}
      </span>
    </button>
  );
}
