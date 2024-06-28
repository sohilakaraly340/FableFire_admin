import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import useFetch from "../hooks/useFetch";
import Page404 from "./Page404";
import Header from "../components/Header";
import Pagination from "../components/Pagination";

export default function User() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const thead = [
    { header: "Name", accessor: "firstName" },
    { header: "Email", accessor: "email" },
    { header: "Address", accessor: "address" },
    { header: "Phone", accessor: "phoneNumber" },
    { header: "Role", accessor: "role" },
  ];

  const { data, loading, error } = useFetch(
    `https://online-book-store-r5k7.onrender.com/api/v1/admin/user?page=${currentPage}&limit=${itemsPerPage}`
  );

  useEffect(() => {
    if (data) {
      const extractedData = data.data.results.map((user) => ({
        firstName: user?.firstName,
        email: user?.email,
        address: user?.address,
        phoneNumber: user?.phoneNumber,
        role: user?.role,
        id: user?._id,
      }));
      setUsers(extractedData);
      setTotalPages(data.data.numOfPages);
    }
  }, [data, currentPage]);

  if (error) {
    return <Page404 />;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="ml-[26%]  sm:ml-[20%] md:ml-[16%] px-4 py-8">
      <Header
        title={"All Users"}
        buttonText={"Add Admin"}
        route="/Users/AddAdmin"
      />
      <div className=" py-8">
        <Table columns={thead} data={users} loading={loading} />
      </div>
      {users.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
