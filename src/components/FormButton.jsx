import React from "react";

export default function FormButton({ loading, mode }) {
  return (
    <button
      type="submit"
      className="relative overflow-hidden bg-button hover:bg-[#907566] text-white py-3 px-5 rounded focus:outline-none"
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner"></span>
          <span>Loading</span>
        </div>
      ) : mode === "add" ? (
        "Add"
      ) : (
        "Save"
      )}
    </button>
  );
}
