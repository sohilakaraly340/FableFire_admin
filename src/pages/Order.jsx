import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import useFetch from "../hooks/useFetch";
import Page404 from "./Page404";

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
    "http://localhost:3005/api/v1/admin/order?page=1&limit=4"
  );

  useEffect(() => {
    if (data) {
      const extractedData = data.data.results.map((order) => ({
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
    <Page404 />;
  }

  return (
    <div className="ml-[26%] sm:ml-[20%] md:ml-[16%] px-4 py-8">
      <div className="flex justify-between items-center ">
        <p className="text-2xl font-bold px-8">All Orders</p>
      </div>
      <div className="py-8">
        <Table columns={thead} data={orders} loading={loading} />
      </div>
    </div>
  );
}
