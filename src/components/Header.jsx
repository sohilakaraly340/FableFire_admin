import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function Header({ title, buttonText, route }) {
  return (
    <div className="flex justify-between items-center ">
      <p className="text-2xl font-bold ">{title}</p>
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
