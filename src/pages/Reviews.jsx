import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import useFetch from "../hooks/useFetch";
import useDelete from "../hooks/useDelete";

import trash from "../assets/images/icons/trash.svg";
import PopUp from "../components/PopUp";
import Page404 from "./Page404";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(null);

  const thead = [
    {
      header: "Product",
      accessor: "item",
      render: (row) => (
        <div className="flex items-center justify-center">
          <img src={row.itemImage} className="w-10 h-10 rounded-full mr-2" />
          <span>{row.itemName}</span>
        </div>
      ),
    },
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
    { header: "Review", accessor: "review" },
    {
      header: "Action",
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
    setDeleteReviewId(id);
  };
  const handleDelete = async () => {
    await deleteResource(deleteReviewId);
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== deleteReviewId)
    );
    setShowDeleteModal(false);
  };

  const { deleteResource, loading: loadingDelete } = useDelete(
    "http://localhost:3005/api/v1/review"
  );

  const { data, loading, error } = useFetch(
    "http://localhost:3005/api/v1/review"
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      const extractedData = data.Reviews.map((review) => ({
        itemName: review.item.title,
        itemImage: review.item.images[0],
        userName: review.user.firstName,
        userImage: review.user.images[0],
        review: review.review,
        id: review.id,
      }));
      setReviews(extractedData);
    }
  }, [data]);

  if (error) {
    return <Page404 />;
  }
  return (
    <div className="ml-[26%] sm:ml-[20%] md:ml-[16%] px-4 py-8">
      <div className="flex justify-between items-center ">
        <p className="text-2xl font-bold px-8">All Reviews</p>
      </div>
      <div className="py-8">
        <Table columns={thead} data={reviews} loading={loading} />
      </div>
      {showDeleteModal && (
        <PopUp
          onDelete={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          loading={loadingDelete}
        />
      )}
    </div>
  );
}
