import React from "react";
import * as Yup from "yup";
import FormCom from "../components/FormCom";
import { useLocation, useNavigate } from "react-router-dom";
import usePatch from "../hooks/usePatch";
import usePost from "../hooks/usePost";
import useFetch from "../hooks/useFetch";

const ValidationSchema = Yup.object({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  numOfPage: Yup.number()
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
  itemType: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  authorId: Yup.string().required("Required"),
  discount: Yup.number()
    .min(0, "Min discount is 0")
    .max(90, "Max discount is 90%"),
  duration: Yup.number(),
});

const createInputs = (data) => {
  const itemTypeOptions =
    data?.data?.itemTypeOpitions?.map((option) => ({
      value: option._id,
      label: option.itemType,
    })) || [];
  const categoryOptions =
    data?.data?.categoryOpitions?.map((option) => ({
      value: option._id,
      label: option.title,
    })) || [];
  const authorOptions =
    data?.data?.authorOpitions?.map((option) => ({
      value: option._id,
      label: option.name,
    })) || [];

  return [
    { name: "title", title: "Item Name", type: "text" },
    { name: "description", title: "Description", type: "textarea" },
    { name: "images", title: "Images", type: "file", multiple: true },
    { name: "publicationDate", title: "Publication Date", type: "date" },
    { name: "price", title: "Price in USD", type: "number" },
    { name: "countInStock", title: "No of Stock", type: "number" },
    {
      name: "numOfPage",
      title: "No of Pages",
      type: "number",
      value: 0,
    },
    {
      name: "discount",
      title: "Discount",
      type: "number",
      value: 0,
    },
    {
      name: "duration",
      title: "Duration",
      type: "number",
      value: 0,
    },
    {
      name: "itemType",
      title: "Type",
      as: "select",
      options: itemTypeOptions,
    },
    {
      name: "category",
      title: "Category",
      as: "select",
      options: categoryOptions,
    },
    {
      name: "authorId",
      title: "Author",
      as: "select",
      options: authorOptions,
    },
  ];
};

export default function AddItem({ mode, initialValues = {} }) {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.state && location.state.fromEdit) {
    initialValues = location.state.fromEdit.row;
  }

  const { data } = useFetch(
    "https://online-book-store-r5k7.onrender.com/api/v1/admin/item/options"
  );
  const { postResource, loading: postLoading } = usePost(
    "https://online-book-store-r5k7.onrender.com/api/v1/admin/item"
  );

  const { patchResource, loading: patchLoading } = usePatch(
    "https://online-book-store-r5k7.onrender.com/api/v1/admin/item"
  );

  const submit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === "images" && values[key].length > 0) {
        values[key].forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, values[key]);
      }
    }

    let res;
    if (mode === "edit") {
      res = await patchResource(values.id, formData);
    } else {
      res = await postResource(formData);
    }
    navigate("/Items");
  };

  if (!data) {
    return (
      <span className="m-auto block mt-[20%] loading loading-spinner loading-lg"></span>
    );
  }

  return (
    <div className="ml-[26%]  sm:ml-[20%] md:ml-[16%] px-4 ">
      <FormCom
        submit={submit}
        ValidationSchema={ValidationSchema}
        initialValues={initialValues}
        inputs={createInputs(data)}
        loading={postLoading || patchLoading}
        mode={mode}
        page="Item"
      />
    </div>
  );
}
