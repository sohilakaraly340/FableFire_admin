import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const editItemValidationSchema = Yup.object({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  numOfPage: Yup.number()
    .required("Required")
    .positive("Must be a positive number")
    .integer("Must be an integer"),
  publicationDate: Yup.date().required("Required"),
  price: Yup.number()
    .required("Required")
    .positive("Must be a positive number"),
  countInStock: Yup.number()
    .required("Required")
    .positive("Must be a positive number")
    .integer("Must be an integer"),
  images: Yup.array().min(1, "At least one image is required"),
});

const editItemInitialValues = {
  title: "",
  description: "",
  images: [],
  numOfPage: "",
  publicationDate: "",
  price: "",
  countInStock: "",
  itemType: "Books",
  category: "Fiction",
  authorId: "Marvin Merritt",
};

const inputs = [
  { name: "title", title: "Item Name", type: "text" },
  { name: "description", title: "Description", type: "textarea" },
  { name: "images", title: "Images", type: "file", multiple: true },
  { name: "numOfPage", title: "No. of Pages", type: "number" },
  { name: "publicationDate", title: "Publication Date", type: "date" },
  { name: "price", title: "Price", type: "number" },
  { name: "countInStock", title: "No of Stock", type: "number" },
  {
    name: "itemType",
    title: "Type",
    as: "select",
    options: [{ value: "Books", label: "Books" }],
  },
  {
    name: "category",
    title: "Category",
    as: "select",
    options: [{ value: "Fiction", label: "Fiction" }],
  },
  {
    name: "authorId",
    title: "Author",
    as: "select",
    options: [{ value: "Marvin Merritt", label: "Marvin Merritt" }],
  },
];

export default function AddItem() {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setloading] = useState(false);

  const submit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === "images" && values[key].length > 0) {
        values[key].forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, values[key]);
      }
    }

    console.log(formData);

    try {
      setloading(true);
      const response = await axios.post(
        "http://localhost:3005/api/v1/admin/item",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcwOTg0MzIsImV4cCI6MTcxNzE4NDgzMn0.w9jGobI-59qnNTCGBRpef1zDVVK76OXu4WsVw4p-FXc`,
          },
        }
      );
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    setloading(false);
  };

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.currentTarget.files);
    setFieldValue("images", files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
      <Formik
        initialValues={editItemInitialValues}
        validationSchema={editItemValidationSchema}
        onSubmit={submit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            {inputs.map((field, index) => (
              <div key={index}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium"
                >
                  {field.title}
                </label>
                {field.type === "file" ? (
                  <>
                    <input
                      name={field.name}
                      type="file"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded"
                      multiple={field.multiple}
                      onChange={(event) =>
                        handleImageChange(event, setFieldValue)
                      }
                    />
                    <div className="mt-2 flex space-x-2">
                      {imagePreviews.map((preview, idx) => (
                        <img
                          key={idx}
                          src={preview}
                          alt={`Preview ${idx}`}
                          className="h-40 w-40 object-cover"
                        />
                      ))}
                    </div>
                  </>
                ) : field.as === "select" ? (
                  <Field
                    name={field.name}
                    as="select"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                ) : (
                  <Field
                    name={field.name}
                    type={field.type}
                    as={field.type === "textarea" ? "textarea" : "input"}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                )}
                <ErrorMessage
                  name={field.name}
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            ))}

            <div>
              <button
                type="submit"
                className="mt-4 disabled:bg-slate-400 bg-blue-500 text-white p-2 rounded"
                disabled={loading}
              >
                Edit Item
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
