import React from "react";
import { Link } from "react-router-dom";
export default function Button({ text, route }) {
  return (
    <Link to={route}>
      <button className="relative overflow-hidden bg-button hover:bg-[#907566] text-white py-3 px-9 rounded focus:outline-none">
        {text}
      </button>
    </Link>
  );
}
