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
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcxODA5NTcsImV4cCI6MTcxNzI2NzM1N30.0fCVqtZdq8v3cI4hQNpLPJuvoDYlM2X3qqMz1ZwcoJg",
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

  if (error) {
    return (
      <p className="flex justify-center items-center w-[50%]">Ooops Error!</p>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center ">
        <p className="text-2xl font-bold px-8">All User</p>
      </div>
      <div className="px-20 py-8">
        <Table columns={thead} data={users} loading={loading} />
      </div>
    </div>
  );
}
