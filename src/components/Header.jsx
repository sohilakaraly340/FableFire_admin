import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function Header({
  title,
  buttonText,
  route,
  searchTerm = "",
  handleSearch = null,
}) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-2xl font-bold">{title}</p>
      {title === "All Items" && (
        <input
          type="text"
          placeholder={`Search ...`}
          value={searchTerm}
          onChange={handleSearch}
          className="w-1/2 p-2 border border-[#E3D5CA] rounded-md"
        />
      )}
      {route ? (
        <Link to={route}>
          <Button text={buttonText} />
        </Link>
      ) : (
        <Button text={buttonText} />
      )}
    </div>
  );
}
