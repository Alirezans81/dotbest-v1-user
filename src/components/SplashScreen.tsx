export default function SplashScreen() {
  return (
    <div className="absolute left-0 top-0 w-screen h-[100dvh] flex flex-col justify-center items-center backdrop-blur-sm bg-black/60 z-50">
      <div dir="ltr" className="flex items-center text-primary">
        <span className="text-[22dvw] font-eng -mt-[6.5dvw]">.</span>
        <span className="text-[14dvw] font-eng">best</span>
      </div>
    </div>
  );
}
