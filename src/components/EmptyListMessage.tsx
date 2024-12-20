interface Props {
  className?: string;
}
export default function EmptyListMessage({ className }: Props) {
  return (
    <div
      className={`w-full flex justify-center items-center text-[7dvw] ${className}`}
    >
      <span>چیزی برای نمایش وجود ندارد!</span>
    </div>
  );
}
