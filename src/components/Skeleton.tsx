interface Props {
  className?: string;
}
export default function Skeleton({ className }: Props) {
  return (
    <div
      className={`animate-appear rounded-[6dvw] overflow-hidden ${className}`}
    >
      <div className="w-full h-full bg-gray_001 dark:bg-gray_005 animate-pulse"></div>
    </div>
  );
}
