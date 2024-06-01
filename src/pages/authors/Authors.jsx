import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import useFetch from "../../hooks/useFetch";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import { Link } from "react-router-dom";
import useDelete from "../../hooks/useDelete";

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  const thead = [
    { header: "Image", accessor: "images" },
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    {
      header: "Actions",
      render: (row) => (
        <>
          <Link to="/Authors/EditAuthor" state={{ fromEdit: { row } }}>
            <button className="mr-8">
              <img src={edit} />
            </button>
          </Link>
          <button onClick={() => handleDelete(row.id)}>
            <img src={trash} />
          </button>
        </>
      ),
    },
  ];

  const {
    deleteResource,
    loading: deleteLoading,
    error: deleteError,
  } = useDelete("http://localhost:3005/api/v1/admin/author", {
    JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNzA0ODEsImV4cCI6MTcxNzM1Njg4MX0.Pei2vuy2vhbP1PxMHYlLERmeMxI4LOhAqlZEgI7qFss`,
  });

  const handleDelete = async (id) => {
    try {
      await deleteResource(id);
      setAuthors((prevAuthors) => prevAuthors.filter((auth) => auth.id !== id));
      console.log(`Deleted category with id: ${id}`);
    } catch (error) {
      console.error(`Failed to delete category with id: ${id}`, error);
    }
  };

  const { data, loading, error } = useFetch(
    "http://localhost:3005/api/v1/author/"
  );

  useEffect(() => {
    if (data) {
      const extractedData = data.data.map((author) => ({
        name: author.name,
        description: author.description,
        images: author.images,
        id: author._id,
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
