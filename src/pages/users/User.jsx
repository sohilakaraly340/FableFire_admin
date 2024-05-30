import React, { useContext } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { Context } from "../../contexts/Context";

export default function User() {
  const { header1, data1 } = useContext(Context);

  return (
    <div>
      <div className="flex justify-between items-center ">
        <p className="text-2xl font-bold px-8">All User</p>
      </div>
      {/* <Header title={"All Users"} buttonText={"Add User"} /> */}
      <div className="px-20 py-8">
        <Table columns={header1} data={data1} />
      </div>
    </div>
  );
}
