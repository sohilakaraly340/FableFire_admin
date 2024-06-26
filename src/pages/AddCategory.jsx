import React from "react";
import * as Yup from "yup";
import FormCom from "../components/FormCom";
import { useLocation, useNavigate } from "react-router-dom";
import usePost from "../hooks/usePost";
import usePatch from "../hooks/usePatch";

const ValidationSchema = Yup.object({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required").min(5, "Max 5 characters"),
  images: Yup.array().min(1, "At least one image is required"),
});

const inputs = [
  { name: "images", title: "Images", type: "file", multiple: true },
  { name: "title", title: "Item Name", type: "text" },
  { name: "description", title: "Description", type: "textarea" },
];

export default function AddCategory({ mode, initialValues = {} }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.state && location.state.fromEdit) {
    initialValues = location.state.fromEdit.row;
  }

  const { postResource, loading: postLoading } = usePost(
    "https://online-book-store-r5k7.onrender.com/api/v1/admin/category"
  );

  const { patchResource, loading: patchLoading } = usePatch(
    "https://online-book-store-r5k7.onrender.com/api/v1/admin/category"
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
    navigate("/Categories");
  };

  return (
    <div className="ml-[26%]  sm:ml-[20%] md:ml-[16%] px-4 ">
      <FormCom
        submit={submit}
        ValidationSchema={ValidationSchema}
        initialValues={initialValues}
        inputs={inputs}
        loading={postLoading || patchLoading}
        mode={mode}
        page="Category"
      />
    </div>
  );
}
