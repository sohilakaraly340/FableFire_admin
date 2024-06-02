import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import useFetch from "../../hooks/useFetch";
import useDelete from "../../hooks/useDelete";
import { Link } from "react-router-dom";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import PopUp from "../../components/PopUp";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

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
      let res = await deleteResource(deleteItemId);
      setCategory((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== deleteItemId)
      );
      console.log(res);
      setShowDeleteModal(false);
    } catch (error) {
      console.error(
        `Failed to delete category with id: ${deleteItemId}`,
        error
      );
    }
  };

  const { deleteResource } = useDelete(
    "http://localhost:3005/api/v1/admin/category"
  );

  const { data, loading, error } = useFetch(
    "http://localhost:3005/api/v1/category"
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
      {showDeleteModal && (
        <PopUp
          onDelete={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
