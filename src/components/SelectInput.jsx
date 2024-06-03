import React from "react";
import { Field, ErrorMessage } from "formik";

const SelectInput = ({ field, values, setFieldValue }) => {
  //   const currentOption = field.options.map((option) => {
  //     console.log(option.value, values[field.value]);

  //     return option.value === values[field.name];
  //   });
  //   console.log(field, values);

  return (
    <>
      <label htmlFor={field.name} className="block text-sm font-bold mb-2">
        {field.title}
      </label>
      <Field
        name={field.name}
        as="select"
        className="mt-1 block w-full p-2 border border-gray-300 rounded"
        value={values[field.name] || ""}
        onChange={(event) => setFieldValue(field.name, event.target.value)}
      >
        <option value="">Select {field.title}</option>
        {/* {currentOption && (
          <option value={currentOption.value} selected>
            {currentOption.label}
          </option>
        )} */}
        {field.options
          .filter((option) => option.value !== values[field.name])
          .map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </Field>
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-600 text-sm"
      />
    </>
  );
};

export default SelectInput;
