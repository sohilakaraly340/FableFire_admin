import React from "react";
import Button from "./Button";

export default function Header({ title, buttonText, route }) {
  return (
    <div className="flex justify-between items-center ">
      <p className="text-2xl font-bold px-8">{title}</p>
      <Button route={route} text={buttonText} />
    </div>
  );
}
