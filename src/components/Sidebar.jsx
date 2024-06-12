import React, { useState } from "react";
import arrowIcon from "../assets/images/icons/arrowIcon.svg";
import dashIcon from "../assets/images/icons/boardIcon.svg";
import authorIcon from "../assets/images/icons/authorIcon.svg";
import catIcon from "../assets/images/icons/catIcon.svg";
import itemIcon from "../assets/images/icons/itemIcon.svg";
import orderIcon from "../assets/images/icons/orderIcon.svg";
import userIcon from "../assets/images/icons/userIcon.svg";
import { NavLink, useLocation } from "react-router-dom";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  let { pathname } = useLocation();

  let splitPath = pathname.split("/");

  let path = splitPath[1];

  const [selectedItem, setSelectedItem] = useState(path);

  const menuItems = [
    { name: "Dashboard", icon: dashIcon },
    { name: "Items", icon: itemIcon },
    { name: "Categories", icon: catIcon },
    { name: "Users", icon: userIcon },
    { name: "Orders", icon: orderIcon },
    { name: "Authors", icon: authorIcon },
    { name: "ItemTypes", icon: itemIcon },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full overflow-y-auto bg-sidebar px-6 py-8 transition-all z-10`}
    >
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
        />
      </div>

      <div>
        {menuItems.map((item) => (
          <NavLink
            className={`flex items-center text-button ${
              isOpen ? "justify-start" : "justify-center"
            } gap-6 mt-4 rounded-xl p-3 cursor-pointer ${
              selectedItem === item.name ? "bg-[#E3D5CA]" : ""
            }`}
            key={item.name}
            onClick={() => {
              setSelectedItem(item.name);
            }}
            to={item.name}
          >
            <img src={item.icon} />
            {isOpen && <p>{item.name}</p>}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
