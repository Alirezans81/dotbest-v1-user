interface Props {
  className?: string;
  message?: string;
}
export default function EmptyListMessage({ className, message }: Props) {
  return (
    <div
      className={`w-full flex justify-center items-center text-[7dvw] ${className}`}
    >
      <span>{message || "چیزی برای نمایش وجود ندارد!"}</span>
    </div>
  );
}
