import React from "react";
import { Outlet } from "react-router-dom";
import Modal from "../components/Modal";

export default function NoNavbarLayout() {
  return (
    <div className="w-screen h-[100dvh] flex flex-col">
      <Modal />
      <Outlet />
    </div>
  );
}
