import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import useFetch from "../../hooks/useFetch";

export default function Order() {
  const [orders, setOrders] = useState([]);

  const thead = [
    { header: "First Name", accessor: "firstName" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phoneNumber" },
    { header: "Address", accessor: "address" },
    { header: "Total Price", accessor: "totalPrice" },
    { header: "Status", accessor: "status" },
  ];

  const { data, loading, error } = useFetch(
    "http://localhost:3005/api/v1/admin/order",
    {
      headers: {
        "Content-Type": "multipart/form-data",
        JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNzA0ODEsImV4cCI6MTcxNzM1Njg4MX0.Pei2vuy2vhbP1PxMHYlLERmeMxI4LOhAqlZEgI7qFss`,
      },
    }
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      const extractedData = data.data.map((order) => ({
        id: order._id,
        firstName: order.firstName,
        email: order.email,
        address: order.address,
        phoneNumber: order.phoneNumber,
        totalPrice: order.totalPrice,
        status: order.status,
      }));
      setOrders(extractedData);
    }
  }, [data]);

  if (error) {
    return <p className="flex justify-center items-center w-[50%]">error</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center ">
        <p className="text-2xl font-bold px-8">All Orders</p>
      </div>
      <div className="px-20 py-8">
        <Table columns={thead} data={orders} loading={loading} />
      </div>
    </>
  );
}
