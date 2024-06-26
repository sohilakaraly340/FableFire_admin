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

export default function Event() {
  const [event, setEvent] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;
  const thead = [
    { header: "Image", accessor: "images" },
    { header: "Name", accessor: "name" },
    { header: "Location", accessor: "location" },
    { header: "Date", accessor: "date" },
    {
      header: "Actions",
      render: (row) => (
        <>
          <Link to="/Events/EditEvent" state={{ fromEdit: { row } }}>
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
    setDeleteEventId(id);
  };

  const handleDelete = async () => {
    await deleteResource(deleteEventId);
    setEvent((prevEvents) =>
      prevEvents.filter((event) => event.id !== deleteEventId)
    );
    setShowDeleteModal(false);
  };

  const { deleteResource, loading: loadingDelete } = useDelete(
    "https://online-book-store-r5k7.onrender.com/api/v1/admin/event"
  );

  const { data, loading, error } = useFetch(
    `https://online-book-store-r5k7.onrender.com/api/v1/event?page=${currentPage}&limit=${itemsPerPage}`
  );

  useEffect(() => {
    if (data) {
      const extractedData = data.data.results.map((event) => ({
        name: event?.name,
        description: event?.description,
        images: event?.images,
        id: event?._id,
        date: event?.date,
        location: event?.location,
        numOfTickets: event?.numOfTickets,
      }));
      setEvent(extractedData);
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
        title={"All Events"}
        buttonText={"Add Event"}
        route="/Events/AddEvent"
      />
      <div className="py-8">
        <Table columns={thead} data={event} loading={loading} />
      </div>
      {showDeleteModal && (
        <PopUp
          onDelete={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          loading={loadingDelete}
        />
      )}
      {event.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
