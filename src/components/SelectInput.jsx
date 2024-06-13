import React from "react";
import { Field, ErrorMessage } from "formik";

const SelectField = ({ field, values, setFieldValue }) => {
  const currentOption = field.options.find(
    (option) => option.label === values[field.name]
  );

  console.log(currentOption);

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
        {currentOption ? (
          <>
            <option value={currentOption.value}>{currentOption.label}</option>
            {field.options
              .filter((option) => option.value !== currentOption.value)
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </>
        ) : (
          <>
            <option value="">Select</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </>
        )}
      </Field>
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-600 text-sm"
      />
    </>
  );
};

export default SelectField;
