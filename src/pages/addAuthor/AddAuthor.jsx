import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import FormCom from "../../components/FormCom";
import { useLocation } from "react-router-dom";
import usePatch from "../../hooks/usePatch";
import usePost from "../../hooks/usePost";

const ValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  images: Yup.array().min(1, "At least one image is required"),
});

const inputs = [
  { name: "images", title: "Images", type: "file", multiple: true },
  { name: "name", title: "Name", type: "text" },
  { name: "description", title: "Description", type: "textarea" },
];

export default function AddAuthor({ mode, initialValues = {} }) {
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
  } = usePost("http://localhost:3005/api/v1/admin/author");

  const {
    patchResource,
    loading: patchLoading,
    error: patchError,
  } = usePatch("http://localhost:3005/api/v1/admin/author");

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
    <>
      <FormCom
        submit={submit}
        ValidationSchema={ValidationSchema}
        initialValues={initialValues}
        inputs={inputs}
        loading={loading}
        mode={mode}
        page="Author"
      />
    </>
  );
}
