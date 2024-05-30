import React, { useContext } from "react";
import Header from "../../components/Header";
import { Context } from "../../contexts/Context";
import Table from "../../components/Table";

export default function Category() {
  const { header1, data1 } = useContext(Context);

  return (
    <>
      <Header title={"All Categories"} buttonText={"Add Category"} />
      <div className="px-20 py-8">
        <Table columns={header1} data={data1} />
      </div>
    </>
  );
}
