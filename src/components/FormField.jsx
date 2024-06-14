import React from "react";
import { Field, ErrorMessage } from "formik";

export default function FormField({ field, values, setFieldValue }) {
  return (
    <>
      <label htmlFor={field.name} className="block text-sm font-bold mb-2">
        {field.title}
      </label>
      <Field
        name={field.name}
        type={field.type}
        as={field.type === "textarea" ? "textarea" : "input"}
        className="mt-1 block w-full p-2 border border-button rounded"
      />

      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-600 text-sm"
      />
    </>
  );
}
