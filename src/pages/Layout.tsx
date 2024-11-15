import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="w-screen h-[100dvh] flex flex-col">
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}
