import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import useFetch from "../../hooks/useFetch";

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
    "http://localhost:3005/api/v1/admin/user",
    {
      headers: {
        "Content-Type": "multipart/form-data",
        JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcwOTg0MzIsImV4cCI6MTcxNzE4NDgzMn0.w9jGobI-59qnNTCGBRpef1zDVVK76OXu4WsVw4p-FXc`,
      },
    }
  );

  useEffect(() => {
    if (data) {
      const extractedData = data.data.map((user) => ({
        firstName: user.firstName,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        role: user.role,
      }));
      setUsers(extractedData);
    }
  }, [data]);

  if (loading) {
    return <p className="flex justify-center items-center w-[50%]">loading</p>;
  }

  if (error) {
    return <p className="flex justify-center items-center w-[50%]">error</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center ">
        <p className="text-2xl font-bold px-8">All User</p>
      </div>
      <div className="px-20 py-8">
        <Table columns={thead} data={users} />
      </div>
    </div>
  );
}
