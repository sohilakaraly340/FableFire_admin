import React, { useContext } from "react";
import Table from "../../components/Table";
import { Context } from "../../contexts/Context";

export default function Order() {
  const { header1, data1 } = useContext(Context);

  return (
    <>
      <div className="flex justify-between items-center ">
        <p className="text-2xl font-bold px-8">All Orders</p>
      </div>
      <div className="px-20 py-8">
        <Table columns={header1} data={data1} />
      </div>
    </>
  );
}
