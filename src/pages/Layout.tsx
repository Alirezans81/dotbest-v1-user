/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

export default function Layout() {
  return (
    <div className="w-screen h-[100dvh] flex flex-col">
      <Modal />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}
