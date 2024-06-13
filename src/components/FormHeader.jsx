import React from "react";
import FormButton from "./FormButton";

export default function FormHeader({ mode, page, loading }) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-2xl font-bold md:px-8">
        {mode === "add" ? `Add ${page}` : `Edit ${page}`}
      </p>
      <FormButton loading={loading} mode={mode} />
    </div>
  );
}
