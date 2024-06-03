import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import FormCom from "../../components/FormCom";
import { useLocation } from "react-router-dom";
import usePatch from "../../hooks/usePatch";
import usePost from "../../hooks/usePost";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  if (location.state && location.state.fromEdit) {
    initialValues = location.state.fromEdit.row;
  }

  const {
    postResource,
    loading: postLoading,
    error: postError,
  } = usePost("http://localhost:3005/api/v1/admin/item");

  const {
    patchResource,
    loading: patchLoading,
    error: patchError,
  } = usePatch("http://localhost:3005/api/v1/admin/item");

  useEffect(() => {
    if (mode === "edit") {
      setLoading(patchLoading);
      setError(patchError);
    } else {
      setLoading(postLoading);
      setError(postError);
    }
  }, [patchLoading, patchError, postLoading, postError, mode]);

  const submit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === "images" && values[key].length > 0) {
        values[key].forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      let res;
      if (mode === "edit") {
        res = await patchResource(values.id, formData);
      } else {
        res = await postResource(formData);
      }
      console.log(res);
    } catch (err) {
      console.error(err);
    }
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
