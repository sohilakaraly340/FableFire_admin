import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Authors from "./pages/authors/Authors";
import DashBoard from "./pages/dashBoard/DashBoard";
import Item from "./pages/items/Item";
import Category from "./pages/category/Category";
import User from "./pages/users/User";
import Order from "./pages/orders/Order";
import AddItem from "./pages/addItem/AddItem";
import AddCategory from "./pages/addCategory/AddCategory";
import AddAuthor from "./pages/addAuthor/AddAuthor";
import SignIn from "./pages/SignIn";

function App() {
  const location = useLocation();
  const hideSidebarRoutes = ["/"];

  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideSidebar && <Sidebar />}
      <div
        className={`${
          !shouldHideSidebar ? "ml-[26%] sm:ml-[20%] md:ml-[13%]" : ""
        } px-4 py-8`}
      >
        <Routes>
          <Route path="/Dashboard" element={<DashBoard />} />
          <Route path="/Users" element={<User />} />
          <Route path="/Orders" element={<Order />} />
          <Route path="/Items" element={<Item />} />
          <Route path="/Items/AddItem" element={<AddItem mode="add" />} />
          <Route path="/Items/EditItem" element={<AddItem mode="edit" />} />
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
          <Route path="/Authors/AddAuthor" element={<AddAuthor mode="add" />} />
          <Route
            path="/Authors/EditAuthor"
            element={<AddAuthor mode="edit" />}
          />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
