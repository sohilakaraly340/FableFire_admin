import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
          </div>

          <Formik
            initialValues={{
              code1: "",
              code2: "",
              code3: "",
              code4: "",
              code5: "",
              code6: "",
            }}
            validationSchema={Yup.object({
              code1: Yup.string().required("Required"),
              code2: Yup.string().required("Required"),
              code3: Yup.string().required("Required"),
              code4: Yup.string().required("Required"),
              code5: Yup.string().required("Required"),
              code6: Yup.string().required("Required"),
            })}
            onSubmit={async (values) => {
              const otp =
                values.code1 +
                values.code2 +
                values.code3 +
                values.code4 +
                values.code5 +
                values.code6;
              try {
                setLoading(true);
                const res = await axios.post(
                  "https://online-book-store-r5k7.onrender.com/api/v1/admin/user/verfiy-otp",
                  { otp: otp, email: values.email }
                );
                toast.success("OTP verified successfully!");
                localStorage.setItem("verfied", true);
                navigate("/signUp");
              } catch (error) {
                toast.error(`Error : ${error.response.data.message}`);
              }
              setLoading(false);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex flex-col">
                  <label className="text-button mb-2" htmlFor="email">
                    Email
                  </label>
                  <Field
                    className="w-full h-10 flex items-center justify-center text-center px-5 outline-none rounded-md border mb-6 border-button text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-button"
                    type="email"
                    name="email"
                  />
                  <div className="mb-12 flex flex-row items-center justify-between mx-auto w-full ">
                    <div className="w-16 h-16">
                      <Field
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-button text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-button"
                        type="text"
                        name="code1"
                        maxLength="1"
                      />
                      <ErrorMessage
                        name="code1"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div className="w-16 h-16">
                      <Field
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-button text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-button"
                        type="text"
                        name="code2"
                        maxLength="1"
                      />
                      <ErrorMessage
                        name="code2"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div className="w-16 h-16">
                      <Field
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-button text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-button"
                        type="text"
                        name="code3"
                        maxLength="1"
                      />
                      <ErrorMessage
                        name="code3"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div className="w-16 h-16">
                      <Field
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-button text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-button"
                        type="text"
                        name="code4"
                        maxLength="1"
                      />
                      <ErrorMessage
                        name="code4"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div className="w-16 h-16">
                      <Field
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-button text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-button"
                        type="text"
                        name="code5"
                        maxLength="1"
                      />
                      <ErrorMessage
                        name="code5"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div className="w-16 h-16">
                      <Field
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-button text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-button"
                        type="text"
                        name="code6"
                        maxLength="1"
                      />
                      <ErrorMessage
                        name="code6"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-5">
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-button border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Otp;
