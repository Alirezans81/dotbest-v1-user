import { ReactNode } from "react";
import NavigationTopbar from "./NavigationTopbar";

interface Props {
  children?: ReactNode;
  label: string;
  backlink?: string;
}
export default function NavigationLayout({ children, label, backlink }: Props) {
  return (
    <div className="w-screen h-[100dvh] flex flex-col px-[4dvw] pt-[4dvw] pb-[10dvw] gap-[4dvw] overflow-y-auto">
      <NavigationTopbar label={label} backlink={backlink} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
