import axios from "axios";
import React, { useState } from "react";
import usePatch from "../hooks/usePatch";

export default function Table({ columns, data, loading }) {
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(false);

  const {
    patchResource,
    loading: patchLoading,
    error: patchError,
  } = usePatch("http://localhost:3005/api/v1/admin/order");

  const handleStatusChange = async (event, rowIndex, id) => {
    const { value } = event.target;
    setSelectedStatus((prevState) => ({
      ...prevState,
      [rowIndex]: value,
    }));

    setLoadingStatus(patchLoading);
    await patchResource(id, { status: value });
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
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <p className="text-3xl font-bold my-11">No Data</p>
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => {
                  const cellData = row[column.accessor];

                  const renderedData =
                    column.accessor === "status" ? (
                      <select
                        value={selectedStatus[rowIndex] || cellData}
                        onChange={(e) =>
                          handleStatusChange(e, rowIndex, row.id)
                        }
                        className={`p-2 w-28 text-center m-auto border border-none rounded-lg `}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Canceled">Canceled</option>
                        <option value="Accepted">Accepted</option>
                      </select>
                    ) : column.accessor === "images" ? (
                      <img
                        src={`${cellData[0]}`}
                        className="w-[150px] md:w-[100%]  m-auto"
                        alt="image"
                      />
                    ) : (
                      cellData
                    );

                  return (
                    <td key={colIndex} className="w-[200px]">
                      {column.render ? column.render(row) : renderedData}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
