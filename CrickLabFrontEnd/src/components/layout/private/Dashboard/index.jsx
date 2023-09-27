import { Outlet } from "react-router-dom";
import Sidebar from "./Desktop/SideBar/Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
export const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`md:w-1/6 
          lg:block fixed h-full`}
      >
        <button
          className={`sm:block md:hidden p-2 ${
            isOpen ? "w-full bg-gray-600" : "w-auto bg-white text-black"
          }   `}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <RxHamburgerMenu className={isOpen ? " text-white" : " text-black"} />
        </button>
        <Sidebar open={isOpen} />
      </div>
      {/* Main Content */}
      <div className="w-full md:w-5/6 p-4 md:ml-[16.6667%] mt-5">
        <Outlet />
      </div>
    </div>
  );
};
