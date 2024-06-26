import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
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

  const generalInputs = inputs.filter((input) => input.as !== "select");
  const selectInputs = inputs.filter((input) => input.as === "select");
  const hasSelectInputs = selectInputs.length > 0;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={submit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <FormHeader mode={mode} page={page} loading={loading} />
          <div
            className={`flex flex-wrap ${
              hasSelectInputs ? "flex-row" : "flex-col"
            }`}
          >
            <div className={`w-full ${hasSelectInputs ? "lg:w-3/4" : ""} px-4`}>
              {generalInputs.map((field, index) => (
                <div key={index} className="py-4">
                  {field.type === "file" ? (
                    <ImageField
                      field={field}
                      imagePreviews={imagePreviews}
                      handleImageChange={handleImageChange}
                      setFieldValue={setFieldValue}
                    />
                  ) : (
                    <FormField
                      field={field}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  )}
                </div>
              ))}
            </div>

            {hasSelectInputs && (
              <div className="w-full lg:w-1/4 px-4 border h-fit mt-10 border-button border-dashed rounded">
                {selectInputs.map((field, index) => (
                  <div key={index} className="py-4">
                    <SelectInput
                      field={field}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
