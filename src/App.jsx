import React from "react";
import { Route, Navigate, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/DashBoard";
import User from "./pages/User";
import Order from "./pages/Order";
import Item from "./pages/Item";
import Category from "./pages/Category";
import AddCategory from "./pages/AddCategory";
import Authors from "./pages/Authors";
import AddAuthor from "./pages/AddAuthor";
import AddItem from "./pages/AddItem";
import Page404 from "./pages/Page404";
import SignIn from "./pages/SignIn";
import ItemType from "./pages/ItemType";
import AddItemType from "./pages/AddItemType";
import AddAdmin from "./pages/AddAdmin";
import Event from "./pages/Event";
import AddEvent from "./pages/AddEvent";
function App() {
  const location = useLocation();
  const hideSidebarRoutes = ["/"];
  const token = localStorage.getItem("token");
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideSidebar && <Sidebar />}

      <Routes>
        <Route
          path="/"
          element={!token ? <SignIn /> : <Navigate to="/Dashboard" />}
        />
        <Route
          path="/Dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route path="/Users" element={<PrivateRoute element={<User />} />} />
        <Route
          path="/Users/AddAdmin"
          element={<PrivateRoute element={<AddAdmin mode="add" />} />}
        />
        <Route path="/Orders" element={<PrivateRoute element={<Order />} />} />
        <Route path="Events" element={<PrivateRoute element={<Event />} />} />
        <Route
          path="/Events/AddEvent"
          element={<PrivateRoute element={<AddEvent mode="add" />} />}
        />
        <Route
          path="/Events/EditEvent"
          element={<PrivateRoute element={<AddEvent mode="edit" />} />}
        />

        <Route path="/Items" element={<PrivateRoute element={<Item />} />} />
        <Route
          path="/Items/AddItem"
          element={<PrivateRoute element={<AddItem mode="add" />} />}
        />
        <Route
          path="/Items/EditItem"
          element={<PrivateRoute element={<AddItem mode="edit" />} />}
        />

        <Route
          path="/ItemTypes"
          element={<PrivateRoute element={<ItemType />} />}
        />
        <Route
          path="/ItemTypes/AddItemType"
          element={<PrivateRoute element={<AddItemType mode="add" />} />}
        />
        <Route
          path="/ItemTypes/EditItemType"
          element={<PrivateRoute element={<AddItemType mode="edit" />} />}
        />

        <Route
          path="/Categories"
          element={<PrivateRoute element={<Category />} />}
        />
        <Route
          path="/Categories/AddCategory"
          element={<PrivateRoute element={<AddCategory mode="add" />} />}
        />
        <Route
          path="/Categories/EditCategory"
          element={<PrivateRoute element={<AddCategory mode="edit" />} />}
        />
        <Route
          path="/Authors"
          element={<PrivateRoute element={<Authors />} />}
        />
        <Route
          path="/Authors/AddAuthor"
          element={<PrivateRoute element={<AddAuthor mode="add" />} />}
        />
        <Route
          path="/Authors/EditAuthor"
          element={<PrivateRoute element={<AddAuthor mode="edit" />} />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
