import { useLoadingState } from "../providers/LoadingProvider";

export default function Loading() {
  const loading = useLoadingState();

  return (
    <div
      className={`absolute left-0 top-0 w-screen h-[100dvh] flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm transition-all duration-200 ${
        loading ? "z-40 opacity-100" : "z-[-10] opacity-0"
      }`}
    >
      <div dir="ltr" className="flex items-center gap-[1dvw] text-primary">
        <span className="text-[25dvw] animate-bounce">.</span>
        <span className="text-[14dvw]">best</span>
      </div>
    </div>
  );
}
