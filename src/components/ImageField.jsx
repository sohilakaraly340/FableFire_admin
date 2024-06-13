import React from "react";
import imageIcon from "../assets/images/icons/imgeIcon.png";

export default function ImageField({
  field,
  imagePreviews,
  handleImageChange,
  setFieldValue,
}) {
  return (
    <div className="block w-full p-6 text-center border-[2px] border-button border-dashed rounded">
      <div className="flex space-x-2 justify-center">
        {imagePreviews.length > 0 ? (
          imagePreviews.map((preview, idx) => (
            <img
              key={idx}
              src={preview}
              alt={`Preview ${idx}`}
              className="h-[200px] w-[200px] object-cover"
            />
          ))
        ) : (
          <img src={imageIcon} alt="Upload Icon" />
        )}
      </div>
      <input
        id={field.name}
        name={field.name}
        type="file"
        className="hidden"
        multiple={field.multiple}
        onChange={(event) => handleImageChange(event, setFieldValue)}
      />
      <label
        htmlFor={field.name}
        className="mt-3 block md:w-[30%] lg:w-[20%] mx-auto bg-button text-white p-2 rounded cursor-pointer text-center"
      >
        Upload Image
      </label>
    </div>
  );
}
