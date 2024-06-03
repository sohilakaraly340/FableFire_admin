import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import imageIcon from "../assets/images/icons/imgeIcon.png";

export default function FormCom({
  initialValues,
  ValidationSchema,
  submit,
  inputs,
  loading,
  mode,
  page,
}) {
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (
      initialValues &&
      initialValues.images &&
      initialValues.images.length > 0
    ) {
      setImagePreviews(initialValues.images);
    }
  }, [initialValues]);

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.currentTarget.files);
    setFieldValue("images", files);

    const previews = files
      .map((file) => {
        try {
          return URL.createObjectURL(file);
        } catch (error) {
          console.error("Invalid file URL:", file, error);
          return null;
        }
      })
      .filter(Boolean);
    setImagePreviews(previews);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={submit}
    >
      {({ setFieldValue }) => (
        <Form className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold md:px-8">
              {mode === "add" ? `Add ${page}` : `Edit ${page}`}
            </p>
            {loading ? (
              <button className="btn">
                <span className="loading loading-spinner"></span>
                loading
              </button>
            ) : (
              <button
                type="submit"
                className="relative overflow-hidden bg-button hover:bg-[#907566] text-white py-3 px-9 rounded focus:outline-none"
              >
                {mode === "add" ? "Add" : "Save"}
              </button>
            )}
          </div>

          {inputs.map((field, index) => (
            <div key={index} className="md:px-20 py-8">
              {field.type === "file" ? (
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
                    onChange={(event) =>
                      handleImageChange(event, setFieldValue)
                    }
                  />
                  <label
                    htmlFor={field.name}
                    className="mt-3 block md:w-[30%] lg:w-[20%] mx-auto bg-button text-white p-2 rounded cursor-pointer text-center"
                  >
                    Upload Image
                  </label>
                </div>
              ) : field.as === "select" ? (
                <>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-bold mb-2"
                  >
                    {field.title}
                  </label>
                  <Field
                    name={field.name}
                    as="select"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    onChange={(event) =>
                      setFieldValue(field.name, event.target.value)
                    }
                  >
                    <option value="">Select {field.title}</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </>
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
  );
}
