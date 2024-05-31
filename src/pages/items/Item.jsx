import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import Header from "../../components/Header";
import { Context } from "../../contexts/Context";
import useFetch from "../../hooks/useFetch";

export default function Item() {
  const { header1, data1 } = useContext(Context);
  const [allItem, setAllItem] = useState([]);

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

  if (loading) {
    return <p className="flex justify-center items-center w-[50%]">loading</p>;
  }

  if (error) {
    return <p className="flex justify-center items-center w-[50%]">error</p>;
  }

  return (
    <>
      <Header
        title={"All Items"}
        buttonText={"Add Item"}
        route="/Items/AddItem"
      />
      <div className="px-20 py-8">
        <Table columns={header1} data={allItem} />
      </div>
    </>
  );
}
