import React from "react";
export default function Button({ text }) {
  return (
    <button className="relative overflow-hidden bg-button hover:bg-[#907566] text-white py-3 px-2 md:px-9  rounded focus:outline-none">
      {text}
    </button>
  );
}
