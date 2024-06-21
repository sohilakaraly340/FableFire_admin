import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import arrowIcon from "../assets/images/icons/arrowIcon.svg";
import dashIcon from "../assets/images/icons/boardIcon.svg";
import authorIcon from "../assets/images/icons/authorIcon.svg";
import catIcon from "../assets/images/icons/catIcon.svg";
import itemIcon from "../assets/images/icons/itemIcon.svg";
import orderIcon from "../assets/images/icons/orderIcon.svg";
import userIcon from "../assets/images/icons/userIcon.svg";
import eventIcon from "../assets/images/icons/eventIcon.svg";
import exchamgeICon from "../assets/images/icons/exchangeIcon.svg";
import reviewIcon from "../assets/images/icons/reviewIcon.svg";
import logout from "../assets/images/icons/logout.svg";

import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { pathname } = useLocation();
  const splitPath = pathname.split("/");
  const path = splitPath[1];
  const [selectedItem, setSelectedItem] = useState(path);

  const menuItems = [
    { name: "Dashboard", icon: dashIcon },
    { name: "Items", icon: itemIcon },
    { name: "Categories", icon: catIcon },
    { name: "Users", icon: userIcon },
    { name: "Orders", icon: orderIcon },
    { name: "Authors", icon: authorIcon },
    { name: "Events", icon: eventIcon },
    { name: "Reviews", icon: reviewIcon },
    { name: "Exchange", icon: exchamgeICon },
    { name: "ItemTypes", icon: itemIcon },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-0 h-full overflow-y-auto bg-sidebar px-6 py-8 transition-all z-10 custom-scrollbar">
      <div
        className={`flex ${
          isOpen ? "justify-between" : "justify-center"
        } items-center gap-10 pb-7`}
      >
        <p className={`text-3xl ${!isOpen && "hidden"} inline text-button`}>
          Fable<span className="text-[#715647]">Fire</span>
        </p>
        <img
          src={arrowIcon}
          className={`pt-1.5 cursor-pointer ${!isOpen ? "rotate-180" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          alt="Toggle Sidebar"
        />
      </div>

      <div>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.name}
            className={`flex items-center text-button ${
              isOpen ? "justify-start" : "justify-center"
            } gap-6 mt-4 rounded-xl p-3 cursor-pointer ${
              selectedItem === item.name ? "bg-[#E3D5CA]" : ""
            }`}
            onClick={() => setSelectedItem(item.name)}
          >
            <img src={item.icon} alt={item.name} />
            {isOpen && <p>{item.name}</p>}
          </NavLink>
        ))}
      </div>

      <div className=" flex justify-center text-button mt-12 pt-4 border-button border-t-[2px] ">
        <button
          onClick={() => {
            handleLogout();
          }}
          className="flex justify-center gap-3 items-center"
        >
          <img src={logout} />
          {isOpen && <span className="text-xl">log out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
