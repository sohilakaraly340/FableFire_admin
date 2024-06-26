import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import useFetch from "../hooks/useFetch";
import useDelete from "../hooks/useDelete";
import { Link } from "react-router-dom";
import edit from "../assets/images/icons/edit.svg";
import trash from "../assets/images/icons/trash.svg";
import PopUp from "../components/PopUp";
import Page404 from "./Page404";
import Pagination from "../components/Pagination";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 2;
  const thead = [
    { header: "Image", accessor: "images" },
    { header: "Name", accessor: "title" },
    { header: "Description", accessor: "description" },
    {
      header: "Actions",
      render: (row) => (
        <>
          <Link to="/Categories/EditCategory" state={{ fromEdit: { row } }}>
            <button>
              <img src={edit} className="w-[1.6em] mb-2 md:mr-5 md:mb-0" />
            </button>
          </Link>
          <button onClick={() => handleDeleteConfirmation(row.id)}>
            <img src={trash} alt="Delete" className="w-[1.6em]" />
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
    await deleteResource(deleteItemId);
    setCategory((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== deleteItemId)
    );
    setShowDeleteModal(false);
  };

  const { deleteResource, loading: loadingDelete } = useDelete(
    "https://online-book-store-r5k7.onrender.com/api/v1/admin/category"
  );

  const { data, loading, error } = useFetch(
    `https://online-book-store-r5k7.onrender.com/api/v1/category?page=${currentPage}&limit=${itemsPerPage} `
  );

  useEffect(() => {
    if (data) {
      const extractedData = data.data.results.map((cat) => ({
        title: cat?.title,
        description: cat?.description,
        images: cat?.images,
        id: cat?._id,
      }));
      setCategory(extractedData);
      setTotalPages(data.data.numOfPages);
    }
  }, [data]);

  if (error) {
    return <Page404 />;
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="ml-[26%]  sm:ml-[20%] md:ml-[16%] px-4 py-8">
      <Header
        title={"All Categories"}
        buttonText={"Add Category"}
        route="/Categories/AddCategory"
      />
      <div className="py-8">
        <Table columns={thead} data={category} loading={loading} />
      </div>
      {showDeleteModal && (
        <PopUp
          onDelete={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          loading={loadingDelete}
        />
      )}
      {category.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
