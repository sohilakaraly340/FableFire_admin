import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Authors from "./pages/authors/Authors";
import DashBoard from "./pages/dashBoard/DashBoard";
import Item from "./pages/items/Item";
import Category from "./pages/category/Category";
import User from "./pages/users/User";
import Order from "./pages/orders/Order";
import AddItem from "./pages/addItem/AddItem";
import AddCategory from "./pages/addCategory/AddCategory";

const InitialValues = {
  title: "",
  description: "",
  images: [],
};
function App() {
  // const [darkMode, setDarkMode] = useState(false);
  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [darkMode]);

  return (
    <>
      {/* <div
        className={`bg-sidebar text-textcolor1 dark:bg-gray-900 dark:text-gray-100 min-h-screen`}
      >
        <header className="p-4 bg-landing dark:bg-gray-800">
          <h1 className="text-xl font-bold">App</h1>
          <button
            className="ml-auto bg-button text-white dark:bg-gray1 px-4 py-2 rounded"
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle Dark Mode
          </button>
        </header>
      </div> */}

      <div>
        <Sidebar />
        <div className=" ml-[26%] sm:[20%] md:ml-[13%] px-4 py-8">
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/Items" element={<Item />} />
            <Route path="/Items/AddItem" element={<AddItem />} />
            <Route path="/Users" element={<User />} />
            <Route path="/Categories" element={<Category />} />
            <Route
              path="/Categories/AddCategory"
              element={<AddCategory mode="add" />}
            />
            <Route
              path="/Categories/EditCategory"
              element={<AddCategory mode="edit" />}
            />
            <Route path="/Authors" element={<Authors />} />
            <Route path="/Orders" element={<Order />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
