import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import FormCom from "../../components/FormCom";

const ValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  images: Yup.array().min(1, "At least one image is required"),
});
const InitialValues = { title: "", description: "", images: [] };

const inputs = [
  { name: "images", title: "Images", type: "file", multiple: true },
  { name: "name", title: "Name", type: "text" },
  { name: "description", title: "Description", type: "textarea" },
];

export default function AddAuthor({ mode, initialValues = InitialValues }) {
  const [loading, setloading] = useState(false);

  const submit = async (values) => {
    console.log(values);
    // const formData = new FormData();
    // for (const key in values) {
    //   if (key === "images" && values[key].length > 0) {
    //     values[key].forEach((file) => formData.append(key, file));
    //   } else {
    //     formData.append(key, values[key]);
    //   }
    // }

    // try {
    //   setloading(true);
    //   const response = await axios.post(
    //     "http://localhost:3005/api/v1/admin/Author",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcwOTg0MzIsImV4cCI6MTcxNzE4NDgzMn0.w9jGobI-59qnNTCGBRpef1zDVVK76OXu4WsVw4p-FXc`,
    //       },
    //     }
    //   );
    //   console.log("Success:", response.data);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    // setloading(false);
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
