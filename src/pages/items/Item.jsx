import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import Header from "../../components/Header";
import useFetch from "../../hooks/useFetch";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import { Link } from "react-router-dom";
import useDelete from "../../hooks/useDelete";

export default function Item() {
  const [allItem, setAllItem] = useState([]);
  const thead = [
    { header: "Image", accessor: "images" },
    { header: "Name", accessor: "title" },
    { header: "Price", accessor: "price" },
    { header: "No.Stock", accessor: "countInStock" },
    { header: "Category", accessor: "category" },
    {
      header: "Actions",
      render: (row) => (
        <>
          <Link to="/Items/EditItem" state={{ fromEdit: { row } }}>
            <button className="mr-8">
              <img src={edit} />
            </button>
          </Link>
          <button onClick={() => handleDelete(row)}>
            <img src={trash} />
          </button>
        </>
      ),
    },
  ];

  const {
    deleteResource,
    loading: deleteLoading,
    error: deleteError,
  } = useDelete("http://localhost:3005/api/v1/admin/item", {
    JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNzA0ODEsImV4cCI6MTcxNzM1Njg4MX0.Pei2vuy2vhbP1PxMHYlLERmeMxI4LOhAqlZEgI7qFss`,
  });

  const handleDelete = async (id) => {
    try {
      await deleteResource(id);
      setAllItem((prevItems) => prevItems.filter((item) => item.id !== id));
      console.log(`Deleted category with id: ${id}`);
    } catch (error) {
      console.error(`Failed to delete category with id: ${id}`, error);
    }
  };

  const { data, loading, error } = useFetch(
    "http://localhost:3005/api/v1/item",
    {}
  );
  console.log(data);

  useEffect(() => {
    if (data) {
      const extractedData = data.data.map((item) => ({
        title: item.title,
        price: item.price,
        description: item.description,
        publicationDate: item.publicationDate,
        numOfPage: item.numOfPage,
        itemType: item.itemType,
        numOfPage: item.numOfPage,
        countInStock: item.countInStock,
        images: item.images,
        category: item.category.title,
        id: item._id,
      }));
      setAllItem(extractedData);
    }
  }, [data]);

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
