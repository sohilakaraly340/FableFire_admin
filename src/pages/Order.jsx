import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import useFetch from "../hooks/useFetch";
import Page404 from "./Page404";
import Pagination from "../components/Pagination";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const thead = [
    { header: "First Name", accessor: "firstName" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phoneNumber" },
    { header: "Address", accessor: "address" },
    { header: "Total Price", accessor: "totalPrice" },
    { header: "Status", accessor: "status" },
  ];

  const { data, loading, error } = useFetch(
    `http://localhost:3005/api/v1/admin/order?page=${currentPage}&limit=${itemsPerPage}`
  );

  useEffect(() => {
    if (data) {
      const extractedData = data.data.results.map((order) => ({
        id: order?._id,
        firstName: order?.firstName,
        email: order?.email,
        address: order?.address,
        phoneNumber: order?.phoneNumber,
        totalPrice: order?.totalPrice,
        status: order?.status,
      }));
      setOrders(extractedData);
      setTotalPages(data.data.numOfPages);
    }
  }, [data, currentPage]);

  if (error) {
    <Page404 />;
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="ml-[26%]  sm:ml-[20%] md:ml-[16%] px-4 py-8">
      <div className="flex justify-between items-center ">
        <p className="text-2xl font-bold ">All Orders</p>
      </div>
      <div className="py-8">
        <Table columns={thead} data={orders} loading={loading} />
      </div>
      {orders.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
