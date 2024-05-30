import React, { useContext } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { Context } from "../../contexts/Context";

export default function Authors() {
  const { header1, data1 } = useContext(Context);

  return (
    <div>
      <Header
        title={"All Authors"}
        buttonText={"Add Author"}
        route="/Authors/AddAuthor"
      />
      <div className="px-20 py-8">
        <Table columns={header1} data={data1} />
      </div>
    </div>
  );
}
