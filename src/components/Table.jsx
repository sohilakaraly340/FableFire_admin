import React, { useState } from "react";
import usePatch from "../hooks/usePatch";
import CurrencyConverter from "./CurrencyConverter";
import fallbackImage from "../assets/images/imgError.png";

export default function Table({ columns, data, loading }) {
  const [selectedStatus, setSelectedStatus] = useState({});
  const { patchResource } = usePatch(
    "https://online-book-store-r5k7.onrender.com/api/v1/admin/order"
  );
  const [imageStates, setImageStates] = useState({});

  const handleStatusChange = async (event, rowIndex, id) => {
    const { value } = event.target;
    setSelectedStatus((prevState) => ({
      ...prevState,
      [rowIndex]: value,
    }));

    await patchResource(id, { status: value }, "application/json");
  };

  const handleImageLoad = (rowIndex) => {
    setImageStates((prevState) => ({
      ...prevState,
      [rowIndex]: { loading: false, error: false },
    }));
  };

  const handleImageError = (rowIndex) => {
    setImageStates((prevState) => ({
      ...prevState,
      [rowIndex]: { loading: false, error: true },
    }));
  };

  const renderCellData = (column, row, rowIndex) => {
    const cellData = row[column.accessor];
    const imageState = imageStates[rowIndex] || { loading: true, error: false };

    if (column.accessor === "status") {
      return (
        <select
          value={selectedStatus[rowIndex] || cellData}
          onChange={(e) => handleStatusChange(e, rowIndex, row.id)}
          className="p-2 w-28 text-center m-auto border border-none rounded-lg"
        >
          <option value="Pending">Pending</option>
          <option value="Canceled">Canceled</option>
          <option value="Accepted">Accepted</option>
        </select>
      );
    }

    if (column.accessor === "images") {
      return (
        <>
          {imageState.loading && (
            <div className="skeleton h-10 md:h-36 w-full m-auto"></div>
          )}
          {!imageState.loading && imageState.error && (
            <img src={fallbackImage} alt="Fallback" className="m-auto w-1/4" />
          )}
          {!imageState.error && (
            <img
              src={cellData[0]}
              className="w-[100%] md:w-[80%] md:h-[150px] m-auto object-cover"
              onLoad={() => handleImageLoad(rowIndex)}
              onError={() => handleImageError(rowIndex)}
              style={{ display: imageState.loading ? "none" : "block" }}
            />
          )}
        </>
      );
    }

    if (column.accessor === "price" || column.accessor === "totalPrice") {
      return (
        <div className="flex items-center justify-center">
          <CurrencyConverter price={row.price || row.totalPrice}>
            {({ localPrice, currency }) => (
              <>
                <span>{localPrice}</span>
                <span className="ml-1">{currency}</span>
              </>
            )}
          </CurrencyConverter>
        </div>
      );
    }

    if (column.accessor === "date") {
      const date = new Date(cellData);
      const formattedDateTime = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });

      return formattedDateTime;
    }

    return cellData;
  };

  return (
    <div className="overflow-x-auto">
      <table className="table border border-sidebar">
        <thead className="bg-sidebar text-center">
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {loading ? (
            Array.from({ length: 2 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    <div className="skeleton h-2 w-[100px] mx-auto my-2"></div>
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 && !loading ? (
            <tr>
              <td colSpan={columns.length}>
                <p className="text-3xl font-bold my-11">No Data</p>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="w-[200px]">
                    {column.render
                      ? column.render(row, rowIndex)
                      : renderCellData(column, row, rowIndex)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
