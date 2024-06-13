import React from "react";

export default function FormButton({ loading, mode }) {
  return (
    <button
      type="submit"
      className="relative overflow-hidden bg-button hover:bg-[#907566] text-white py-3 px-5 rounded focus:outline-none"
    >
      {loading ? (
        <>
          <span className="loading loading-spinner"></span>
          Loading
        </>
      ) : mode === "add" ? (
        "Add"
      ) : (
        "Save"
      )}
    </button>
  );
}
