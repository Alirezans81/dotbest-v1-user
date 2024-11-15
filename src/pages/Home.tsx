export default function Home() {
  return (
    <div className="w-full flex flex-col gap-[2dvw]">
      <div className="w-full flex flex-row-reverse justify-center items-center py-[1.5dvh] gap-[5dvw]">
        <span
          dir="ltr"
          className="font-sans text-[7dvw] text-primary font-bold"
        >
          .Best
        </span>
        <div className="w-[2px] rounded-full h-[8dvw] bg-gray_001 dark:bg-gray_004" />
        <span className="text-[7dvw] mt-[2dvw]">بهترین زیبایی ها</span>
      </div>
    </div>
  );
}
