import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const editItemValidationSchema = Yup.object({
  itemName: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  noOfPages: Yup.number()
    .required("Required")
    .positive("Must be a positive number")
    .integer("Must be an integer"),
  publicationDate: Yup.date().required("Required"),
  price: Yup.number()
    .required("Required")
    .positive("Must be a positive number"),
  noOfStock: Yup.number()
    .required("Required")
    .positive("Must be a positive number")
    .integer("Must be an integer"),
});

const editItemInitialValues = {
  itemName: "",
  description: "",
  image: "",
  noOfPages: "",
  publicationDate: "",
  price: "",
  noOfStock: "",
  type: "Books",
  category: "Fiction",
  author: "Marvin Merritt",
};

const arr = [
  { name: "itemName", title: "Item Name", type: "text" },
  { name: "description", title: "Description", type: "textarea" },
  { name: "image", title: "Image", type: "file" },
  { name: "noOfPages", title: "No. of Pages", type: "number" },
  { name: "publicationDate", title: "Publication Date", type: "date" },
  { name: "price", title: "Price", type: "number" },
  { name: "noOfStock", title: "No of Stock", type: "number" },
  {
    name: "type",
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
    name: "author",
    title: "Author",
    as: "select",
    options: [{ value: "Marvin Merritt", label: "Marvin Merritt" }],
  },
];

export default function AddItem() {
  const [imagePreview, setImagePreview] = useState(null);

  const submit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === "image" && values[key]) {
        formData.append(key, values[key]);
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          JWT: ``,
        },
      });
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
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
            {arr.map((field, index) => (
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
                      onChange={(event) =>
                        handleImageChange(event, setFieldValue)
                      }
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-40 w-40 object-cover"
                        />
                      </div>
                    )}
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
                className="mt-4 bg-blue-500 text-white p-2 rounded"
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
