import React, { useEffect, useState } from "react";
import { Field, ErrorMessage } from "formik";

const SelectField = ({ field, values, setFieldValue }) => {
  const currentOption = field.options.find(
    (option) => option.label === values[field.name]
  );

  const [inputValue, setInputValue] = useState(
    currentOption ? currentOption.label : ""
  );

  useEffect(() => {
    if (Object.keys(values).length > 0 && currentOption) {
      setFieldValue(field.name, currentOption.value);
    }
  }, [values, currentOption, setFieldValue, field.name]);

  const [filteredOptions, setFilteredOptions] = useState(field.options);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    if (currentOption) {
      setInputValue(currentOption.label);
    }
  }, [currentOption]);

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
    setIsDropdownVisible(false);
  };

  const handleInputFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsDropdownVisible(false), 600);
  };

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
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Select"
      />
      {isDropdownVisible && (
        <ul className="border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto">
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
