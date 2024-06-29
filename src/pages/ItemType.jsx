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

export default function ItemType() {
  const [allItemType, setAllItemType] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const thead = [
    { header: "Item Type", accessor: "itemType" },
    {
      header: "Actions",
      render: (row) => (
        <>
          <Link to="/ItemTypes/EditItemType" state={{ fromEdit: { row } }}>
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
    setAllItemType((prevItems) =>
      prevItems.filter((itemType) => itemType.id !== deleteItemId)
    );
    setShowDeleteModal(false);
  };

  const { deleteResource, loading: loadingDelete } = useDelete(
    "https://online-book-store-r5k7.onrender.com/api/v1/admin/itemType"
  );

  const { data, loading, error } = useFetch(
    "https://online-book-store-r5k7.onrender.com/api/v1/admin/itemType",
    {}
  );
  useEffect(() => {
    if (data) {
      const extractedData = data.data.map((itemType) => ({
        itemType: itemType?.itemType,
        id: itemType?._id,
      }));
      setAllItemType(extractedData);
    }
  }, [data]);
  if (error) {
    return <Page404 />;
  }
  return (
    <div className="ml-[26%]  sm:ml-[20%] md:ml-[16%] px-4 py-8">
      <Header
        title={"All Items Type"}
        buttonText={"Add Item Type"}
        route="/ItemTypes/AddItemType"
      />
      <div className=" py-8">
        <Table columns={thead} data={allItemType} loading={loading} />
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
