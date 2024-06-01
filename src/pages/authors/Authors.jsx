import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import useFetch from "../../hooks/useFetch";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  const thead = [
    { header: "Image", accessor: "image" },
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    {
      header: "Actions",
      render: (row) => (
        <>
          <button className="mr-8" onClick={() => handleEdit(row.id)}>
            <img src={edit} />
          </button>
          <button onClick={() => handleDelete(row.id)}>
            <img src={trash} />
          </button>
        </>
      ),
    },
  ];

  const { data, loading, error } = useFetch(
    "http://localhost:3005/api/v1/author/"
  );

  const handleEdit = (id) => {
    console.log(`Edit ${id}`);
  };
  const handleDelete = (id) => {
    console.log(`Delete ${id}`);
  };

  useEffect(() => {
    if (data) {
      const extractedData = data.data.map((author) => ({
        name: author.name,
        description: author.description,
        image: author.images[0],
      }));
      setAuthors(extractedData);
    }
  }, [data]);

  if (error) {
    return (
      <p className="flex justify-center items-center w-[50%]">Ooops Error!</p>
    );
  }

  return (
    <div>
      <Header
        title={"All Authors"}
        buttonText={"Add Author"}
        route="/Authors/AddAuthor"
      />
      <div className="px-20 py-8">
        <Table columns={thead} data={authors} loading={loading} />
      </div>
    </div>
  );
}
