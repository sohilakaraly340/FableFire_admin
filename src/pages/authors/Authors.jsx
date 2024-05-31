import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import useFetch from "../../hooks/useFetch";

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  const thead = [
    { header: "Image", accessor: "image" },
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
  ];

  const { data, loading, error } = useFetch(
    "http://localhost:3005/api/v1/author/"
  );

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

  if (loading) {
    return <p className="flex justify-center items-center w-[50%]">loading</p>;
  }

  if (error) {
    return <p className="flex justify-center items-center w-[50%]">error</p>;
  }
  return (
    <div>
      <Header
        title={"All Authors"}
        buttonText={"Add Author"}
        route="/Authors/AddAuthor"
      />
      <div className="px-20 py-8">
        <Table columns={thead} data={authors} />
      </div>
    </div>
  );
}
