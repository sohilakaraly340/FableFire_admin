import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import useFetch from "../../hooks/useFetch";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import { Link } from "react-router-dom";
import useDelete from "../../hooks/useDelete";
import PopUp from "../../components/PopUp";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

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
              <img src={edit} alt="Edit" />
            </button>
          </Link>
          <button onClick={() => handleDeleteConfirmation(row.id)}>
            <img src={trash} alt="Delete" />
          </button>
        </>
      ),
    },
  ];

  const handleDeleteConfirmation = (id) => {
    setShowDeleteModal(true);
    setDeleteItemId(id);
  };

  const handleDelete = async () => {
    try {
      await deleteResource(deleteItemId);
      setAuthors((prevAuthors) =>
        prevAuthors.filter((auth) => auth.id !== deleteItemId)
      );
      console.log(`Deleted author with id: ${deleteItemId}`);
      setShowDeleteModal(false); // Close the modal after successful deletion
    } catch (error) {
      console.error(`Failed to delete author with id: ${deleteItemId}`, error);
    }
  };

  const { deleteResource } = useDelete(
    "http://localhost:3005/api/v1/admin/author",
    {
      JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNzA0ODEsImV4cCI6MTcxNzM1Njg4MX0.Pei2vuy2vhbP1PxMHYlLERmeMxI4LOhAqlZEgI7qFss`,
    }
  );

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
      {showDeleteModal && (
        <PopUp
          onDelete={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
