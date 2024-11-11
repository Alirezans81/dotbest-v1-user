import { ReactNode } from "react";
import NavigationTopbar from "./NavigationTopbar";

interface Props {
  children: ReactNode;
  label: string;
}
export default function NavigationLayout({ children, label }: Props) {
  return (
    <div className="w-screen h-[100dvh] flex flex-col p-[4dvw] gap-[2dvw]">
      <NavigationTopbar label={label} />
      {children}
    </div>
  );
}
