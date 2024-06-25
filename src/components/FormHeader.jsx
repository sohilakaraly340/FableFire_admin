import React from "react";
import FormButton from "./FormButton";

export default function FormHeader({ mode, page, loading }) {
  return (
    <div className="sticky top-0 flex justify-between items-center bg-white z-5 py-8 md:px-4">
      <p className="text-2xl font-bold">
        {mode === "add" ? `Add ${page}` : `Edit ${page}`}
      </p>
      <FormButton loading={loading} mode={mode} />
    </div>
  );
}
