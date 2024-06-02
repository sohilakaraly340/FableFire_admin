import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import loginImg from "../assets/images/LoginProj.jpg";
import usePost from "../hooks/usePost";

export default function SignIn() {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(emailPattern, "Email must be like example@gmail.com"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const navigate = useNavigate();

  const {
    postResource,
    loading: postLoading,
    error: postError,
  } = usePost("http://localhost:3005/api/v1/user/login");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        let res = await postResource(values);

        localStorage.setItem("token", res.token);
        navigate("/Dashboard");
        // }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <div className="card lg:card-side bg-white  w-full h-screen  m-auto flex flex-col lg:flex-row ">
        <div className=" p-2  border-collapse border border-[#A68877]   rounded-lg m-auto">
          <h2 className="font-semibold text-button text-center p-5 text-2xl">
            Sign In
          </h2>
          <form onSubmit={formik.handleSubmit} className="p-5 w-full">
            <div className="pb-3">
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
            <div className="pb-3">
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

            <div className="mt-5  h-11 m-auto bg-button text-center pt-2 w-full lg:w-64 rounded-lg">
              <button className="text-white" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
        <figure className="hidden lg:block w-full lg:w-6/12 rounded-tr-2xl rounded-br-2xl ">
          <img
            src={loginImg}
            alt="Album"
            className="w-full h-full lg:rounded-tl-2xl lg:rounded-bl-2xl  "
          />
        </figure>
      </div>
    </>
  );
}
