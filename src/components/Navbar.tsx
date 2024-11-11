import { useLocation, useNavigate } from "react-router-dom";

import HomeLight from "../images/Navbar/home-light.svg";
import HomeDark from "../images/Navbar/home-dark.svg";
import HomeActive from "../images/Navbar/home-active.svg";
import SearchLight from "../images/Navbar/search-light.svg";
import SearchDark from "../images/Navbar/search-dark.svg";
import SearchActive from "../images/Navbar/search-active.svg";
import ReportsLight from "../images/Navbar/reports-light.svg";
import ReportsDark from "../images/Navbar/reports-dark.svg";
import ReportsActive from "../images/Navbar/reports-active.svg";
import ProfileLight from "../images/Navbar/profile-light.svg";
import ProfileDark from "../images/Navbar/profile-dark.svg";
import ProfileActive from "../images/Navbar/profile-active.svg";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-full border-t border-gray_001 dark:border-gray_006 pt-[2dvh] pb-[3.5dvh] flex justify-evenly dark:bg-gray_006/30">
      <button
        onClick={() => navigate("/")}
        className="flex flex-col items-center gap-[0.5dvh]"
      >
        <div className="h-[4dvh] w-[4dvh] relative">
          <img
            alt="خانه"
            className={`w-full h-full transition-all duration-200 absolute left-0 top-0 block dark:hidden ${
              location.pathname === "/" ? "opacity-0" : "opacity-100"
            }`}
            src={HomeLight}
          />
          <img
            alt="خانه"
            className={`w-full h-full transition-all duration-200 absolute left-0 top-0 hidden dark:block ${
              location.pathname === "/" ? "opacity-0" : "opacity-100"
            }`}
            src={HomeDark}
          />
          <img
            alt="خانه"
            className={`w-full h-full transition-all duration-200 absolute left-0 top-0 ${
              location.pathname === "/" ? "opacity-100" : "opacity-0"
            }`}
            src={HomeActive}
          />
        </div>
        <span
          className={`${
            location.pathname === "/"
              ? "text-primary"
              : "text-gray_001 dark:text-gray_004"
          }`}
        >
          خانه
        </span>
      </button>
      <button
        onClick={() => navigate("/search")}
        className="flex flex-col items-center gap-[0.5dvh]"
      >
        <div className="h-[4dvh] w-[4dvh] relative">
          <img
            alt="جست و جو"
            className={`w-full h-full transition-all duration-200 absolute left-0 top-0 block dark:hidden ${
              location.pathname === "/search" ? "opacity-0" : "opacity-100"
            }`}
            src={SearchLight}
          />
          <img
            alt="جست و جو"
            className={`w-full h-full transition-all duration-200 absolute left-0 top-0 hidden dark:block ${
              location.pathname === "/search" ? "opacity-0" : "opacity-100"
            }`}
            src={SearchDark}
          />
          <img
            alt="جست و جو"
            className={`w-full h-full transition-all duration-200 absolute left-0 top-0 ${
              location.pathname === "/search" ? "opacity-100" : "opacity-0"
            }`}
            src={SearchActive}
          />
        </div>
        <span
          className={`${
            location.pathname === "/search"
              ? "text-primary"
              : "text-gray_001 dark:text-gray_004"
          }`}
        >
          جست و جو
        </span>
      </button>
      <button
        onClick={() => navigate("/reports")}
        className="flex flex-col items-center gap-[0.5dvh]"
      >
        <div className="h-[4dvh] w-[4dvh] relative">
          <img
            alt="تاریخچه"
            className={`w-full h-full transition-all duration-200 absolute left-0 top-0 block dark:hidden ${
              location.pathname === "/reports" ? "opacity-0" : "opacity-100"
            }`}
            src={ReportsLight}
          />
          <img
            alt="تاریخچه"
            className={`w-full h-full transition-all duration-200 absolute left-0 top-0 hidden dark:block ${
              location.pathname === "/reports" ? "opacity-0" : "opacity-100"
            }`}
            src={ReportsDark}
          />
          <img
            alt="تاریخچه"
            className={`w-full h-full transition-all duration-200 absolute left-0 top-0 ${
              location.pathname === "/reports" ? "opacity-100" : "opacity-0"
            }`}
            src={ReportsActive}
          />
        </div>
        <span
          className={`${
            location.pathname === "/reports"
              ? "text-primary"
              : "text-gray_001 dark:text-gray_004"
          }`}
        >
          تاریخچه
        </span>
      </button>
      <button
        onClick={() => navigate("/profile")}
        className="flex flex-col items-center gap-[0.5dvh]"
      >
        <div className="h-[4dvh] w-[4dvh] relative">
          <img
            alt="پروفایل"
            className={`w-full h-full transition-all duration-200 absolute left-0 top-0 block dark:hidden ${
              location.pathname === "/profile" ? "opacity-0" : "opacity-100"
            }`}
            src={ProfileLight}
          />
          <img
            alt="پروفایل"
            className={`w-full h-full transition-all duration-200 absolute left-0 top-0 hidden dark:block ${
              location.pathname === "/profile" ? "opacity-0" : "opacity-100"
            }`}
            src={ProfileDark}
          />
          <img
            alt="پروفایل"
            className={`w-full h-full transition-all duration-200 absolute left-0 top-0 ${
              location.pathname === "/profile" ? "opacity-100" : "opacity-0"
            }`}
            src={ProfileActive}
          />
        </div>
        <span
          className={`${
            location.pathname === "/profile"
              ? "text-primary"
              : "text-gray_001 dark:text-gray_004"
          }`}
        >
          پروفایل
        </span>
      </button>
    </div>
  );
}
