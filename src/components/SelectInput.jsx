import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";

const SelectField = ({ field, values, setFieldValue }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(field.options);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const newFilteredOptions = field.options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(newFilteredOptions);
  };

  const handleOptionSelect = (option) => {
    setFieldValue(field.name, option.value);
    setInputValue(option.label);
    setFilteredOptions(field.options);
  };

  const currentOption = field.options.find(
    (option) => option.value === values[field.name]
  );

  return (
    <>
      <label htmlFor={field.name} className="block text-sm font-bold mb-2">
        {field.title}
      </label>
      <input
        type="text"
        className="mt-1 block w-full p-2 border border-gray-300 rounded"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Select"
      />
      <ul className="border border-gray-300 rounded mt-1">
        {filteredOptions.map((option) => (
          <li
            key={option.value}
            className="p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => handleOptionSelect(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
      {currentOption && (
        <input type="hidden" name={field.name} value={currentOption.value} />
      )}
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-600 text-sm"
      />
    </>
  );
};

export default SelectField;
