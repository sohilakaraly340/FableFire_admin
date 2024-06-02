import axios from "axios";
import React, { useState } from "react";

export default function Table({ columns, data, loading }) {
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleStatusChange = async (event, rowIndex, id) => {
    const { value } = event.target;
    setSelectedStatus((prevState) => ({
      ...prevState,
      [rowIndex]: value,
    }));

    console.log(value, id);

    try {
      setLoadingStatus(true);

      const response = await axios({
        method: "patch",
        url: `http://localhost:3005/api/v1/admin/order/${id}`,
        data: { status: value },
        headers: {
          JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNzA0ODEsImV4cCI6MTcxNzM1Njg4MX0.Pei2vuy2vhbP1PxMHYlLERmeMxI4LOhAqlZEgI7qFss`,
        },
      });

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoadingStatus(false);
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
            data.map((row, rowIndex) => (
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
                        className="w-[150px] h-[150px] m-auto"
                        alt="image"
                      />
                    ) : (
                      cellData
                    );

                  return (
                    <td key={colIndex} className="w-[100px]">
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
