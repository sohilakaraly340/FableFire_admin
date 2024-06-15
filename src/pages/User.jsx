import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import useFetch from "../hooks/useFetch";
import Page404 from "./Page404";
import Header from "../components/Header";

export default function User() {
  const [users, setUsers] = useState([]);

  const thead = [
    { header: "Name", accessor: "firstName" },
    { header: "Email", accessor: "email" },
    { header: "Address", accessor: "address" },
    { header: "Phone", accessor: "phoneNumber" },
    { header: "Role", accessor: "role" },
  ];

  const { data, loading, error } = useFetch(
    "http://localhost:3005/api/v1/admin/user?page=1&limit=4"
  );

  useEffect(() => {
    if (data) {
      const extractedData = data.data.results.map((user) => ({
        firstName: user.firstName,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        role: user.role,
      }));
      setUsers(extractedData);
    }
  }, [data]);

  if (error) {
    return <Page404 />;
  }

  return (
    <div className="ml-[26%] sm:ml-[20%] md:ml-[16%] px-4 py-8">
      <Header
        title={"All Users"}
        buttonText={"Add Admin"}
        route="/Users/AddAdmin"
      />
      <div className=" py-8">
        <Table columns={thead} data={users} loading={loading} />
      </div>
    </div>
  );
}
