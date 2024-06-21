import React, { useState } from "react";
import FormCom from "../components/FormCom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ValidationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const inputs = [
  { name: "firstName", title: "Name", type: "text" },
  { name: "email", title: "Email", type: "email" },
  { name: "password", title: "Password", type: "password" },
  { name: "address", title: "Address", type: "text" },
  { name: "phoneNumber", title: "Phone", type: "text" },
];
export default function AddAdmin({ mode, initialValues = {} }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3005/api/v1/user", {
        ...values,
        role: "admin",
      });

      toast.success("Admin created successfully!");
      navigate("/Users");
    } catch (error) {
      toast.error(`Error : ${error.response.data.message}`);
    }
    setLoading(false);
  };
  return (
    <div className="ml-[26%] sm:ml-[20%] md:ml-[16%] px-4 py-8">
      <FormCom
        submit={submit}
        ValidationSchema={ValidationSchema}
        initialValues={initialValues}
        inputs={inputs}
        loading={loading}
        mode={mode}
        page="Admin"
      />
    </div>
  );
}
