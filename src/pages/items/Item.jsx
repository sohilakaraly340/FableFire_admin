import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import Header from "../../components/Header";
import useFetch from "../../hooks/useFetch";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";

export default function Item() {
  const [allItem, setAllItem] = useState([]);
  const thead = [
    { header: "Image", accessor: "image" },
    { header: "Name", accessor: "name" },
    { header: "Price", accessor: "price" },
    { header: "No.Stock", accessor: "stock" },
    { header: "Category", accessor: "category" },
    {
      header: "Actions",
      render: (row) => (
        <>
          <button className="mr-8" onClick={() => handleEdit(row.id)}>
            <img src={edit} />
          </button>
          <button onClick={() => handleDelete(row.id)}>
            <img src={trash} />
          </button>
        </>
      ),
    },
  ];
  const {
    data: items,
    loading,
    error,
  } = useFetch("http://localhost:3005/api/v1/item", {});

  useEffect(() => {
    if (items) {
      const extractedData = items.data.map((item) => ({
        name: item.title,
        price: item.price,
        stock: item.countInStock,
        image: item.images[0],
        category: item.category.title,
      }));
      setAllItem(extractedData);
    }
  }, [items]);
  if (error) {
    return (
      <p className="flex justify-center items-center w-[50%]">Ooops Error!</p>
    );
  }

  return (
    <>
      <Header
        title={"All Items"}
        buttonText={"Add Item"}
        route="/Items/AddItem"
      />
      <div className="px-20 py-8">
        <Table columns={thead} data={allItem} loading={loading} />
      </div>
    </>
  );
}
