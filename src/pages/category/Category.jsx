import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import useFetch from "../../hooks/useFetch";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import useDelete from "../../hooks/useDelete";
import { Link } from "react-router-dom";

export default function Category() {
  const [category, setCategory] = useState([]);

  const thead = [
    { header: "Image", accessor: "images" },
    { header: "Name", accessor: "title" },
    { header: "Description", accessor: "description" },
    {
      header: "Actions",
      render: (row) => (
        <>
          <Link to="/Categories/EditCategory" state={{ fromEdit: { row } }}>
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
  } = useDelete("http://localhost:3005/api/v1/admin/category", {
    JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNzA0ODEsImV4cCI6MTcxNzM1Njg4MX0.Pei2vuy2vhbP1PxMHYlLERmeMxI4LOhAqlZEgI7qFss`,
  });

  const handleDelete = async (id) => {
    try {
      await deleteResource(id);
      setCategory((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== id)
      );
      console.log(`Deleted category with id: ${id}`);
    } catch (error) {
      console.error(`Failed to delete category with id: ${id}`, error);
    }
  };

  const { data, loading, error } = useFetch(
    "http://localhost:3005/api/v1/category",
    {}
  );

  useEffect(() => {
    if (data) {
      const extractedData = data.data.map((cat) => ({
        title: cat.title,
        description: cat.description,
        images: cat.images,
        id: cat._id,
      }));
      setCategory(extractedData);
    }
  }, [data]);

  if (error) {
    return (
      <p className="flex justify-center items-center w-[50%]">Ooops Error!</p>
    );
  }

  return (
    <>
      <Header
        title={"All Categories"}
        buttonText={"Add Category"}
        route="/Categories/AddCategory"
      />
      <div className="px-20 py-8">
        <Table columns={thead} data={category} loading={loading} />
      </div>
    </>
  );
}
