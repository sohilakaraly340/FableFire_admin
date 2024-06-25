import React, { useState } from "react";
import FormCom from "../components/FormCom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ValidationSchema = Yup.object({
  email: Yup.string().required("Required"),
});

const inputs = [{ name: "email", title: "Email", type: "email" }];
export default function AddAdmin({ mode, initialValues = {} }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3005/api/v1/admin/user",
        values
      );
      toast.success("OTP sended successfully!");
      navigate("/Users");
    } catch (error) {
      toast.error(`Error : ${error.response.data.message}`);
    }
    setLoading(false);
  };
  return (
    <div className="ml-[26%] sm:ml-[20%] md:ml-[16%] ">
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
