import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";
import edit from "../assets/images/icons/edit.svg";
import trash from "../assets/images/icons/trash.svg";
import { Link } from "react-router-dom";
import useDelete from "../hooks/useDelete";
import PopUp from "../components/PopUp";
import Page404 from "./Page404";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";

export default function Item() {
  const [allItem, setAllItem] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const itemsPerPage = 3;

  const thead = [
    { header: "Image", accessor: "images" },
    { header: "Name", accessor: "title" },
    { header: "Price", accessor: "price" },
    { header: "No.Stock", accessor: "countInStock" },
    { header: "Category", accessor: "category" },
    { header: "Type", accessor: "itemType" },
    {
      header: "Actions",
      render: (row) => (
        <>
          <Link to="/Items/EditItem" state={{ fromEdit: { row } }}>
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
    setAllItem((prevItems) =>
      prevItems.filter((item) => item.id !== deleteItemId)
    );
    setShowDeleteModal(false);
  };

  const { deleteResource, loading: loadingDelete } = useDelete(
    "http://localhost:3005/api/v1/admin/item"
  );
  const { data, loading, error } = useFetch(
    `http://localhost:3005/api/v1/item?page=${currentPage}&limit=${itemsPerPage}`
  );

  const mapItemData = (items) =>
    items.map((item) => ({
      title: item?.title,
      price: item?.price,
      description: item?.description,
      publicationDate: item?.publicationDate,
      numOfPage: item?.numOfPage,
      itemType: item?.itemType?.itemType,
      countInStock: item?.countInStock,
      images: item?.images,
      category: item?.category?.title,
      id: item?._id,
      duration: item?.duration,
      discount: item?.discount,
      authorId: item?.authorId?.name,
    }));

  useEffect(() => {
    if (data) {
      setAllItem(mapItemData(data.data.results));
      setTotalPages(data.data.numOfPages);
    }
  }, [data, currentPage, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        try {
          setSearchLoading(true);
          const { data } = await axios.get(
            `http://localhost:3005/api/v1/item/search/${searchTerm}?page=${currentPage}&limit=${itemsPerPage}`
          );
          setSearchResults(mapItemData(data.data.itemsByTitle));
          setTotalPages(
            Math.ceil(data.data.itemsByTitle.length / itemsPerPage)
          );
        } catch (error) {
          toast.error(`Error fetching : ${error.response.data.message}`);
        }
      } else {
        setSearchResults([]);
      }
      setSearchLoading(false);
    };

    fetchSearchResults();
  }, [searchTerm, totalPages, currentPage]);

  if (error) {
    return <Page404 />;
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayedItems = searchTerm ? searchResults : allItem;

  return (
    <div className="ml-[26%]  sm:ml-[20%] md:ml-[16%] px-4 py-8">
      <Header
        title={"All Items"}
        buttonText={"Add Item"}
        route="/Items/AddItem"
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <div className="py-8">
        <Table
          columns={thead}
          data={displayedItems}
          loading={loading || searchLoading}
        />
      </div>
      {showDeleteModal && (
        <PopUp
          onDelete={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          loading={loadingDelete}
        />
      )}
      {allItem.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
