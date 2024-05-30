import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import imageIcon from "../../assets/images/icons/imgeIcon.png";

const ValidationSchema = Yup.object({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  images: Yup.array().min(1, "At least one image is required"),
});

const inputs = [
  { name: "images", title: "Images", type: "file", multiple: true },
  { name: "title", title: "Item Name", type: "text" },
  { name: "description", title: "Description", type: "textarea" },
];

export default function AddCategory({
  mode,
  initialValues = { title: "", description: "", images: [] },
}) {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (initialValues && initialValues.images.length > 0) {
      const previews = initialValues.images.map((image) =>
        URL.createObjectURL(image)
      );
      setImagePreviews(previews);
    }
  }, [initialValues]);

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
    //     "http://localhost:3005/api/v1/admin/category",
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

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.currentTarget.files);
    setFieldValue("images", files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={submit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4 ">
            <div className="flex justify-between items-center ">
              <p className="text-2xl font-bold px-8">
                {mode === "add" ? "Add Category" : "Edit Category"}
              </p>
              <button
                type="submit"
                className=" disabled:bg-slate-400 relative overflow-hidden bg-button hover:bg-[#907566] text-white py-3 px-9 rounded focus:outline-none"
                disabled={loading}
              >
                {mode === "add" ? "Add" : "Save"}
              </button>
            </div>

            {inputs.map((field, index) => (
              <div key={index} className=" px-20 py-8 ">
                {field.type === "file" ? (
                  <div className="block w-full p-6 text-center border-[2px] border-button border-dashed  rounded">
                    <div className="flex space-x-2 justify-center">
                      {imagePreviews.length > 0 ? (
                        imagePreviews.map((preview, idx) => (
                          <img
                            key={idx}
                            src={preview}
                            alt={`Preview ${idx}`}
                            className="h-[50%] w-[50%] object-cover"
                          />
                        ))
                      ) : (
                        <img src={imageIcon} />
                      )}
                    </div>
                    <input
                      id={field.name}
                      name={field.name}
                      type="file"
                      className="hidden"
                      multiple={field.multiple}
                      onChange={(event) =>
                        handleImageChange(event, setFieldValue)
                      }
                    />
                    <label
                      htmlFor={field.name}
                      className="mt-3 block w-[20%] mx-auto bg-button text-white p-2 rounded cursor-pointer text-center"
                    >
                      Upload Image
                    </label>
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-bold mb-2"
                    >
                      {field.title}
                    </label>
                    <Field
                      name={field.name}
                      type={field.type}
                      as={field.type === "textarea" ? "textarea" : "input"}
                      className="mt-1 block w-full p-2 border border-button rounded"
                    />
                  </>
                )}
                <ErrorMessage
                  name={field.name}
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            ))}
          </Form>
        )}
      </Formik>
    </>
  );
}
