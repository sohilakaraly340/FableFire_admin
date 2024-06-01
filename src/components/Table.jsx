import React from "react";
import icon from "../assets/images/icons/ordersIcon.svg";

export default function Table({ columns, data, loading }) {
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
          {loading
            ? Array.from({ length: 2 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>
                      <div className="skeleton h-2 w-[50%] mx-auto my-2"></div>
                    </td>
                  ))}
                </tr>
              ))
            : data.map((row, i) => (
                <tr key={i}>
                  {columns.map((column, colIndex) => {
                    const cellData = row[column.accessor];

                    const renderedData =
                      column.accessor === "image" ? (
                        <img
                          src={`http://localhost:3005/uploads/${cellData}`}
                          alt="image"
                        />
                      ) : (
                        cellData
                      );

                    return (
                      <td key={colIndex}>
                        {column.render ? column.render(row) : renderedData}
                      </td>
                    );
                  })}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
