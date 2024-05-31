import axios from "axios";
import React, { createContext } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const header1 = [
    { header: "Image", accessor: "image" },
    { header: "Name", accessor: "name" },
    { header: "Price", accessor: "price" },
    { header: "No.Stock", accessor: "stock" },
    { header: "Category", accessor: "category" },
    // {
    //   header: "Actions",
    //   render: (row) => (
    //     <>
    //       <button onClick={() => handleEdit(row.id)}>Edit</button>
    //       <button onClick={() => handleDelete(row.id)}>Delete</button>
    //     </>
    //   ),
    // },
  ];

  const data1 = [
    { id: 1, name: "Product 1", price: "$10", stock: "50", category: "hamada" },
    { id: 2, name: "Product 2", price: "$20", stock: "50", category: "hamada" },
  ];

  const header2 = [
    { header: "Products", accessor: "products" },
    { header: "Id", accessor: "id" },
    { header: "Total Price", accessor: "total" },
    { header: "User Name", accessor: "userName" },
    {
      header: "Status",
      render: (row) => (
        <p
          className={`p-2 w-20 text-center m-auto border border-none rounded-lg ${
            row.status == "pending"
              ? "text-orange-600 bg-orange-100"
              : row.status == "canceled"
              ? "text-red-600 bg-red-100"
              : "text-green-600 bg-green-100"
          }`}
        >
          {row.status}
        </p>
      ),
    },
  ];

  const data2 = [
    {
      id: 1,
      products: "Product 1",
      total: "$10",
      status: "pending",
      userName: "hamada",
    },
    {
      id: 2,
      products: "Product 2",
      total: "$20",
      status: "canceled",
      userName: "hamada",
    },
    {
      id: 3,
      products: "Product 2",
      total: "$20",
      status: "success",
      userName: "hamada",
    },
  ];

  const handleEdit = (id) => {
    console.log(`Edit ${id}`);
  };
  const handleDelete = (id) => {
    console.log(`Delete ${id}`);
  };
  const AllContext = {
    header1,
    header2,
    data1,
    data2,
    handleDelete,
    handleEdit,
  };

  return <Context.Provider value={AllContext}>{children}</Context.Provider>;
};
