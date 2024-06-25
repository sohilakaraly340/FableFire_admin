import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import useFetch from "../hooks/useFetch";
import useDelete from "../hooks/useDelete";
import trash from "../assets/images/icons/trash.svg";
import PopUp from "../components/PopUp";
import Page404 from "./Page404";
import Pagination from "../components/Pagination";

export default function UsedItems() {
  const [usedItems, setUsedItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;
  const thead = [
    { header: "Image", accessor: "images" },
    { header: "Name", accessor: "title" },
    { header: "Price", accessor: "price" },
    { header: "Email", accessor: "email" },
    {
      header: "User",
      accessor: "user",
      render: (row) => (
        <div className="flex items-center justify-center ">
          <img src={row.userImage} className="w-10 h-10 rounded-full mr-2" />
          <span>{row.userName}</span>
        </div>
      ),
    },
    {
      header: "Actions",
      render: (row) => (
        <>
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
    setUsedItems((prevItems) =>
      prevItems.filter((item) => item.id !== deleteItemId)
    );
    setShowDeleteModal(false);
  };

  const { deleteResource, loading: loadingDelete } = useDelete(
    "http://localhost:3005/api/v1/usedItem"
  );

  const { data, loading, error } = useFetch(
    `http://localhost:3005/api/v1/usedItem?page=${currentPage}&limit=${itemsPerPage}`
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      const extractedData = data.data.results.map((item) => ({
        title: item.title,
        images: item.images,
        userName: item.user.firstName,
        userImage: item.user.images,
        price: item.price,
        email: item.email,
        id: item._id,
      }));
      setUsedItems(extractedData);
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
    <div className="ml-[26%] sm:ml-[20%] md:ml-[16%] px-4 py-8">
      <div className="flex justify-between items-center ">
        <p className="text-2xl font-bold ">All Used Items</p>
      </div>
      <div className="py-8">
        <Table columns={thead} data={usedItems} loading={loading} />
      </div>
      {showDeleteModal && (
        <PopUp
          onDelete={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          loading={loadingDelete}
        />
      )}
      {usedItems.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
