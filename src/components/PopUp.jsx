import React from "react";

export default function PopUp({ onDelete, onCancel, loading }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg">
        <p>Are you sure you want to delete?</p>
        <div className="mt-11 flex justify-center">
          {loading ? (
            <button className="btn mr-7">
              <span className="loading loading-spinner"></span>
              loading
            </button>
          ) : (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-4"
              onClick={onDelete}
            >
              Delete
            </button>
          )}

          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
