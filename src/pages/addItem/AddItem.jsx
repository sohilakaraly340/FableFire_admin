import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import FormCom from "../../components/FormCom";
import { useLocation } from "react-router-dom";

const ValidationSchema = Yup.object({
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

export default function AddItem({ mode, initialValues = {} }) {
  const [loading, setloading] = useState(false);
  const location = useLocation();

  if (location.state && location.state.fromEdit) {
    initialValues = location.state.fromEdit.row;
  }

  const submit = async (values) => {
    console.log(values);

    const formData = new FormData();
    for (const key in values) {
      if (key === "images" && values[key].length > 0) {
        values[key].forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      setloading(true);
      const url =
        mode === "edit"
          ? `http://localhost:3005/api/v1/admin/item/${values.id}`
          : "http://localhost:3005/api/v1/admin/item";

      const method = mode === "edit" ? "patch" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNzA0ODEsImV4cCI6MTcxNzM1Njg4MX0.Pei2vuy2vhbP1PxMHYlLERmeMxI4LOhAqlZEgI7qFss`,
        },
      });

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    setloading(false);
  };

  return (
    <FormCom
      submit={submit}
      ValidationSchema={ValidationSchema}
      initialValues={initialValues}
      inputs={inputs}
      loading={loading}
      mode={mode}
      page="Item"
    />
  );
}
