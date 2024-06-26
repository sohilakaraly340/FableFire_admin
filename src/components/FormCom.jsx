import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FormHeader from "./FormHeader";
import FormField from "./FormField";
import ImageField from "./ImageField";
import SelectInput from "./SelectInput";

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
    if (initialValues?.images?.length > 0) {
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
      {({ setFieldValue, values }) => (
        <Form>
          <FormHeader mode={mode} page={page} loading={loading} />

          {inputs.map((field, index) => (
            <div key={index} className=" md:px-20 py-8">
              {field.as === "select" ? (
                <SelectInput
                  field={field}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              ) : field.type === "file" ? (
                <ImageField
                  key={index}
                  field={field}
                  imagePreviews={imagePreviews}
                  handleImageChange={handleImageChange}
                  setFieldValue={setFieldValue}
                />
              ) : (
                <FormField
                  key={index}
                  field={field}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}
            </div>
          ))}
        </Form>
      )}
    </Formik>
  );
}
