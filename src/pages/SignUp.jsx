import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import img from "../assets/images/SignUp.jpg";

export default function SignUp() {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(emailPattern, "Email must be like example@gmail.com"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match ")
      .required("Confirm Password is required"),
  });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      confirmPassword: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await axios.post(
          "https://online-book-store-r5k7.onrender.com/api/v1/user",
          {
            firstName: values.firstName,
            email: values.email,
            password: values.password,
            role: "admin",
          }
        );
        toast.success("SignUp successfully!");
        navigate("/");
      } catch (error) {
        toast.error(`Error : ${error.response.data.message}`);
      }
    },
  });

  return (
    <>
      <div className="card lg:card-side bg-white  w-full h-screen   m-auto flex flex-col lg:flex-row ">
        <div className="   border-collapse border border-[#A68877]  px-11 py-11 rounded-lg m-auto">
          <h2 className="font-semibold text-button text-center p-5 pb-7 text-2xl">
            Sign Up
          </h2>
          <form onSubmit={formik.handleSubmit} className="p-5 w-full">
            <div className="pb-7">
              <label className="text-textcolor1" htmlFor="firstName">
                Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className="bg-transparent border-b border-gray-400 w-full focus:outline-none "
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500"> {formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className="pb-7">
              <label className="text-textcolor1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="bg-transparent border-b border-gray-400 w-full focus:outline-none "
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500"> {formik.errors.email}</div>
              ) : null}
            </div>
            <div className="pb-7">
              <label className="text-textcolor1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="bg-transparent border-b border-gray-400 w-full focus:outline-none "
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500"> {formik.errors.password}</div>
              ) : null}
            </div>

            <div className="pb-2">
              <label className="text-textcolor1" htmlFor="password">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className=" bg-transparent border-b border-gray-400 w-full focus:outline-none "
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500">
                  {" "}
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>

            <button
              className="text-white  h-11 m-auto bg-button text-center mt-7 w-full lg:w-64 rounded-lg"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
        <figure className="hidden lg:block w-full lg:w-6/12  ">
          <img
            src={img}
            alt="Album"
            className="hidden md:block w-full h-full "
          />
        </figure>
      </div>
    </>
  );
}
