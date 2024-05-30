import React, { useContext } from "react";
import Table from "../../components/Table";
import Header from "../../components/Header";
import { Context } from "../../contexts/Context";

export default function Item() {
  const { header1, data1 } = useContext(Context);

  return (
    <>
      <Header
        title={"All Items"}
        buttonText={"Add Item"}
        route="/Items/AddItem"
      />
      <div className="px-20 py-8">
        <Table columns={header1} data={data1} />
      </div>
    </>
  );
}
